import { Main } from "@/components/layout/main"
import { MainLayout } from "@/components/layout/main-layout"
import { Sidebar } from "@/components/layout/sidebar"
import { Separator } from "@/components/ui/separator"
import SidebarNav from "@/features/settings/components/sidebar-nav"
import {
    IconBrowserCheck,
    IconNotification,
    IconPalette,
    IconTool,
    IconUser,
  } from '@tabler/icons-react'


  const sidebarNavItems = [
    {
      title: 'Profile',
      icon: <IconUser size={18} />,
      href: '/erp/settings',
    },
    {
      title: 'Account',
      icon: <IconTool size={18} />,
      href: '/erp/settings/account',
    },
    {
      title: 'Appearance',
      icon: <IconPalette size={18} />,
      href: '/erp/settings/appearance',
    },
    {
      title: 'Notifications',
      icon: <IconNotification size={18} />,
      href: '/erp/settings/notifications',
    },
    {
      title: 'Display',
      icon: <IconBrowserCheck size={18} />,
      href: '/erp/settings/display',
    },
  ]
  
export default function Settings({children}:{
    children:React.ReactNode
}) {
    return (
      <Main fixed>
              <div className='space-y-0.5'>
                <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                  Settings
                </h1>
                <p className='text-muted-foreground'>
                  Manage your account settings and set e-mail preferences.
                </p>
              </div>
              <Separator className='my-4 lg:my-6' />
              <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
                <aside className='top-0 lg:sticky lg:w-1/5'>
                  <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className='flex w-full overflow-y-hidden p-1'>
                  {children}
                </div>
              </div>
            </Main>
     
    )
  }
  
