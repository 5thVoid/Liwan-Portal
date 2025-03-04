import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { format, startOfMonth } from 'date-fns';
import { PersonalDocumentsCard } from './personal-documents-card';

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const [notifications, setNotifications] = useState({
    orders: true,
    expiringDocuments: true,
    signatures: true,
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [analyticsMessage, setAnalyticsMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Use import.meta.env instead of process.env
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError(t('passwordMismatchError'));
      return;
    }

    // Ensure apiUrl is defined before using it
    if (!apiUrl) {
      setError(t('apiUrlNotDefined'));
      return;
    }

    const baseUrl = apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`;
    const fullUrl = `${baseUrl}api/v1/auth/changePassword`;

    try {
      const response = await axios.patch(
        fullUrl,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.status === 'success') {
        setSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        throw new Error(response.data.message || t('passwordChangeFailed'));
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || t('passwordChangeError'));
    }
  };

  const handleGenerateAnalytics = useCallback(async () => {
    setAnalyticsMessage('');
    setError('');
    setIsLoading(true);

    if (!apiUrl) {
      setError(t('apiUrlNotDefined'));
      setIsLoading(false);
      return;
    }

    const baseUrl = apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`;
    const currentDate = startOfMonth(new Date());
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    const deleteUrl = `${baseUrl}api/v1/analytics/${formattedDate}`;
    const generateUrl = `${baseUrl}api/v1/analytics/generate/`;

    try {
      // Delete existing analytics
      await axios.delete(deleteUrl, { withCredentials: true });

      // Generate new analytics
      const response = await axios.post(generateUrl, {}, { withCredentials: true });
      setAnalyticsMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || err.message || t('analyticsGenerationError'));
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, t]);

  return (
    <div className="container mx-auto py-10" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold mb-8">{t('Settings')}</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t('Notifications Settings')}</CardTitle>
          <CardDescription>{t('Manage Your Notifications')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="orders-notifications">{t('Notifications For Orders')}</Label>
            <Switch
              id="orders-notifications"
              checked={notifications.orders}
              onCheckedChange={() => handleNotificationToggle('orders')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="expiring-documents-notifications">{t('Notifications For Documents About to Expire')}</Label>
            <Switch
              id="expiring-documents-notifications"
              checked={notifications.expiringDocuments}
              onCheckedChange={() => handleNotificationToggle('expiringDocuments')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="signatures-notifications">{t('Notifications For Signatures Completed by Clients')}</Label>
            <Switch
              id="signatures-notifications"
              checked={notifications.signatures}
              onCheckedChange={() => handleNotificationToggle('signatures')}
            />
          </div>
          <Button><Link to="/Background-Selector">{t('Change Background')}</Link></Button>
        </CardContent>
      </Card>

        <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t('Analytics')}</CardTitle>
          <CardDescription>{t('Generate Analytics Report')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleGenerateAnalytics} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('Generating...')}
              </>
            ) : (
              t('Generate Analytics')
            )}
          </Button>
          {analyticsMessage && <p className="text-green-500 text-sm">{t(analyticsMessage)}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
      </Card>
      <PersonalDocumentsCard />
      <Card>
        <CardHeader>
          <CardTitle>{t('changePassword')}</CardTitle>
          <CardDescription>{t('Update Your Password')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">{t('currentPassword')}</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="newPassword">{t('newPassword')}</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">{t('confirmNewPassword')}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{t('passwordChangeSuccess')}</p>}
            <Button type="submit" className="w-full">{t('changePassword')}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

