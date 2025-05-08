"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Calendar, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  hasSearch?: boolean
  hasFilter?: boolean
  hasDatePicker?: boolean
  hasAddButton?: boolean
  addButtonText?: string
  onAddClick?: () => void
  onSearchChange?: (value: string) => void
}

export function PageHeader({
  title,
  description,
  children,
  hasSearch = false,
  hasFilter = false,
  hasDatePicker = false,
  hasAddButton = false,
  addButtonText = "Add New",
  onAddClick,
  onSearchChange,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 pb-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      <div className="flex items-center space-x-2">
        {hasSearch && (
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 md:w-[200px] lg:w-[300px]"
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        )}
        {hasFilter && (
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        )}
        {hasDatePicker && (
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Select Date
          </Button>
        )}
        {hasAddButton && (
          <Button onClick={onAddClick}>
            <Plus className="mr-2 h-4 w-4" />
            {addButtonText}
          </Button>
        )}
        {children}
      </div>
    </div>
  )
}
