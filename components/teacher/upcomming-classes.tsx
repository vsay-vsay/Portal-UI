"use client"

import { Clock } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function UpcomingClasses() {
  const classes = [
    {
      id: 1,
      subject: "Mathematics",
      class: "Class 10B",
      time: "09:30 AM - 10:30 AM",
      room: "Room 203",
      status: "upcoming",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      subject: "Mathematics",
      class: "Class 9A",
      time: "11:00 AM - 12:00 PM",
      room: "Room 105",
      status: "upcoming",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      subject: "Mathematics",
      class: "Class 11C",
      time: "01:30 PM - 02:30 PM",
      room: "Room 301",
      status: "upcoming",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      subject: "Mathematics",
      class: "Class 10A",
      time: "03:00 PM - 04:00 PM",
      room: "Room 202",
      status: "upcoming",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="space-y-4">
      {classes.map((classItem) => (
        <div key={classItem.id} className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={classItem.avatar || "/placeholder.svg"} alt={classItem.class} />
            <AvatarFallback>{classItem.class.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{classItem.subject} - {classItem.class}</p>
              <Badge variant="outline">{classItem.room}</Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {classItem.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
