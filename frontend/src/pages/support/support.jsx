'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Switch } from '@radix-ui/react-switch'
import { Button } from '@/components/ui/button'

const supportContent = [
  {
    id: 'getting-started',
    titleKey: 'Purchase Order',
    videoId: 'D5KgMKDkWE4',
    arVideoId: 'JaRq44cY_ak',
    contentKey: 'This Section is for Submitting Purchase Orders, Approving or Denying Orders and checking the orders history and their details inside. Sufficient Permissions are Required to Access some parts of this Section.',
  },
  {
    id: 'contracts',
    titleKey: 'Contracts',
    videoId: 'jR881X6dXLw',
    arVideoId: 'XTN0BYXWft8',
    contentKey: 'This Section is for Viewing and Editing Contracts. All Contracts are displayed here except for the sales contracts which have their own section. Sufficient Permissions are Required to Access some parts of this Section or Edit Contract Details.',
  },
  {
    id: 'profile',
    titleKey: 'Profile',
    videoId: 'xgIhrTjWJ0Q',
    arVideoId: 'qT1YvLrOG5o',
    contentKey: 'This Section is for Viewing and Editing Contracts. All Contracts are displayed here except for the sales contracts which have their own section. Sufficient Permissions are Required to Access some parts of this Section or Edit Contract Details.',
  },
  {
    id: 'deprtments',
    titleKey: 'Contracts',
    videoId: 'pq8ncpi3Egc',
    arVideoId: '-f8xs7BFKA0',
    contentKey: 'This Section is for Viewing and Editing Contracts. All Contracts are displayed here except for the sales contracts which have their own section. Sufficient Permissions are Required to Access some parts of this Section or Edit Contract Details.',
  },
  {
    id: 'sales-contracts',
    titleKey: 'Sales Contracts',
    videoId: 'gJtwDD7gePw',
    arVideoId: 'pNQJcLvl4Mo',
    contentKey: 'This Section is for Viewing and Editing Sales Contracts. All Sales Contracts are displayed here with all their respective details. Sufficient Permissions are Required to Access Some Parts of this Section or Editing Contract Details.',
  },
  {
    id: 'legal-services',
    titleKey: 'Legal Services',
    videoId: 'd9EzOk2frbE',
    arVideoId: 'ITlzrq1yKDU',
    contentKey: 'Legal Services is the responsible section for submitting tickets or revision request for a specific issue that an employee has a question or an issue with. All Review Requests right now are redirected to the Admin to get their response. However, there is a functionality to assign the ticket to a certain employee using their email. Sufficient Permissions are Required to Access Some or All Parts of this Section.',
  },
  {
    id: 'maintenance',
    titleKey: 'Maintenance',
    videoId: '',
    arVideoId: 'lOELPQdGFiQ',
    contentKey: 'maintenance is the responsible section for submitting tickets or issues that the employees are in need of assistance with. All Maintenance Requests right now are redirected to the Admin to get their response. However, there is a functionality to assign the ticket to a certain employee using their email. Sufficient Permissions are Required to Access Some or All Parts of this Section.',
  },
  {
    id: 'departments',
    titleKey: 'Departments',
    videoId: 'pq8ncpi3Egc',
    arVideoId: '-f8xs7BFKA0',
    contentKey: 'Departments is a simple section to display all the departments that exist right now in the company while also displaying all employees that are related to their respective department. It also has the function to view all the documents that are related to its respective department. Sufficient Permissions are Required to Access Some or All Parts of this Section.',
  },

  {
    id: 'contacts',
    titleKey: 'Contacts',
    videoId: '5kKihXmrmRs',
    arVideoId: 'Rhwn2xubin4',
    contentKey: 'Contacts is a dashboard for viewing all the profiles that were created in the portal and these include ; 1. employee profiles, 2. Department Profiles, 3. Companies profiles, 4. Clients Profiles. Sufficient Permissions are Required to Access Some or All Parts of this Section.',
  },
  {
    id: 'notifications-center',
    titleKey: 'Notifications Center',
    videoId: 'NInoVfrb8i8',
    arVideoId: 'YS0GSQtFReE',
    contentKey: ' Notifications Center is the collection of all changes done inside the portal including: 1. purchase orders created / edited / deleted 2. Contracts uploaded / edited / deleted 3. Signatures done by employees/ admin and it stores the notification data when the second party submits their signatures 4. an Expiring Soon Section to display all contracts that are about to expire and this time amount is 30 days . Only the Admin can access this section.',
  },
  {
    id: 'admin-dashboard',
    titleKey: 'Admin Dashboard',
    videoId: '',
    arVideoId: '-ZXL9r_6S9s',
    contentKey: 'The Admin Dashboard is the main dashboard for the Admin to upload contracts / sales contracts and create any employee / department / clients / companies. It contains 3 sections: 1. Sales Contracts Upload Section 2. Contact Management Section 3. Regular Contracts Upload Section. Only the Admin can access this section.',
  },
  {
    id: 'signatures-history',
    titleKey: 'Signatures History',
    videoId: 'tuAmgwFQ-3s',
    arVideoId: 'ECzequaosgc',
    contentKey: 'The Admin Dashboard is the main dashboard for the Admin to upload contracts / sales contracts and create any employee / department / clients / companies. It contains 3 sections: 1. Sales Contracts Upload Section 2. Contact Management Section 3. Regular Contracts Upload Section. Only the Admin can access this section.',
  },
  {
    id: 'settings',
    titleKey: 'Settings',
    videoId: 'TI4BEyWLbGs',
    arVideoId: '7LG0S9SdsQI',
    contentKey: 'any user can changes his password, his account background image and his notifications preferences from this section. Some Notification toggles are only available for the Admin or certain roles.',
  }
]



