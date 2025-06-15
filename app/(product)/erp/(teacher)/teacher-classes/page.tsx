import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Clock,
  CalendarClock,
  CalendarCheck,
  ChevronRight,
  FileText,
  BarChart3,
  LineChart,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function TeacherClasses() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Classes</h1>
          <p className="text-muted-foreground">Manage your assigned classes and student groups</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <CalendarClock className="mr-2 h-4 w-4" />
            View Timetable
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Create Lesson Plan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Classes</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
          <TabsTrigger value="archived">Archived Classes</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "10A",
                name: "Class 10A",
                subject: "Mathematics",
                students: 32,
                schedule: "Mon, Wed, Fri - 08:30 AM",
                room: "Room 101",
                attendance: 92,
                progress: 65,
                nextClass: "Today, 08:30 AM",
                topics: ["Algebra", "Geometry", "Trigonometry", "Calculus"],
              },
              {
                id: "11B",
                name: "Class 11B",
                subject: "Physics",
                students: 28,
                schedule: "Tue, Thu - 10:00 AM",
                room: "Room 203",
                attendance: 88,
                progress: 72,
                nextClass: "Today, 10:00 AM",
                topics: ["Mechanics", "Thermodynamics", "Optics", "Electromagnetism"],
              },
              {
                id: "12C",
                name: "Class 12C",
                subject: "Computer Science",
                students: 24,
                schedule: "Mon, Wed - 01:30 PM",
                room: "Lab 3",
                attendance: 95,
                progress: 80,
                nextClass: "Today, 01:30 PM",
                topics: ["Programming", "Data Structures", "Algorithms", "Databases"],
              },
              {
                id: "9D",
                name: "Class 9D",
                subject: "Mathematics",
                students: 35,
                schedule: "Tue, Thu, Fri - 03:00 PM",
                room: "Room 105",
                attendance: 90,
                progress: 60,
                nextClass: "Tomorrow, 03:00 PM",
                topics: ["Algebra", "Geometry", "Statistics", "Probability"],
              },
              {
                id: "10E",
                name: "Class 10E",
                subject: "Physics",
                students: 30,
                schedule: "Mon, Wed - 11:30 AM",
                room: "Room 202",
                attendance: 85,
                progress: 68,
                nextClass: "Tomorrow, 11:30 AM",
                topics: ["Mechanics", "Waves", "Electricity", "Modern Physics"],
              },
              {
                id: "11F",
                name: "Class 11F",
                subject: "Computer Science",
                students: 26,
                schedule: "Tue, Thu - 01:00 PM",
                room: "Lab 2",
                attendance: 93,
                progress: 75,
                nextClass: "Tomorrow, 01:00 PM",
                topics: ["Web Development", "Object-Oriented Programming", "Networking", "Cybersecurity"],
              },
            ].map((classItem) => (
              <Card key={classItem.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{classItem.name}</CardTitle>
                      <CardDescription>{classItem.subject}</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {classItem.students} Students
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{classItem.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{classItem.room}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Attendance Rate</span>
                        <span className="font-medium">{classItem.attendance}%</span>
                      </div>
                      <Progress value={classItem.attendance} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Syllabus Progress</span>
                        <span className="font-medium">{classItem.progress}%</span>
                      </div>
                      <Progress value={classItem.progress} className="h-1" />
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Next Class: {classItem.nextClass}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-stretch border-t pt-4 pb-2">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {classItem.topics.map((topic, i) => (
                      <Badge key={i} variant="secondary" className="font-normal">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/erp/take-attendance?class=${classItem.id}`}>
                        <CalendarCheck className="mr-2 h-4 w-4" />
                        Take Attendance
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/erp/teacher-classes/${classItem.id}`}>
                        View Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "8G",
                name: "Class 8G",
                subject: "Mathematics",
                students: 36,
                schedule: "Starting June 1, 2025",
                room: "Room 104",
                topics: ["Basic Algebra", "Geometry", "Statistics"],
              },
              {
                id: "9H",
                name: "Class 9H",
                subject: "Physics",
                students: 32,
                schedule: "Starting June 1, 2025",
                room: "Room 205",
                topics: ["Mechanics", "Energy", "Waves"],
              },
            ].map((classItem) => (
              <Card key={classItem.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{classItem.name}</CardTitle>
                      <CardDescription>{classItem.subject}</CardDescription>
                    </div>
                    <Badge variant="outline">{classItem.students} Students</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{classItem.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{classItem.room}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {classItem.topics.map((topic, i) => (
                        <Badge key={i} variant="secondary" className="font-normal">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Prepare Lesson Plan
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="archived" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "10X",
                name: "Class 10X",
                subject: "Mathematics",
                students: 34,
                period: "Jan - Apr 2025",
                performance: 88,
                topics: ["Algebra", "Geometry", "Trigonometry"],
              },
              {
                id: "11Y",
                name: "Class 11Y",
                subject: "Physics",
                students: 30,
                period: "Jan - Apr 2025",
                performance: 82,
                topics: ["Mechanics", "Thermodynamics", "Optics"],
              },
              {
                id: "12Z",
                name: "Class 12Z",
                subject: "Computer Science",
                students: 28,
                period: "Jan - Apr 2025",
                performance: 90,
                topics: ["Programming", "Data Structures", "Algorithms"],
              },
            ].map((classItem) => (
              <Card key={classItem.id} className="bg-muted/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{classItem.name}</CardTitle>
                      <CardDescription>{classItem.subject}</CardDescription>
                    </div>
                    <Badge variant="outline">Archived</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Period: {classItem.period}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{classItem.students} Students</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Average Performance</span>
                        <span className="font-medium">{classItem.performance}%</span>
                      </div>
                      <Progress value={classItem.performance} className="h-1" />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {classItem.topics.map((topic, i) => (
                        <Badge key={i} variant="secondary" className="font-normal">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Performance Report
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Class Performance Overview</CardTitle>
            <CardDescription>Average performance across all active classes</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6">
            <div className="w-full h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
              <BarChart3 className="h-16 w-16 text-muted" />
              <span className="sr-only">Bar chart showing class performance</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <LineChart className="mr-2 h-4 w-4" />
              View Detailed Analytics
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Class Activities</CardTitle>
            <CardDescription>Latest updates from your classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { class: "Class 10A", activity: "Quiz on Algebra completed", time: "Today, 09:45 AM" },
                { class: "Class 11B", activity: "Lab experiment on Wave Motion", time: "Today, 11:15 AM" },
                {
                  class: "Class 12C",
                  activity: "Programming assignment submitted by 20 students",
                  time: "Yesterday, 02:30 PM",
                },
                { class: "Class 9D", activity: "Attendance below 85% this week", time: "Yesterday, 04:15 PM" },
                { class: "Class 10E", activity: "Test scheduled for next week", time: "2 days ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                    {activity.class.split(" ")[1]}
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">{activity.class}</p>
                    <p className="text-sm text-muted-foreground">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Activities
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
