import { ReactNode } from 'react'

export type NavLink = {
  title: string
  url: string
  icon?: React.ComponentType<any> // Icon component like `LucideIcon`
  badge?: string
  external?: boolean
  disabled?: boolean
}

export type NavItem = NavLink

export type NavGroup = {
  title: string
  items: any[]
}

export type NavCollapsible = {
  title: string
  url: string // used for checking active path
  icon?: React.ComponentType<any>
  badge?: string
  items: NavItem[]
}
