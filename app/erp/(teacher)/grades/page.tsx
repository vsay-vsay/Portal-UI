"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  FileBarChart2,
  Download,
  Upload,
  Filter,
  ChevronDown,
  Save,
  FileText,
  BarChart3,
  PieChart,
  LineChart,
  Users,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Grades() {
  const [selectedClass, setSelectedClass] = useState("10A")
  const [selectedSubject, setSelectedSubject] = useState("Mathematics")
  const [selectedAssessment, setSelectedAssessment] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const assessments = [
    { id: "quiz1", name: "Quiz 1", type: "Quiz", maxMarks: 20, date: "Apr 10, 2025" },
    { id: "midterm", name: "Midterm Exam", type: "Exam", maxMarks: 50, date: "Apr 15, 2025" },
    { id: "assignment1", name: "Assignment 1", type: "Assignment", maxMarks: 30, date: "Apr 20, 2025" },
    { id: "quiz2", name: "Quiz 2", type: "Quiz", maxMarks: 20, date: "Apr 25, 2025" },
    { id: "project", name: "Term Project", type: "Project", maxMarks: 100, date: "May 1, 2025" },
  ]

  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      rollNo: "10A01",
      grades: {
        quiz1: 18,
        midterm: 45,
        assignment1: 28,
        quiz2: 17,
        project: 90,
      },
    },
    {
      id: 2,
      name: "Bob Smith",
      rollNo: "10A02",
      grades: {
        quiz1: 15,
        midterm: 40,
        assignment1: 25,
        quiz2: 16,
        project: 85,
      },
    },
    {
      id: 3,
      name: "Charlie Brown",
      rollNo: "10A03",
      grades: {
        quiz1: 12,
        midterm: 35,
        assignment1: 22,
        quiz2: 14,
        project: 75,
      },
    },
    {
      id: 4,
      name: "Diana Miller",
      rollNo: "10A04",
      grades: {
        quiz1: 19,
        midterm: 48,
        assignment1: 29,
        quiz2: 19,
        project: 95,
      },
    },
    {
      id: 5,
      name: "Edward Davis",
      rollNo: "10A05",
      grades: {
        quiz1: 16,
        midterm: 42,
        assignment1: 26,
        quiz2: 15,
        project: 82,
      },
    },
    {
      id: 6,
      name: "Fiona Wilson",
      rollNo: "10A06",
      grades: {
        quiz1: 17,
        midterm: 44,
        assignment1: 27,
        quiz2: 18,
        project: 88,
      },
    },
    {
      id: 7,
      name: "George Taylor",
      rollNo: "10A07",
      grades: {
        quiz1: 14,
        midterm: 38,
        assignment1: 24,
        quiz2: 16,
        project: 80,
      },
    },
    {
      id: 8,
      name: "Hannah Moore",
      rollNo: "10A08",
      grades: {
        quiz1: 20,
        midterm: 49,
        assignment1: 30,
        quiz2: 20,
        project: 98,
      },
    },
    {
      id: 9,
      name: "Ian Clark",
      rollNo: "10A09",
      grades: {
        quiz1: 13,
        midterm: 36,
        assignment1: 23,
        quiz2: 15,
        project: 78,
      },
    },
    {
      id: 10,
      name: "Julia Adams",
      rollNo: "10A10",
      grades: {
        quiz1: 18,
        midterm: 46,
        assignment1: 28,
        quiz2: 18,
        project: 92,
      },
    },
  ]

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const calculateTotal = (grades: Record<string, number>) => {
    return Object.values(grades).reduce((sum, grade) => sum + grade, 0)
  }

  const calculatePercentage = (grades: Record<string, number>) => {
    const total = calculateTotal(grades)
    const maxTotal = assessments.reduce((sum, assessment) => sum + assessment.maxMarks, 0)
    return Math.round((total / maxTotal) * 100)
  }

  const getGradeLabel = (percentage: number) => {
    if (percentage >= 90) return "A+"
    if (percentage >= 80) return "A"
    if (percentage >= 70) return "B"
    if (percentage >= 60) return "C"
    if (percentage >= 50) return "D"
    return "F"
  }

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500"
    if (percentage >= 80) return "bg-green-400"
    if (percentage >= 70) return "bg-yellow-400"
    if (percentage >= 60) return "bg-yellow-500"
    if (percentage >= 50) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Grades Management</h1>
          <p className="text-muted-foreground">Manage and analyze student grades for your classes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Grades
          </Button>
          <Button>
            <FileBarChart2 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Grades</CardTitle>
          <CardDescription>
            Manage grades for Class {selectedClass} - {selectedSubject}
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
              <Label htmlFor="assessment">Assessment</Label>
              <Select value={selectedAssessment} onValueChange={setSelectedAssessment}>
                <SelectTrigger id="assessment">
                  <SelectValue placeholder="Select assessment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assessments</SelectItem>
                  {assessments.map((assessment) => (
                    <SelectItem key={assessment.id} value={assessment.id}>
                      {assessment.name} ({assessment.maxMarks} marks)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Highest to Lowest</DropdownMenuItem>
                  <DropdownMenuItem>Lowest to Highest</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Grade A</DropdownMenuItem>
                  <DropdownMenuItem>Grade B</DropdownMenuItem>
                  <DropdownMenuItem>Grade C</DropdownMenuItem>
                  <DropdownMenuItem>Grade D</DropdownMenuItem>
                  <DropdownMenuItem>Grade F</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </div>

          <Tabs defaultValue="table" className="pt-2">
            <TabsList>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="card">Card View</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="table" className="pt-4">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">No.</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Roll No.</TableHead>
                      {selectedAssessment === "all" ? (
                        assessments.map((assessment) => (
                          <TableHead key={assessment.id} className="text-center">
                            {assessment.name}
                            <br />
                            <span className="text-xs text-muted-foreground">({assessment.maxMarks})</span>
                          </TableHead>
                        ))
                      ) : (
                        <TableHead className="text-center">
                          {assessments.find((a) => a.id === selectedAssessment)?.name || ""}
                          <br />
                          <span className="text-xs text-muted-foreground">
                            ({assessments.find((a) => a.id === selectedAssessment)?.maxMarks || 0})
                          </span>
                        </TableHead>
                      )}
                      <TableHead className="text-center">Total</TableHead>
                      <TableHead className="text-center">Percentage</TableHead>
                      <TableHead className="text-center">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => {
                      const percentage = calculatePercentage(student.grades)
                      const gradeLabel = getGradeLabel(percentage)

                      return (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.rollNo}</TableCell>
                          {selectedAssessment === "all" ? (
                            assessments.map((assessment) => (
                              <TableCell key={assessment.id} className="text-center">
                                <Input
                                  type="number"
                                  value={student.grades[assessment.id]}
                                  className="h-8 text-center w-16 mx-auto"
                                  min={0}
                                  max={assessment.maxMarks}
                                />
                              </TableCell>
                            ))
                          ) : (
                            <TableCell className="text-center">
                              <Input
                                type="number"
                                value={student.grades[selectedAssessment]}
                                className="h-8 text-center w-16 mx-auto"
                                min={0}
                                max={assessments.find((a) => a.id === selectedAssessment)?.maxMarks || 0}
                              />
                            </TableCell>
                          )}
                          <TableCell className="text-center font-medium">{calculateTotal(student.grades)}</TableCell>
                          <TableCell className="text-center">{percentage}%</TableCell>
                          <TableCell>
                            <Badge className={`mx-auto ${getGradeColor(percentage)} text-white`}>{gradeLabel}</Badge>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end mt-4">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="card" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStudents.map((student) => {
                  const percentage = calculatePercentage(student.grades)
                  const gradeLabel = getGradeLabel(percentage)

                  return (
                    <Card key={student.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{student.name}</CardTitle>
                            <CardDescription>{student.rollNo}</CardDescription>
                          </div>
                          <Badge className={`${getGradeColor(percentage)} text-white`}>Grade: {gradeLabel}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-3">
                          {assessments.map((assessment) => (
                            <div key={assessment.id} className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span>{assessment.name}</span>
                                <span className="font-medium">
                                  {student.grades[assessment.id]}/{assessment.maxMarks}
                                </span>
                              </div>
                              <Progress
                                value={(student.grades[assessment.id] / assessment.maxMarks) * 100}
                                className="h-1"
                              />
                            </div>
                          ))}
                          <div className="pt-2 flex items-center justify-between">
                            <span className="text-sm font-medium">Total Score:</span>
                            <span className="font-bold">
                              {calculateTotal(student.grades)}/{assessments.reduce((sum, a) => sum + a.maxMarks, 0)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Percentage:</span>
                            <span className="font-bold">{percentage}%</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button variant="outline" size="sm" className="w-full">
                          <FileBarChart2 className="mr-2 h-4 w-4" />
                          View Detailed Report
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="pt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
                    <CardDescription>Distribution of grades across the class</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center p-6">
                    <div className="w-full h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                      <PieChart className="h-16 w-16 text-muted" />
                      <span className="sr-only">Pie chart showing grade distribution</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Performance</CardTitle>
                    <CardDescription>Average scores per assessment</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center p-6">
                    <div className="w-full h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                      <BarChart3 className="h-16 w-16 text-muted" />
                      <span className="sr-only">Bar chart showing assessment performance</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trend</CardTitle>
                    <CardDescription>Class performance over time</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center p-6">
                    <div className="w-full h-[250px] flex items-center justify-center bg-muted/20 rounded-md">
                      <LineChart className="h-16 w-16 text-muted" />
                      <span className="sr-only">Line chart showing performance trend</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Class Statistics</CardTitle>
                    <CardDescription>Statistical analysis of class performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { label: "Class Average", value: "78%" },
                        { label: "Highest Score", value: "98%" },
                        { label: "Lowest Score", value: "52%" },
                        { label: "Standard Deviation", value: "12.5" },
                        { label: "Pass Rate", value: "92%" },
                      ].map((stat, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-sm">{stat.label}</span>
                          <span className="font-medium">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                    <CardDescription>Students with highest overall scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {students
                        .sort((a, b) => calculatePercentage(b.grades) - calculatePercentage(a.grades))
                        .slice(0, 5)
                        .map((student, i) => (
                          <div key={i} className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-3">
                              {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{student.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{student.rollNo}</p>
                            </div>
                            <Badge className={`${getGradeColor(calculatePercentage(student.grades))} text-white`}>
                              {calculatePercentage(student.grades)}%
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t pt-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Showing {filteredStudents.length} of {students.length} students
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Finalize Grades
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
