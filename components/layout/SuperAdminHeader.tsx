"use client"

import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import { UserNav } from "@/components/layout/user-nav"
import { cn } from "@/lib/utils"


// interface HeaderProps {
//   sidebarOpen: boolean
//   setSidebarOpen: (open: boolean) => void
// }

export function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-30  h-16 items-center flex gap-4 border-b bg-background p-4 transition-all duration-300 ease-in-out"
      )}
    >
      <div className="flex flex-1 items-center justify-end gap-4 md:gap-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <ThemeSwitcher />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
