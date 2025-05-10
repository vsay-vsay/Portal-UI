"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Plus } from "lucide-react"

export default function StudentCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState("month")

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Mathematics Exam",
      date: new Date(2025, 4, 15),
      time: "09:00 AM - 11:00 AM",
      location: "Room 101",
      type: "exam",
      description: "Mid-term examination covering chapters 1-5",
    },
    {
      id: 2,
      title: "Science Project Submission",
      date: new Date(2025, 4, 18),
      time: "11:59 PM",
      location: "Online",
      type: "assignment",
      description: "Final submission of the semester project",
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      date: new Date(2025, 4, 20),
      time: "04:00 PM - 06:00 PM",
      location: "School Auditorium",
      type: "meeting",
      description: "Discuss academic progress and address concerns",
    },
    {
      id: 4,
      title: "Sports Day",
      date: new Date(2025, 4, 25),
      time: "09:00 AM - 03:00 PM",
      location: "School Grounds",
      type: "event",
      description: "Annual sports competition between houses",
    },
    {
      id: 5,
      title: "Computer Science Lab",
      date: new Date(2025, 4, 9),
      time: "02:00 PM - 03:30 PM",
      location: "Computer Lab",
      type: "class",
      description: "Practical session on database management",
    },
  ]

  // Get events for the selected date
  const selectedDateEvents = events.filter((event) => date && event.date.toDateString() === date.toDateString())

  // Function to get badge variant based on event type
  const getEventBadgeVariant = (type: string) => {
    switch (type) {
      case "exam":
        return "destructive"
      case "assignment":
        return "default"
      case "meeting":
        return "secondary"
      case "event":
        return "outline"
      case "class":
        return "default"
      default:
        return "outline"
    }
  }

  // Function to format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageHeader title="Academic Calendar" subtitle="View and manage your academic schedule and events" />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Calendar</CardTitle>
                <div className="flex items-center gap-2">
                  <Select defaultValue={view} onValueChange={setView}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="View" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{date ? formatDate(date) : "Select a date"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center p-2">
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Events in the next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events
                  .filter((event) => {
                    const today = new Date()
                    const thirtyDaysLater = new Date()
                    thirtyDaysLater.setDate(today.getDate() + 30)
                    return event.date >= today && event.date <= thirtyDaysLater
                  })
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((event) => (
                    <div key={event.id} className="flex items-start gap-4 p-3 border rounded-lg">
                      <div className="text-center min-w-[60px]">
                        <p className="text-sm font-medium">{event.date.getDate()}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.date.toLocaleString("default", { month: "short" })}
                        </p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{event.title}</p>
                          <Badge variant={getEventBadgeVariant(event.type)}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{date ? formatDate(date) : "No Date Selected"}</CardTitle>
              <CardDescription>{selectedDateEvents.length} events scheduled</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{event.title}</p>
                        <Badge variant={getEventBadgeVariant(event.type)}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{event.time}</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                      <p className="text-sm mt-2">{event.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-center">
                  <p className="text-muted-foreground mb-2">No events scheduled for this date</p>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
