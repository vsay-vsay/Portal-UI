"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, Download } from "lucide-react"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample timetable data
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
]

const timetableData = {
  Monday: {
    "09:00 - 10:00": { class: "Grade 10-A", subject: "Mathematics", room: "Room 101" },
    "11:00 - 12:00": { class: "Grade 9-B", subject: "Mathematics", room: "Room 203" },
    "14:00 - 15:00": { class: "Grade 12-A", subject: "Mathematics", room: "Room 302" },
  },
  Tuesday: {
    "10:00 - 11:00": { class: "Grade 10-C", subject: "Mathematics", room: "Room 104" },
    "14:00 - 15:00": { class: "Grade 11-C", subject: "Mathematics", room: "Room 105" },
  },
  Wednesday: {
    "09:00 - 10:00": { class: "Grade 10-A", subject: "Mathematics", room: "Room 101" },
    "11:00 - 12:00": { class: "Grade 9-B", subject: "Mathematics", room: "Room 203" },
  },
  Thursday: {
    "10:00 - 11:00": { class: "Grade 10-C", subject: "Mathematics", room: "Room 104" },
    "14:00 - 15:00": { class: "Grade 11-C", subject: "Mathematics", room: "Room 105" },
  },
  Friday: {
    "09:00 - 10:00": { class: "Grade 10-A", subject: "Mathematics", room: "Room 101" },
    "14:00 - 15:00": { class: "Grade 12-A", subject: "Mathematics", room: "Room 302" },
  },
}

// Sample weekly schedule
const weeklySchedule = [
  {
    day: "Monday",
    classes: [
      { time: "09:00 - 10:00", class: "Grade 10-A", subject: "Mathematics", room: "Room 101" },
      { time: "11:00 - 12:00", class: "Grade 9-B", subject: "Mathematics", room: "Room 203" },
      { time: "14:00 - 15:00", class: "Grade 12-A", subject: "Mathematics", room: "Room 302" },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      { time: "10:00 - 11:00", class: "Grade 10-C", subject: "Mathematics", room: "Room 104" },
      { time: "14:00 - 15:00", class: "Grade 11-C", subject: "Mathematics", room: "Room 105" },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      { time: "09:00 - 10:00", class: "Grade 10-A", subject: "Mathematics", room: "Room 101" },
      { time: "11:00 - 12:00", class: "Grade 9-B", subject: "Mathematics", room: "Room 203" },
    ],
  },
  {
    day: "Thursday",
    classes: [
      { time: "10:00 - 11:00", class: "Grade 10-C", subject: "Mathematics", room: "Room 104" },
      { time: "14:00 - 15:00", class: "Grade 11-C", subject: "Mathematics", room: "Room 105" },
    ],
  },
  {
    day: "Friday",
    classes: [
      { time: "09:00 - 10:00", class: "Grade 10-A", subject: "Mathematics", room: "Room 101" },
      { time: "14:00 - 15:00", class: "Grade 12-A", subject: "Mathematics", room: "Room 302" },
    ],
  },
]

export default function TeacherTimetablePage() {
  const [currentWeek, setCurrentWeek] = useState("May 8 - May 12, 2023")
  const [selectedClass, setSelectedClass] = useState("all")

  return (
    <>
     

      <div className="mb-4 flex items-center justify-between">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="grade-10a">Grade 10-A</SelectItem>
            <SelectItem value="grade-9b">Grade 9-B</SelectItem>
            <SelectItem value="grade-11c">Grade 11-C</SelectItem>
            <SelectItem value="grade-12a">Grade 12-A</SelectItem>
            <SelectItem value="grade-10c">Grade 10-C</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="grid">
        <TabsList className="mb-4">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Your teaching timetable for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <div className="grid grid-cols-[100px_repeat(5,1fr)] gap-2">
                    <div className="font-medium p-2"></div>
                    {weekdays.map((day) => (
                      <div key={day} className="font-medium p-2 text-center">
                        {day}
                      </div>
                    ))}

                    {timeSlots.map((timeSlot) => (
                      <>
                        <div key={timeSlot} className="p-2 text-sm text-muted-foreground">
                          {timeSlot}
                        </div>
                        {weekdays.map((day) => {
                          const classData = timetableData[day]?.[timeSlot]
                          return (
                            <div
                              key={`${day}-${timeSlot}`}
                              className={`p-2 rounded-md ${
                                classData ? "bg-primary/10 border border-primary/20" : "border border-dashed"
                              }`}
                            >
                              {classData && (
                                <div className="text-sm">
                                  <div className="font-medium">{classData.class}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {classData.subject} • {classData.room}
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <div className="space-y-6">
            {weeklySchedule.map((day) => (
              <Card key={day.day}>
                <CardHeader>
                  <CardTitle>{day.day}</CardTitle>
                  <CardDescription>
                    {day.classes.length} {day.classes.length === 1 ? "class" : "classes"} scheduled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {day.classes.length > 0 ? (
                    <div className="space-y-4">
                      {day.classes.map((cls, index) => (
                        <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{cls.class}</h4>
                              <p className="text-sm text-muted-foreground">
                                {cls.subject} • {cls.room}
                              </p>
                            </div>
                          </div>
                          <div className="text-sm">{cls.time}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-[100px] items-center justify-center rounded-md border border-dashed">
                      <p className="text-sm text-muted-foreground">No classes scheduled for this day</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
