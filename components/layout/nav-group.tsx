'use client'

import { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Badge } from '../ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { NavCollapsible, NavItem, NavLink, type NavGroup } from './types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavGroup({ title, items }: NavGroup) {
  const { state } = useSidebar()
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.url}`

          if (!item.items)
            return <SidebarMenuLink key={key} item={item} pathname={pathname} />

          if (state === 'collapsed')
            return (
              <SidebarMenuCollapsedDropdown key={key} item={item} pathname={pathname} />
            )

          return <SidebarMenuCollapsible key={key} item={item} pathname={pathname} />
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

const NavBadge = ({ children }: { children: ReactNode }) => (
  <Badge className='rounded-full px-1 py-0 text-xs'>{children}</Badge>
)

const SidebarMenuLink = ({ item, pathname }: { item: NavLink; pathname: string }) => {
  const { setOpenMobile } = useSidebar()
  const isActive = checkIsActive(pathname, item)
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className={`${!isActive && 'hover:bg-muted'} ${isActive && 'dark:bg-muted bg-primary text-white'}`}
        tooltip={item.title}
      >
        <Link href={item.url} onClick={() => setOpenMobile(false)}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          {item.badge && <NavBadge>{item.badge}</NavBadge>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

const SidebarMenuCollapsible = ({
  item,
  pathname,
}: {
  item: NavCollapsible
  pathname: string
}) => {
  const { setOpenMobile } = useSidebar()
  const isParentActive = checkIsActive(pathname, item, true)
  
  return (
    <Collapsible
      asChild
      defaultOpen={isParentActive}
      className='group/collapsible'
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className='CollapsibleContent'>
          <SidebarMenuSub>
            {item.items.map((subItem: any) => {
              const isSubItemActive = checkIsActive(pathname, subItem)
              
              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={isSubItemActive}
                    className={`${!isSubItemActive && 'hover:bg-muted'} ${isSubItemActive && 'dark:bg-muted bg-primary text-white'}`}
                  >
                    <Link href={subItem.url} onClick={() => setOpenMobile(false)}>
                      {subItem.icon && <subItem.icon />}
                      <span>{subItem.title}</span>
                      {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              )
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

const SidebarMenuCollapsedDropdown = ({
  item,
  pathname,
}: {
  item: NavCollapsible
  pathname: string
}) => {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className='ml-auto' />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.items.map((subItem: any) => {
            const isSubItemActive = checkIsActive(pathname, subItem)
            
            return (
              <DropdownMenuItem key={subItem.title} asChild>
                <Link 
                  href={subItem.url}
                  className={isSubItemActive ? 'bg-accent' : ''}
                >
                  {subItem.icon && <subItem.icon className="mr-2 h-4 w-4" />}
                  <span>{subItem.title}</span>
                  {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

function checkIsActive(pathname: string, item: NavItem, checkChildren = false): boolean {
  // Direct URL match
  if (pathname === item.url) {
    return true
  }
  
  // Check if any child items match (for collapsible items)
  if (item.items && item.items.length > 0) {
    const hasActiveChild = item.items.some((childItem: any) => 
      pathname === childItem.url
    )
    if (hasActiveChild) {
      return true
    }
  }
  
  // For main navigation, check if we're in the same section
  if (checkChildren && item.url && pathname !== '/') {
    const itemSegments = item.url.split('/').filter(Boolean)
    const pathnameSegments = pathname.split('/').filter(Boolean)
    
    // Check if the first segment matches (for section-based navigation)
    if (itemSegments.length > 0 && pathnameSegments.length > 0) {
      return itemSegments[0] === pathnameSegments[0]
    }
  }
  
  return false
}