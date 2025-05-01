"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Box,
  Building2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  Home,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()
  const [activeGroup, setActiveGroup] = useState<string | null>("dashboard")

  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
      group: "dashboard",
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      group: "dashboard",
    },
  ]

  const moduleNavItems = [
    {
      title: "Inventory",
      href: "/inventory",
      icon: <Package className="h-5 w-5" />,
      group: "inventory",
    },
    {
      title: "Products",
      href: "/inventory/products",
      icon: <Box className="h-5 w-5" />,
      group: "inventory",
    },
    {
      title: "Orders",
      href: "/sales/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      group: "sales",
    },
    {
      title: "Invoices",
      href: "/sales/invoices",
      icon: <FileText className="h-5 w-5" />,
      group: "sales",
    },
    {
      title: "Customers",
      href: "/crm/customers",
      icon: <Users className="h-5 w-5" />,
      group: "crm",
    },
    {
      title: "Human Resources",
      href: "/hr",
      icon: <Users className="h-5 w-5" />,
      group: "hr",
    },
    {
      title: "Finance",
      href: "/finance",
      icon: <CreditCard className="h-5 w-5" />,
      group: "finance",
    },
  ]

  const otherNavItems = [
    {
      title: "Company",
      href: "/company",
      icon: <Building2 className="h-5 w-5" />,
      group: "company",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
      group: "settings",
    },
  ]

  const NavItem = ({
    title,
    href,
    icon,
    group,
  }: {
    title: string
    href: string
    icon: React.ReactNode
    group: string
  }) => {
    const isActive = pathname === href

    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                !open && "justify-center px-2",
              )}
              onClick={() => setActiveGroup(group)}
            >
              {icon}
              {open && <span>{title}</span>}
            </Link>
          </TooltipTrigger>
          {!open && <TooltipContent side="right">{title}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-card transition-all duration-300 ease-in-out",
        open ? "w-64" : "w-20",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          {open ? (
            <>
              <Home className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">ERP System</span>
            </>
          ) : (
            <Home className="h-6 w-6 text-primary" />
          )}
        </Link>
        <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setOpen(!open)}>
          {open ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="flex flex-col gap-1 px-2">
          <div className="mb-2">
            {open && <h3 className="mb-1 px-3 text-xs font-medium text-muted-foreground">Main</h3>}
            {mainNavItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
          <div className="mb-2">
            {open && <h3 className="mb-1 px-3 text-xs font-medium text-muted-foreground">Modules</h3>}
            {moduleNavItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
          <div className="mb-2">
            {open && <h3 className="mb-1 px-3 text-xs font-medium text-muted-foreground">Other</h3>}
            {otherNavItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
        </nav>
      </div>
    </aside>
  )
}
