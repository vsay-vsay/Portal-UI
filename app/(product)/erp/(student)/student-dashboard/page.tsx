"use client";

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/page-header"
import { Calendar, Clock, GraduationCap, BookOpen, FileCheck, Bell, CalendarCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { StatsCard } from "@/components/student/stats-card";

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageHeader
        title="Student Dashboard"
        subtitle="Welcome back, John! Here's an overview of your academic progress."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Attendance"
          value="92%"
          description="Current semester"
          icon={<CalendarCheck className="h-5 w-5" />}
          trend="up"
          trendValue="3%"
        />
        <StatsCard
          title="GPA"
          value="3.8"
          description="Current semester"
          icon={<GraduationCap className="h-5 w-5" />}
          trend="up"
          trendValue="0.2"
        />
        <StatsCard
          title="Assignments"
          value="5"
          description="Pending submissions"
          icon={<FileCheck className="h-5 w-5" />}
          trend="down"
          trendValue="2"
        />
        <StatsCard
          title="Classes Today"
          value="4"
          description="Next: Mathematics at 11:00 AM"
          icon={<Clock className="h-5 w-5" />}
          trend="neutral"
          trendValue=""
        />
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timetable">Today's Timetable</TabsTrigger>
          <TabsTrigger value="assignments">Pending Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Academic Progress</CardTitle>
                <CardDescription>Your current semester progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Mathematics</div>
                      <div className="text-sm text-muted-foreground">85%</div>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Physics</div>
                      <div className="text-sm text-muted-foreground">92%</div>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Computer Science</div>
                      <div className="text-sm text-muted-foreground">78%</div>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">English</div>
                      <div className="text-sm text-muted-foreground">88%</div>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Mid-term Exam</p>
                      <p className="text-sm text-muted-foreground">Tomorrow, 9:00 AM</p>
                      <Badge className="mt-1" variant="outline">
                        Mathematics
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Project Submission</p>
                      <p className="text-sm text-muted-foreground">May 12, 11:59 PM</p>
                      <Badge className="mt-1" variant="outline">
                        Computer Science
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Science Fair</p>
                      <p className="text-sm text-muted-foreground">May 15, 10:00 AM</p>
                      <Badge className="mt-1" variant="outline">
                        School Event
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
                <CardDescription>Latest updates from your school</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="font-medium">School Holiday Announcement</p>
                    <p className="text-sm text-muted-foreground">
                      The school will remain closed on May 20 due to local elections.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="font-medium">Fee Payment Reminder</p>
                    <p className="text-sm text-muted-foreground">
                      Last date for fee payment is May 15. Please ensure timely payment.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="font-medium">Sports Day Schedule</p>
                    <p className="text-sm text-muted-foreground">
                      Annual sports day will be held on May 25. Check the schedule.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Grades</CardTitle>
                <CardDescription>Your latest assessment results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded-md">
                        <p className="text-green-700 dark:text-green-300 font-medium">A</p>
                      </div>
                      <div>
                        <p className="font-medium">Mathematics Quiz</p>
                        <p className="text-sm text-muted-foreground">92/100</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">May 2</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
                        <p className="text-blue-700 dark:text-blue-300 font-medium">B+</p>
                      </div>
                      <div>
                        <p className="font-medium">Physics Lab Report</p>
                        <p className="text-sm text-muted-foreground">85/100</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Apr 28</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded-md">
                        <p className="text-green-700 dark:text-green-300 font-medium">A-</p>
                      </div>
                      <div>
                        <p className="font-medium">English Essay</p>
                        <p className="text-sm text-muted-foreground">88/100</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Apr 25</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timetable" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Monday, May 9, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="text-center min-w-[60px]">
                    <p className="text-sm font-medium">08:00</p>
                    <p className="text-xs text-muted-foreground">09:30</p>
                  </div>
                  <div className="w-1 self-stretch bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">English</p>
                      <Badge>Room 101</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Ms. Sarah Johnson</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg">
                  <div className="text-center min-w-[60px]">
                    <p className="text-sm font-medium">09:45</p>
                    <p className="text-xs text-muted-foreground">11:15</p>
                  </div>
                  <div className="w-1 self-stretch bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Mathematics</p>
                      <Badge>Room 203</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Mr. Robert Chen</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg">
                  <div className="text-center min-w-[60px]">
                    <p className="text-sm font-medium">11:30</p>
                    <p className="text-xs text-muted-foreground">13:00</p>
                  </div>
                  <div className="w-1 self-stretch bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Physics</p>
                      <Badge>Lab 2</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Dr. Michael Brown</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg">
                  <div className="text-center min-w-[60px]">
                    <p className="text-sm font-medium">13:00</p>
                    <p className="text-xs text-muted-foreground">14:00</p>
                  </div>
                  <div className="w-1 self-stretch bg-muted rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Lunch Break</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg">
                  <div className="text-center min-w-[60px]">
                    <p className="text-sm font-medium">14:00</p>
                    <p className="text-xs text-muted-foreground">15:30</p>
                  </div>
                  <div className="w-1 self-stretch bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Computer Science</p>
                      <Badge>Computer Lab</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Ms. Emily Zhang</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Assignments</CardTitle>
              <CardDescription>Assignments due in the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex gap-4">
                    <div className="bg-red-100 dark:bg-red-900 p-2 rounded-md">
                      <FileCheck className="h-5 w-5 text-red-600 dark:text-red-300" />
                    </div>
                    <div>
                      <p className="font-medium">Mathematics Problem Set</p>
                      <p className="text-sm text-muted-foreground">Chapter 7: Calculus</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">High Priority</Badge>
                        <p className="text-xs text-muted-foreground">Due: Tomorrow</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">Start</Button>
                </div>

                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex gap-4">
                    <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-md">
                      <FileCheck className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                    </div>
                    <div>
                      <p className="font-medium">Physics Lab Report</p>
                      <p className="text-sm text-muted-foreground">Experiment: Ohm's Law</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">Medium Priority</Badge>
                        <p className="text-xs text-muted-foreground">Due: May 12</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">Start</Button>
                </div>

                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex gap-4">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-md">
                      <FileCheck className="h-5 w-5 text-green-600 dark:text-green-300" />
                    </div>
                    <div>
                      <p className="font-medium">English Essay</p>
                      <p className="text-sm text-muted-foreground">Topic: Modern Literature</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">Low Priority</Badge>
                        <p className="text-xs text-muted-foreground">Due: May 15</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">Start</Button>
                </div>

                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex gap-4">
                    <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-md">
                      <FileCheck className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                    </div>
                    <div>
                      <p className="font-medium">Computer Science Project</p>
                      <p className="text-sm text-muted-foreground">Web Application Development</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">Medium Priority</Badge>
                        <p className="text-xs text-muted-foreground">Due: May 16</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">Start</Button>
                </div>

                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex gap-4">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-md">
                      <FileCheck className="h-5 w-5 text-green-600 dark:text-green-300" />
                    </div>
                    <div>
                      <p className="font-medium">History Presentation</p>
                      <p className="text-sm text-muted-foreground">Topic: Industrial Revolution</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">Low Priority</Badge>
                        <p className="text-xs text-muted-foreground">Due: May 18</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">Start</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
