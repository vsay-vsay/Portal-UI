"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, Users, MapPin, BookOpen, FileText, Video, Bell, MoreHorizontal } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TeacherCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")
  
  // Generate calendar days for the current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    
    const days = []
    
    // Add days from previous month to fill the first week
    const prevMonthDays = new Date(year, month, 0).getDate()
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
        events: []
      })
    }
    
    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i)
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        events: getEventsForDate(currentDate)
      })
    }
    
    // Add days from next month to complete the last week
    const remainingDays = 42 - days.length // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        events: []
      })
    }
    
    return days
  }
  
  // Mock events data
  const getEventsForDate = (date: Date) => {
    const events = [
      {
        id: 1,
        title: "Class 10A - Mathematics",
        type: "class",
        time: "08:30 - 09:30",
        location: "Room 101",
        date: new Date(2025, 4, 6), // May 6, 2025
      },
      {
        id: 2,
        title: "Class 11B - Physics",
        type: "class",
        time: "10:00 - 11:00",
        location: "Room 203",
        date: new Date(2025, 4, 6), // May 6, 2025
      },
      {
        id: 3,
        title: "Department Meeting",
        type: "meeting",
        time: "11:30 - 12:30",
        location: "Conference Room",
        date: new Date(2025, 4, 6), // May 6, 2025
      },
      {
        id: 4,
        title: "Parent-Teacher Meeting",
        type: "meeting",
        time: "15:00 - 17:00",
        location: "Main Hall",
        date: new Date(2025, 4, 12), // May 12, 2025
      },
      {
        id: 5,
        title: "Science Exhibition",
        type: "event",
        time: "09:00 - 16:00",
        location: "School Grounds",
        date: new Date(2025, 4, 15), // May 15, 2025
      },
      {
        id: 6,
        title: "End of Term Exam - Mathematics",
        type: "exam",
        time: "09:00 - 11:00",
        location: "Exam Hall",
        date: new Date(2025, 4, 20), // May 20, 2025
      },
      {
        id: 7,
        title: "End of Term Exam - Physics",
        type: "exam",
        time: "09:00 - 11:00",
        location: "Exam Hall",
        date: new Date(2025, 4, 22), // May 22, 2025
      },
      {
        id: 8,
        title: "Staff Development Day",
        type: "training",
        time: "09:00 - 16:00",
        location: "Training Center",
        date: new Date(2025, 4, 28), // May 28, 2025
      },
    ]
    
    return events.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    )
  }
  
  const days = getDaysInMonth(currentMonth)
  
  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' })
  }
  
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-blue-500"
      case "meeting":
        return "bg-purple-500"
      case "event":
        return "bg-green-500"
      case "exam":
        return "bg-red-500"
      case "training":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }
  
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "class":
        return BookOpen
      case "meeting":
        return Users
      case "event":
        return CalendarIcon
      case "exam":
        return FileText
      case "training":
        return Video
      default:
        return CalendarIcon
    }
  }
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }
  
  const today = () => {
    setCurrentMonth(new Date())
    setSelectedDate(new Date())
  }
  
  const selectedDateEvents = getEventsForDate(selectedDate)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and upcoming events</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={today}>
            Today
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>
                  Create a new event in your calendar
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Event form would go here */}
                <p className="text-center text-muted-foreground">Event creation form placeholder</p>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-lg font-medium">
                {getMonthName(currentMonth)} {currentMonth.getFullYear()}
              </div>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Select value={view} onValueChange={(value) => setView(value as any)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={view} onValueChange={(value) => setView(value as any)} className="w-full">
            <TabsList className="hidden">
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
            </TabsList>
            
            <TabsContent value="month" className="mt-0">
              <div className="grid grid-cols-7 text-center border-b">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="py-2 text-sm font-medium">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 text-sm">
                {days.map((day, i) => {
                  const isToday = day.date.toDateString() === new Date().toDateString()
                  const isSelected = day.date.toDateString() === selectedDate.toDateString()
                  
                  return (
                    <div 
                      key={i} 
                      className={`min-h-24 p-1 border border-t-0 ${i % 7 === 0 ? 'border-l-0' : ''} ${i % 7 === 6 ? 'border-r-0' : ''} ${!day.isCurrentMonth ? 'bg-muted/30 text-muted-foreground' : ''}`}
                      onClick={() => setSelectedDate(day.date)}
                    >
                      <div className={`flex justify-center items-center h-7 w-7 rounded-full mx-auto mb-1 cursor-pointer ${isToday ? 'bg-primary text-primary-foreground' : ''} ${isSelected && !isToday ? 'bg-secondary' : ''}`}>
                        {day.date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {day.events.slice(0, 3).map((event) => (
                          <div 
                            key={event.id} 
                            className={`text-xs px-1 py-0.5 rounded truncate text-white ${getEventTypeColor(event.type)}`}
                            title={`${event.title} (${event.time})`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {day.events.length > 3 && (
                          <div className="text-xs text-center text-muted-foreground">
                            +{day.events.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="week" className="mt-0">
              <div className="flex flex-col">
                <div className="grid grid-cols-8 border-b">
                  <div className="py-2 text-sm font-medium text-center">Time</div>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="py-2 text-sm font-medium text-center">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-8">
                  <div className="border-r">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-20 border-b px-2 py-1 text-xs text-muted-foreground">
                        {(i + 8) % 12 === 0 ? 12 : (i + 8) % 12}:00 {i + 8 < 12 ? 'AM' : 'PM'}
                      </div>
                    ))}
                  </div>
                  {Array.from({ length: 7 }).map((_, dayIndex) => (
                    <div key={dayIndex} className="relative">
                      {Array.from({ length: 12 }).map((_, hourIndex) => (
                        <div key={hourIndex} className="h-20 border-b border-r px-1 py-1">
                          {/* Events would be positioned absolutely here */}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="day" className="mt-0">
              <div className="flex flex-col">
                <div className="text-center py-2 border-b">
                  <div className="text-sm font-medium">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div className="grid grid-cols-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex border-b">
                      <div className="w-20 py-4 px-2 text-sm text-muted-foreground border-r">
                        {(i + 8) % 12 === 0 ? 12 : (i + 8) % 12}:00 {i + 8 < 12 ? 'AM' : 'PM'}
                      </div>
                      <div className="flex-1 min-h-20 p-1 relative">
                        {/* Events would be positioned here */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Events for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</CardTitle>
          <CardDescription>
            {selectedDateEvents.length === 0 
              ? "No events scheduled for this day" 
              : `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? 's' : ''} scheduled`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedDateEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="mx-auto h-12 w-12 mb-2 opacity-20" />
                <p>No events scheduled for this day</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </div>
            ) : (
              selectedDateEvents.map((event) => {
                const EventIcon = getEventTypeIcon(event.type)
                
                return (
                  <div key={event.id} className="flex items-start p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className={`w-10 h-10 rounded-full ${getEventTypeColor(event.type)} flex items-center justify-center text-white mr-3`}>
                      <EventIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{event.title}</h4>
                        <Badge variant="outline" className="capitalize">
                          {event.type}
                        </Badge>
                      </div>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="mr-1 h-3 w-3" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Event</DropdownMenuItem>
                        <DropdownMenuItem>Set Reminder</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">Delete Event</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-1" />
                Class
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">
                <div className="w-2 h-2 rounded-full bg-purple-500 mr-1" />
                Meeting
              </Badge>
              <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
                Event
              </Badge>
              <Badge variant="secondary" className="bg-red-500/10 text-red-500">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-1" />
                Exam
              </Badge>
              <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1" />
                Training
              </Badge>
            </div>
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Manage Reminders
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
