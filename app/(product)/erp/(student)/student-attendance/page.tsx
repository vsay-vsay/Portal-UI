import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Check, Clock, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const monthlyAttendance = [
  { date: "Jun 1, 2023", day: "Thursday", status: "present", subject: "All Classes" },
  { date: "Jun 2, 2023", day: "Friday", status: "present", subject: "All Classes" },
  { date: "Jun 5, 2023", day: "Monday", status: "present", subject: "All Classes" },
  { date: "Jun 6, 2023", day: "Tuesday", status: "present", subject: "All Classes" },
  { date: "Jun 7, 2023", day: "Wednesday", status: "absent", subject: "All Classes", reason: "Sick Leave" },
  { date: "Jun 8, 2023", day: "Thursday", status: "present", subject: "All Classes" },
  { date: "Jun 9, 2023", day: "Friday", status: "present", subject: "All Classes" },
  { date: "Jun 12, 2023", day: "Monday", status: "present", subject: "All Classes" },
]

const subjectAttendance = [
  { subject: "Advanced Mathematics", present: 15, total: 16, percentage: 93.75 },
  { subject: "Physics II: Electromagnetism", present: 14, total: 16, percentage: 87.5 },
  { subject: "Introduction to Computer Science", present: 16, total: 16, percentage: 100 },
  { subject: "English Literature", present: 13, total: 15, percentage: 86.67 },
  { subject: "Introduction to Biology", present: 14, total: 15, percentage: 93.33 },
  { subject: "Organic Chemistry", present: 15, total: 15, percentage: 100 },
]

export default function StudentAttendancePage() {
  return (
    <div className="container space-y-6 p-4 md:p-8">
      <PageHeader title="Attendance" description="Track your attendance records and statistics" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">Out of 93 school days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
            <X className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Including approved leaves</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93.5%</div>
            <Progress value={93.5} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">Academic Year 2022-2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consecutive Present</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 days</div>
            <p className="text-xs text-muted-foreground">Current streak</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monthly">
        <TabsList className="grid w-full grid-cols-2 md:w-auto">
          <TabsTrigger value="monthly">Monthly View</TabsTrigger>
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <Select defaultValue="june">
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="june">June 2023</SelectItem>
                <SelectItem value="may">May 2023</SelectItem>
                <SelectItem value="april">April 2023</SelectItem>
                <SelectItem value="march">March 2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>June 2023</CardTitle>
              <CardDescription>Attendance record for current month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyAttendance.map((day, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <span className="font-medium">{day.date}</span>
                        <span className="ml-2 text-sm text-muted-foreground">({day.day})</span>
                      </div>
                      {day.reason && <span className="text-sm text-muted-foreground">Reason: {day.reason}</span>}
                    </div>
                    <Badge variant={day.status === "present" ? "default" : "destructive"} className="capitalize">
                      {day.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {subjectAttendance.map((subject, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{subject.subject}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Attendance Rate:</span>
                      <span className="font-medium">{subject.percentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={subject.percentage} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>
                        Present: {subject.present}/{subject.total} classes
                      </span>
                      <span>Absent: {subject.total - subject.present} classes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
