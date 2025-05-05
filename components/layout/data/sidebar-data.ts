import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
} from '@tabler/icons-react'

import { AudioWaveform, Command, GalleryVerticalEnd, Bot, Frame, Map, PieChart, SquareTerminal, User } from 'lucide-react'
import { type SidebarData } from '../types'

// 🧠 Function to return sidebar data based on role
export const getSidebarData = (): SidebarData => {
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') || 'Admin' : 'Admin'

  const common = {
    user: {
      name: 'kaal',
      email: 'kaal@gmail.com',
      avatar: '/avatars/shadcn.jpg',
    },
    teams: [
      {
        name: 'VSAY ERP',
        logo: GalleryVerticalEnd,
        plan: 'Enterprise',
      },
      {
        name: 'VSAY LMS',
        logo: AudioWaveform,
        plan: 'Startup',
      },
      {
        name: 'VSAY Inventory',
        logo: Command,
        plan: 'Free',
      },
    ],
  }

  switch (role) {
    case 'Admin':
      return {
        ...common,
        navGroups: [
          {
            title: 'General',
            items: [
              { title: 'Dashboard', url: '/erp/admin-dashboard', icon: IconLayoutDashboard },
              { title: 'Events', url: '/erp/events', icon: Bot },
              { title: 'Timetable', url: '/erp/timetable', icon: Bot },
              { title: 'Payroll', url: '/erp/payroll', icon: Bot },
            ],
          },
          {
            title: 'Projects',
            items: [
              { title: 'User Management', url: '/erp/user-management', icon: Frame },
              { title: 'Teacher Management', url: '/erp/teachers', icon: User },
              { title: 'Class Management', url: '/erp/class-management', icon: PieChart },
              { title: 'Security', url: '/erp/security', icon: Map },
              { title: 'Settings', url: '/erp/settings', icon: Map },
              { title: 'Licence', url: '/erp/licence', icon: Map },
            ],
          },
        ],
      }

    case 'Teacher':
      return {
        ...common,
        navGroups: [
          {
            title: 'Teacher Panel',
            items: [
              { title: 'Dashboard', url: '/erp/teacher-dashboard', icon: IconLayoutDashboard },
              { title: 'Class Management', url: '/erp/class-management', icon: PieChart },
              { title: 'Attendance', url: '/erp/attendance', icon: Bot },
              { title: 'Payroll', url: '/erp/payroll', icon: Bot },
              { title: 'Student Management', url: '/erp/student-management', icon: Bot },
              { title: 'Timetable', url: '/erp/timetable', icon: Bot },
            ],
          },
        ],
      }

    case 'Student':
      return {
        ...common,
        navGroups: [
          {
            title: 'Student Panel',
            items: [
              { title: 'Dashboard', url: '/erp/student-dashboard', icon: IconLayoutDashboard },
              { title: 'Timetable', url: '/erp/timetable', icon: Bot },
              { title: 'Attendance', url: '/erp/attendance', icon: Bot },
              { title: 'Fees', url: '/erp/fees', icon: Bot },
              { title: 'Events', url: '/erp/events', icon: Bot },
              { title: 'Exam', url: '/erp/exam', icon: Bot },
            ],
          },
        ],
      }

    case 'Accountant':
      return {
        ...common,
        navGroups: [
          {
            title: 'Accountant Panel',
            items: [
              { title: 'Dashboard', url: '/erp/accountant-dashboard', icon: IconLayoutDashboard },
              { title: 'Fee Structure', url: '/erp/fee-structure', icon: Bot },
              { title: 'Teacher Payroll', url: '/erp/teacher-payroll', icon: Bot },
              { title: 'Tax Details', url: '/erp/tax-details', icon: Bot },
            ],
          },
        ],
      }

    default:
      return { ...common, navGroups: [] }
  }
}