export default function Support() {
  const [activeContent, setActiveContent] = useState(supportContent[0].id)
  const [isArabic, setIsArabic] = useState(false)

  const selectedContent = supportContent.find(item => item.id === activeContent)

 
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Support Center</h1>
        <div className="flex gap-1 bg-yellow-200/5 p-1.5 rounded-full  shadow-orange-300 shadow-sm">
  <Button
    variant="ghost"
    size="sm"
    className={`rounded-full px-4 transition-all duration-300 ${
      !isArabic 
        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg scale-105 border border-yellow-300'
        : 'bg-white/70 dark:bg-gray-600/10 hover:bg-white dark:hover:bg-gray-500/20 hover:scale-95 border-transparent'
    }`}
    onClick={() => setIsArabic(false)}
  >
    <span className="font-bold tracking-wide">EN</span>
  </Button>
  
  <Button
    variant="ghost"
    size="sm"
    className={`rounded-full px-4 transition-all duration-300 ${
      isArabic 
        ? 'bg-gradient-to-l from-yellow-500 to-amber-200 text-white shadow-lg scale-105 border border-yellow-300'
        : 'bg-white/70 dark:bg-gray-600/10 hover:bg-white dark:hover:bg-gray-500/20 hover:scale-95 border-transparent'
    }`}
    onClick={() => setIsArabic(true)}
  >
    <span className="font-bold tracking-wide">AR</span>
  </Button>
</div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <TableOfContents 
          contents={supportContent} 
          activeContent={activeContent} 
          setActiveContent={setActiveContent}
          isArabic={isArabic}
        />
        
        <div className="flex-grow">
          {selectedContent && (
            <div className=" rounded-xl overflow-hidden shadow-lg">
              <div className="w-full" style={{ paddingBottom: '56.25%', position: 'relative' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${isArabic ? selectedContent.arVideoId : selectedContent.videoId}`}
                  className="absolute top-0 left-0 w-full h-full border dark:border-yellow-800/30"
                  allowFullScreen
                />
              </div>
              <div className="p-6  dark:bg-transparent ">
                <h2 className="text-2xl font-semibold mb-3">
                  { selectedContent.titleKey}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedContent.contentKey}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TableOfContents({ contents, activeContent, setActiveContent, isArabic }) {
  return (
    <nav className="w-full md:w-64 md:min-w-[16rem] md:max-w-[16rem] mb-8 md:mb-0">
      <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {contents.map((item) => (
          <li key={item.id}>
            <button
              className={`flex items-center p-3 md:p-2.5 w-full text-left rounded-lg transition-all
                ${activeContent === item.id 
                  ? 'bg-blue-50 dark:bg-amber-900/20 border border-amber-200 dark:border-orange-500/20 dark:text-blue-200' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-100/15 border border-transparent'}
                text-sm md:text-base`}
              onClick={() => setActiveContent(item.id)}
            >
              <ChevronRight className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="flex-1 truncate">{item.titleKey}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}