"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarCheck,
  Search,
  Users,
  Clock,
  Calendar,
  ChevronLeft,
  Check,
  X,
  AlertCircle,
  Save,
  FileText,
  Send,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function TakeAttendance() {
  const searchParams = useSearchParams()
  const classId = searchParams.get("class") || "10A"

  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState(classId)
  const [selectedSubject, setSelectedSubject] = useState("Mathematics")
  const [attendanceData, setAttendanceData] = useState<
    {
      id: number
      name: string
      rollNo: string
      status: "present" | "absent" | "late" | "excused" | ""
      note: string
    }[]
  >([
    { id: 1, name: "Alice Johnson", rollNo: "10A01", status: "present", note: "" },
    { id: 2, name: "Bob Smith", rollNo: "10A02", status: "present", note: "" },
    { id: 3, name: "Charlie Brown", rollNo: "10A03", status: "late", note: "Arrived 10 minutes late" },
    { id: 4, name: "Diana Miller", rollNo: "10A04", status: "absent", note: "" },
    { id: 5, name: "Edward Davis", rollNo: "10A05", status: "present", note: "" },
    { id: 6, name: "Fiona Wilson", rollNo: "10A06", status: "present", note: "" },
    { id: 7, name: "George Taylor", rollNo: "10A07", status: "excused", note: "Medical appointment" },
    { id: 8, name: "Hannah Moore", rollNo: "10A08", status: "present", note: "" },
    { id: 9, name: "Ian Clark", rollNo: "10A09", status: "present", note: "" },
    { id: 10, name: "Julia Adams", rollNo: "10A10", status: "present", note: "" },
    { id: 11, name: "Kevin Lewis", rollNo: "10A11", status: "present", note: "" },
    { id: 12, name: "Laura Hall", rollNo: "10A12", status: "present", note: "" },
    { id: 13, name: "Michael Young", rollNo: "10A13", status: "absent", note: "No notification received" },
    { id: 14, name: "Nancy King", rollNo: "10A14", status: "present", note: "" },
    { id: 15, name: "Oliver Scott", rollNo: "10A15", status: "present", note: "" },
  ])

  const filteredStudents = attendanceData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const updateAttendance = (id: number, status: "present" | "absent" | "late" | "excused" | "") => {
    setAttendanceData((prev) => prev.map((student) => (student.id === id ? { ...student, status } : student)))
  }

  const updateNote = (id: number, note: string) => {
    setAttendanceData((prev) => prev.map((student) => (student.id === id ? { ...student, note } : student)))
  }

  const markAllPresent = () => {
    setAttendanceData((prev) => prev.map((student) => ({ ...student, status: "present" })))
  }

  const getStatusCounts = () => {
    const counts = {
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
      unmarked: 0,
    }

    attendanceData.forEach((student) => {
      if (student.status === "present") counts.present++
      else if (student.status === "absent") counts.absent++
      else if (student.status === "late") counts.late++
      else if (student.status === "excused") counts.excused++
      else counts.unmarked++
    })

    return counts
  }

  const statusCounts = getStatusCounts()
  const attendanceRate = Math.round(((statusCounts.present + statusCounts.late) / attendanceData.length) * 100)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Take Attendance</h1>
          <p className="text-muted-foreground">Record student attendance for your classes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/erp/teacher-classes">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Classes
            </Link>
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Attendance
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Attendance</CardTitle>
          <CardDescription>
            Record attendance for Class {selectedClass} - {selectedSubject}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10A">Class 10A</SelectItem>
                  <SelectItem value="11B">Class 11B</SelectItem>
                  <SelectItem value="12C">Class 12C</SelectItem>
                  <SelectItem value="9D">Class 9D</SelectItem>
                  <SelectItem value="10E">Class 10E</SelectItem>
                  <SelectItem value="11F">Class 11F</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="flex">
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon" className="ml-2">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" onClick={markAllPresent}>
                Mark All Present
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>Total: {attendanceData.length}</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1 bg-green-500/10">
                <Check className="h-3 w-3" />
                <span>Present: {statusCounts.present}</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1 bg-red-500/10">
                <X className="h-3 w-3" />
                <span>Absent: {statusCounts.absent}</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1 bg-yellow-500/10">
                <Clock className="h-3 w-3" />
                <span>Late: {statusCounts.late}</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1 bg-blue-500/10">
                <AlertCircle className="h-3 w-3" />
                <span>Excused: {statusCounts.excused}</span>
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="list" className="pt-2">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="pt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">No.</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Roll No.</TableHead>
                      <TableHead className="w-32">Status</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.rollNo}</TableCell>
                        <TableCell>
                          <Select
                            value={student.status}
                            onValueChange={(value) => updateAttendance(student.id, value as any)}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="present">Present</SelectItem>
                              <SelectItem value="absent">Absent</SelectItem>
                              <SelectItem value="late">Late</SelectItem>
                              <SelectItem value="excused">Excused</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="Add note (optional)"
                            value={student.note}
                            onChange={(e) => updateNote(student.id, e.target.value)}
                            className="h-8"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="grid" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStudents.map((student) => (
                  <Card key={student.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{student.name}</CardTitle>
                          <CardDescription>{student.rollNo}</CardDescription>
                        </div>
                        <Badge
                          variant={
                            student.status === "present"
                              ? "default"
                              : student.status === "absent"
                                ? "destructive"
                                : student.status === "late"
                                  ? "outline"
                                  : student.status === "excused"
                                    ? "secondary"
                                    : "outline"
                          }
                        >
                          {student.status
                            ? student.status.charAt(0).toUpperCase() + student.status.slice(1)
                            : "Unmarked"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={student.status === "present" ? "default" : "outline"}
                          size="sm"
                          className="w-full"
                          onClick={() => updateAttendance(student.id, "present")}
                        >
                          <Check className="mr-1 h-4 w-4" />
                          Present
                        </Button>
                        <Button
                          variant={student.status === "absent" ? "destructive" : "outline"}
                          size="sm"
                          className="w-full"
                          onClick={() => updateAttendance(student.id, "absent")}
                        >
                          <X className="mr-1 h-4 w-4" />
                          Absent
                        </Button>
                        <Button
                          variant={student.status === "late" ? "default" : "outline"}
                          size="sm"
                          className={`w-full ${student.status === "late" ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                          onClick={() => updateAttendance(student.id, "late")}
                        >
                          <Clock className="mr-1 h-4 w-4" />
                          Late
                        </Button>
                        <Button
                          variant={student.status === "excused" ? "default" : "outline"}
                          size="sm"
                          className={`w-full ${student.status === "excused" ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                          onClick={() => updateAttendance(student.id, "excused")}
                        >
                          <AlertCircle className="mr-1 h-4 w-4" />
                          Excused
                        </Button>
                      </div>
                      <div className="mt-2">
                        <Input
                          placeholder="Add note (optional)"
                          value={student.note}
                          onChange={(e) => updateNote(student.id, e.target.value)}
                          className="h-8"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t pt-6">
          <div className="space-y-2 w-full md:w-auto">
            <Label htmlFor="remarks">Class Remarks</Label>
            <Textarea
              id="remarks"
              placeholder="Add any general remarks about today's class..."
              className="min-h-24 md:w-96"
            />
          </div>
          <div className="flex flex-col items-end gap-2 w-full md:w-auto">
            <div className="text-2xl font-bold flex items-center gap-2">
              <CalendarCheck className="h-6 w-6 text-primary" />
              <span>Attendance: {attendanceRate}%</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Save as Draft
              </Button>
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Submit Attendance
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
