import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, GraduationCap, BookOpen, ClipboardList, FileCheck, MessageCircle, Bell, CalendarCheck, Clock, ArrowUpRight, ChevronRight, Users, BarChart3, LineChart, PieChart } from 'lucide-react'

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John Doe! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden md:flex">
            <Calendar className="mr-2 h-4 w-4" />
            May 6, 2025
          </Button>
          <Button>
            <Bell className="mr-2 h-4 w-4" />
            View Notifications
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              5 classes today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Mathematics, Physics, Computer Science
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              5 need grading
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Tests</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Next: May 10, 2025
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your classes and meetings for today</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="space-y-4">
                  {[
                    { time: "08:30 - 09:30", title: "Mathematics - Class 10A", location: "Room 101", status: "Upcoming" },
                    { time: "10:00 - 11:00", title: "Physics - Class 11B", location: "Room 203", status: "Upcoming" },
                    { time: "11:30 - 12:30", title: "Department Meeting", location: "Conference Room", status: "Upcoming" },
                    { time: "13:30 - 14:30", title: "Computer Science - Class 12C", location: "Lab 3", status: "Upcoming" },
                    { time: "15:00 - 16:00", title: "Mathematics - Class 9D", location: "Room 105", status: "Upcoming" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start">
                      <div className="min-w-24 text-sm font-medium">{item.time}</div>
                      <div className="flex-1 ml-4 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none">{item.title}</p>
                          <Badge variant="outline">{item.status}</Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {item.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
                <CardDescription>Tasks that need your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Grade Class 10A Math Quiz", due: "Today", priority: "High" },
                    { title: "Prepare Physics Lab Materials", due: "Today", priority: "Medium" },
                    { title: "Submit Weekly Progress Report", due: "Tomorrow", priority: "High" },
                    { title: "Review Curriculum Updates", due: "May 8", priority: "Medium" },
                    { title: "Parent-Teacher Meeting Preparation", due: "May 9", priority: "Low" },
                  ].map((task, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{task.title}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          Due: {task.due}
                        </div>
                      </div>
                      <Badge variant={
                        task.priority === "High" ? "destructive" : 
                        task.priority === "Medium" ? "default" : 
                        "secondary"
                      }>
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Messages</span>
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Principal Smith", message: "Please submit the quarterly assessment report by Friday.", time: "1 hour ago" },
                    { name: "Mrs. Johnson (Parent)", message: "Can we schedule a meeting to discuss Alex's progress?", time: "3 hours ago" },
                    { name: "Mr. Williams (Science Dept.)", message: "The department meeting is rescheduled to Thursday.", time: "Yesterday" },
                  ].map((message, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                        {message.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{message.name}</p>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{message.message}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    View All Messages
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>Attendance Overview</span>
                  <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { class: "Class 10A - Mathematics", attendance: 92 },
                    { class: "Class 11B - Physics", attendance: 88 },
                    { class: "Class 12C - Computer Science", attendance: 95 },
                    { class: "Class 9D - Mathematics", attendance: 90 },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{item.class}</p>
                        <span className="text-sm">{item.attendance}%</span>
                      </div>
                      <Progress value={item.attendance} className="h-2" />
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    View Detailed Report
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>Upcoming Events</span>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "Parent-Teacher Meeting", date: "May 12, 2025", type: "Meeting" },
                    { title: "Science Exhibition", date: "May 15, 2025", type: "Event" },
                    { title: "End of Term Exams", date: "May 20-25, 2025", type: "Exam" },
                    { title: "Staff Development Day", date: "May 28, 2025", type: "Training" },
                  ].map((event, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{event.title}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {event.date}
                        </div>
                        <Badge variant="outline" className="text-xs">{event.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="week" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
                <CardDescription>Student performance across your classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between gap-2 pr-6">
                  {[75, 82, 90, 68, 88, 92, 78].map((height, i) => (
                    <div key={i} className="relative group">
                      <div
                        className="w-12 bg-primary/10 rounded-t-sm hover:bg-primary/20 transition-colors"
                        style={{ height: `${height * 2.5}px` }}
                      >
                        <div
                          className="absolute bottom-0 w-12 bg-primary rounded-t-sm transition-all duration-500"
                          style={{ height: `${height * 2.5 * 0.6}px` }}
                        />
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md whitespace-nowrap transition-opacity">
                        {height}%
                      </div>
                      <div className="text-xs text-center mt-2 text-muted-foreground">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Weekly Statistics</CardTitle>
                <CardDescription>Key metrics for this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Classes Conducted", value: "24", icon: Users, change: "+2", changeType: "positive" },
                    { title: "Assignments Given", value: "8", icon: ClipboardList, change: "+1", changeType: "positive" },
                    { title: "Average Attendance", value: "91%", icon: CalendarCheck, change: "-2%", changeType: "negative" },
                    { title: "Tests Conducted", value: "3", icon: FileCheck, change: "0", changeType: "neutral" },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary mr-3">
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{stat.title}</p>
                        <div className="flex items-center">
                          <p className="text-xl font-bold">{stat.value}</p>
                          <span className={`ml-2 text-xs flex items-center ${
                            stat.changeType === "positive" ? "text-green-500" : 
                            stat.changeType === "negative" ? "text-red-500" : 
                            "text-muted-foreground"
                          }`}>
                            {stat.changeType === "positive" && <ArrowUpRight className="h-3 w-3 mr-1" />}
                            {stat.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="month" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Class performance trends</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div className="w-full h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                  <LineChart className="h-16 w-16 text-muted" />
                  <span className="sr-only">Line chart showing performance trends</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Subject Distribution</CardTitle>
                <CardDescription>Hours spent per subject</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div className="w-full h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                  <PieChart className="h-16 w-16 text-muted" />
                  <span className="sr-only">Pie chart showing subject distribution</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Assessment Results</CardTitle>
                <CardDescription>Student performance by assessment type</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <div className="w-full h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                  <BarChart3 className="h-16 w-16 text-muted" />
                  <span className="sr-only">Bar chart showing assessment results</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
