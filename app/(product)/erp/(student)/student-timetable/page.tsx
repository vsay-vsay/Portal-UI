"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Download, Printer, RefreshCw } from 'lucide-react'

import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentTimetablePage() {
  const [currentWeek, setCurrentWeek] = useState("current")
  
  // Sample timetable data
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const periods = [
    { time: "08:00 - 09:30", label: "Period 1" },
    { time: "09:45 - 11:15", label: "Period 2" },
    { time: "11:30 - 13:00", label: "Period 3" },
    { time: "13:45 - 15:15", label: "Period 4" },
    { time: "15:30 - 17:00", label: "Period 5" },
  ]
  
  const timetable = {
    Monday: [
      { subject: "Mathematics", teacher: "Mr. Robert Davis", room: "Room 101", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
      { subject: "English", teacher: "Mrs. Emily Wilson", room: "Room 205", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
      { subject: "Lunch Break", teacher: "", room: "Cafeteria", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" },
      { subject: "History", teacher: "Mr. James Thompson", room: "Room 302", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
      { subject: "Physical Education", teacher: "Coach Williams", room: "Gym", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" },
    ],
    Tuesday: [
      { subject: "Science", teacher: "Ms. Sarah Johnson", room: "Lab 3", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
      { subject: "Computer Science", teacher: "Ms. Lisa Chen", room: "Computer Lab", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300" },
      { subject: "Lunch Break", teacher: "", room: "Cafeteria", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" },
      { subject: "Art", teacher: "Ms. Julia Roberts", room: "Art Studio", color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300" },
      { subject: "Study Hall", teacher: "", room: "Library", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
    ],
    Wednesday: [
      { subject: "Mathematics", teacher: "Mr. Robert Davis", room: "Room 101", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
      { subject: "English", teacher: "Mrs. Emily Wilson", room: "Room 205", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
      { subject: "Lunch Break", teacher: "", room: "Cafeteria", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" },
      { subject: "Music", teacher: "Mr. David Brown", room: "Music Room", color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300" },
      { subject: "Computer Science", teacher: "Ms. Lisa Chen", room: "Computer Lab", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300" },
    ],
    Thursday: [
      { subject: "Science", teacher: "Ms. Sarah Johnson", room: "Lab 3", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
      { subject: "History", teacher: "Mr. James Thompson", room: "Room 302", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
      { subject: "Lunch Break", teacher: "", room: "Cafeteria", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" },
      { subject: "Foreign Language", teacher: "Ms. Maria Garcia", room: "Room 204", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" },
      { subject: "Study Hall", teacher: "", room: "Library", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
    ],
    Friday: [
      { subject: "Mathematics", teacher: "Mr. Robert Davis", room: "Room 101", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
      { subject: "Science", teacher: "Ms. Sarah Johnson", room: "Lab 3", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
      { subject: "Lunch Break", teacher: "", room: "Cafeteria", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" },
      { subject: "English", teacher: "Mrs. Emily Wilson", room: "Room 205", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
      { subject: "Club Activities", teacher: "", room: "Various", color: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300" },
    ],
  }
  
  // Get current date
  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  
  // Navigate to previous/next week
  const navigateToPreviousWeek = () => {
    setCurrentWeek("previous")
  }
  
  const navigateToNextWeek = () => {
    setCurrentWeek("next")
  }
  
  return (
    <>
      <PageHeader 
        title="Timetable" 
        description="View your weekly class schedule"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
            <span className="sr-only">Print timetable</span>
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download timetable</span>
          </Button>
        </div>
      </PageHeader>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>{formattedDate}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={navigateToPreviousWeek}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous week</span>
              </Button>
              <Button variant="outline" onClick={() => setCurrentWeek("current")}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Current Week
              </Button>
              <Button variant="outline" size="icon" onClick={navigateToNextWeek}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next week</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly" className="space-y-4">
            <TabsList>
              <TabsTrigger value="weekly">Weekly View</TabsTrigger>
              <TabsTrigger value="daily">Daily View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weekly" className="space-y-4">
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <div className="grid grid-cols-6 gap-2">
                    <div className="p-2 font-medium">Time</div>
                    {days.map((day) => (
                      <div key={day} className="p-2 text-center font-medium">{day}</div>
                    ))}
                  </div>
                  
                  {periods.map((period, periodIndex) => (
                    <div key={periodIndex} className="grid grid-cols-6 gap-2 border-t">
                      <div className="p-2 text-sm">
                        <div className="font-medium">{period.label}</div>
                        <div className="text-xs text-muted-foreground">{period.time}</div>
                      </div>
                      
                      {days.map((day) => {
                        const lesson = timetable[day][periodIndex]
                        return (
                          <div key={`${day}-${periodIndex}`} className="p-2">
                            <div className={`rounded-md p-2 ${lesson.color}`}>
                              <div className="font-medium">{lesson.subject}</div>
                              {lesson.teacher && (
                                <div className="text-xs">{lesson.teacher}</div>
                              )}
                              <div className="mt-1 text-xs">
                                <Badge variant="outline" className="text-xs">
                                  {lesson.room}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="daily" className="space-y-4">
              <div className="flex items-center justify-between">
                <Select defaultValue="Monday">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Today
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {periods.map((period, periodIndex) => {
                  const lesson = timetable.Monday[periodIndex]
                  return (
                    <Card key={periodIndex}>
                      <CardContent className="p-0">
                        <div className="flex items-start gap-4 p-4">
                          <div className="flex h-16 w-16 flex-col items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <span className="text-xs">{period.time.split(' - ')[0]}</span>
                            <span className="text-xs">{period.time.split(' - ')[1]}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{lesson.subject}</h4>
                              <Badge>{lesson.room}</Badge>
                            </div>
                            {lesson.teacher && (
                              <p className="text-sm text-muted-foreground">{lesson.teacher}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Classes</CardTitle>
            <CardDescription>Monday, May 10, 2023</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {timetable.Monday.map((lesson, index) => (
              <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <span className="text-xs">{periods[index].time.split(' - ')[0]}</span>
                  <span className="text-xs">{periods[index].time.split(' - ')[1]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{lesson.subject}</h4>
                    <Badge>{lesson.room}</Badge>
                  </div>
                  {lesson.teacher && (
                    <p className="text-sm text-muted-foreground">{lesson.teacher}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Related to your classes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                <span className="text-xs">May</span>
                <span className="text-lg font-bold">11</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Science Project Due</h4>
                  <Badge variant="outline">11:59 PM</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Renewable Energy Project</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                <span className="text-xs">May</span>
                <span className="text-lg font-bold">13</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Mathematics Quiz</h4>
                  <Badge variant="outline">9:00 AM</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Quadratic Equations</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                <span className="text-xs">May</span>
                <span className="text-lg font-bold">15</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Parent-Teacher Meeting</h4>
                  <Badge variant="outline">9:00 AM</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Conference Room</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
