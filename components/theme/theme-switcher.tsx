"use client"

import { useTheme } from "next-themes"
import { Check, Laptop, Moon, Palette, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme()

  // Filter out system theme for color themes
  const colorThemes = themes.filter((t) => t !== "light" && t !== "dark" && t !== "system")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
            {theme === "light" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
            {theme === "dark" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Laptop className="mr-2 h-4 w-4" />
            <span>System</span>
            {theme === "system" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette className="mr-2 h-4 w-4" />
            <span>Color Themes</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {colorThemes.map((colorTheme) => (
                <DropdownMenuItem key={colorTheme} onClick={() => setTheme(colorTheme)}>
                  <span className="capitalize">{colorTheme}</span>
                  {theme === colorTheme && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
