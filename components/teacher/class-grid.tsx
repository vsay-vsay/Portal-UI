"use client"

import Link from "next/link"
import { BookOpen, Clock, Users } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ClassGrid() {
  const classes = [
    {
      id: 1,
      name: "Class 9A",
      subject: "Mathematics",
      students: 32,
      schedule: "Mon, Wed, Fri - 09:30 AM",
      progress: 78,
      room: "Room 105",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      name: "Class 10B",
      subject: "Mathematics",
      students: 28,
      schedule: "Mon, Wed, Fri - 11:00 AM",
      progress: 65,
      room: "Room 203",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      name: "Class 11C",
      subject: "Mathematics",
      students: 30,
      schedule: "Tue, Thu - 01:30 PM",
      progress: 82,
      room: "Room 301",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 4,
      name: "Class 9B",
      subject: "Mathematics",
      students: 31,
      schedule: "Tue, Thu - 09:30 AM",
      progress: 71,
      room: "Room 106",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 5,
      name: "Class 10A",
      subject: "Mathematics",
      students: 29,
      schedule: "Mon, Wed, Fri - 03:00 PM",
      progress: 88,
      room: "Room 202",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 6,
      name: "Class 11A",
      subject: "Mathematics",
      students: 27,
      schedule: "Tue, Thu - 11:00 AM",
      progress: 75,
      room: "Room 302",
      image: "/placeholder.svg?height=100&width=200",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {classes.map((classItem) => (
        <Card key={classItem.id} className="overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={classItem.image || "/placeholder.svg"}
              alt={classItem.name}
              className="h-full w-full object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle>{classItem.name} - {classItem.subject}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{classItem.students} Students</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{classItem.schedule}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{classItem.room}</span>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Syllabus Progress</span>
                  <span className="font-medium">{classItem.progress}%</span>
                </div>
                <Progress value={classItem.progress} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/erp/teacher-classes/${classItem.id}`}>View Class</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
