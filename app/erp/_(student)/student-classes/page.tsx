"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Calendar, Clock, FileText, GraduationCap, Users } from "lucide-react"

export default function StudentClassesPage() {
  // Sample classes data
  const classes = [
    {
      id: 1,
      name: "Mathematics",
      code: "MATH101",
      teacher: {
        name: "Robert Chen",
        avatar: "/avatars/robert-chen.jpg",
        initials: "RC",
      },
      schedule: "Mon, Wed, Fri - 09:45 AM to 11:15 AM",
      room: "Room 203",
      progress: 65,
      students: 32,
      assignments: 8,
      completedAssignments: 6,
      upcomingExam: "Mid-term Exam on May 15",
      materials: 12,
      description:
        "This course covers fundamental concepts in calculus, algebra, and geometry, providing a strong foundation for advanced mathematical studies.",
    },
    {
      id: 2,
      name: "Physics",
      code: "PHYS101",
      teacher: {
        name: "Michael Brown",
        avatar: "/avatars/michael-brown.jpg",
        initials: "MB",
      },
      schedule: "Tue, Thu - 11:30 AM to 01:00 PM",
      room: "Lab 2",
      progress: 72,
      students: 28,
      assignments: 6,
      completedAssignments: 5,
      upcomingExam: "Lab Test on May 18",
      materials: 9,
      description:
        "An introduction to classical mechanics, thermodynamics, and basic principles of physics with practical laboratory experiments.",
    },
    {
      id: 3,
      name: "Computer Science",
      code: "CS101",
      teacher: {
        name: "Emily Zhang",
        avatar: "/avatars/emily-zhang.jpg",
        initials: "EZ",
      },
      schedule: "Mon, Wed - 02:00 PM to 03:30 PM",
      room: "Computer Lab",
      progress: 58,
      students: 25,
      assignments: 10,
      completedAssignments: 7,
      upcomingExam: "Programming Project due on May 20",
      materials: 15,
      description:
        "Introduction to programming concepts, algorithms, and data structures using Python and Java programming languages.",
    },
    {
      id: 4,
      name: "English",
      code: "ENG101",
      teacher: {
        name: "Sarah Johnson",
        avatar: "/avatars/sarah-johnson.jpg",
        initials: "SJ",
      },
      schedule: "Mon, Thu - 08:00 AM to 09:30 AM",
      room: "Room 101",
      progress: 80,
      students: 30,
      assignments: 5,
      completedAssignments: 4,
      upcomingExam: "Essay Submission on May 16",
      materials: 8,
      description:
        "This course focuses on developing critical reading, writing, and analytical skills through the study of literature and composition.",
    },
    {
      id: 5,
      name: "History",
      code: "HIST101",
      teacher: {
        name: "David Wilson",
        avatar: "/avatars/david-wilson.jpg",
        initials: "DW",
      },
      schedule: "Tue, Fri - 01:00 PM to 02:30 PM",
      room: "Room 105",
      progress: 70,
      students: 35,
      assignments: 4,
      completedAssignments: 3,
      upcomingExam: "Presentation on May 22",
      materials: 10,
      description:
        "A comprehensive study of world history from ancient civilizations to modern times, with emphasis on cultural, political, and social developments.",
    },
  ]

  const [selectedClass, setSelectedClass] = useState(classes[0])

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageHeader title="My Classes" subtitle="View and manage your enrolled classes" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {classes.map((classItem) => (
          <Card
            key={classItem.id}
            className={`cursor-pointer transition-all hover:border-primary ${selectedClass.id === classItem.id ? "border-primary" : ""}`}
            onClick={() => setSelectedClass(classItem)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{classItem.name}</CardTitle>
                  <CardDescription>{classItem.code}</CardDescription>
                </div>
                <Badge>{classItem.room}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={classItem.teacher.avatar || "/placeholder.svg"} alt={classItem.teacher.name} />
                  <AvatarFallback>{classItem.teacher.initials}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{classItem.teacher.name}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{classItem.progress}%</span>
                </div>
                <Progress value={classItem.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedClass && (
        <Card className="mt-4">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">{selectedClass.name}</CardTitle>
                <CardDescription>
                  {selectedClass.code} • {selectedClass.room}
                </CardDescription>
              </div>
              <Button>Access Class Materials</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="grades">Grades</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Class Information</h3>
                      <p className="text-sm text-muted-foreground">{selectedClass.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Schedule</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedClass.schedule}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Instructor</h3>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={selectedClass.teacher.avatar || "/placeholder.svg"}
                            alt={selectedClass.teacher.name}
                          />
                          <AvatarFallback>{selectedClass.teacher.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedClass.teacher.name}</p>
                          <p className="text-sm text-muted-foreground">Mathematics Department</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Class Progress</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Overall Progress</span>
                          <span>{selectedClass.progress}%</span>
                        </div>
                        <Progress value={selectedClass.progress} className="h-2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{selectedClass.students}</p>
                              <p className="text-xs text-muted-foreground">Students</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{selectedClass.assignments}</p>
                              <p className="text-xs text-muted-foreground">Assignments</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{selectedClass.materials}</p>
                              <p className="text-xs text-muted-foreground">Materials</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">B+</p>
                              <p className="text-xs text-muted-foreground">Current Grade</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Upcoming</h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <p className="text-sm">{selectedClass.upcomingExam}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="assignments" className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Assignments</h3>
                  <div className="text-sm text-muted-foreground">
                    Completed: {selectedClass.completedAssignments}/{selectedClass.assignments}
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Sample assignments for the selected class */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Problem Set: Differential Equations</h4>
                          <p className="text-sm text-muted-foreground mt-1">Due: May 12, 2025</p>
                          <Badge variant="outline" className="mt-2">
                            Submitted
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Research Paper: Mathematical Applications</h4>
                          <p className="text-sm text-muted-foreground mt-1">Due: May 18, 2025</p>
                          <Badge variant="destructive" className="mt-2">
                            Pending
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          Start
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Group Project: Statistical Analysis</h4>
                          <p className="text-sm text-muted-foreground mt-1">Due: May 25, 2025</p>
                          <Badge variant="secondary" className="mt-2">
                            In Progress
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          Continue
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="materials" className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Class Materials</h3>
                  <div className="text-sm text-muted-foreground">{selectedClass.materials} items</div>
                </div>

                <div className="space-y-3">
                  {/* Sample materials for the selected class */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className="bg-muted p-2 rounded">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">Lecture Notes: Introduction to Calculus</h4>
                            <p className="text-sm text-muted-foreground mt-1">Uploaded: May 2, 2025</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className="bg-muted p-2 rounded">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">Textbook: Advanced Mathematics</h4>
                            <p className="text-sm text-muted-foreground mt-1">Uploaded: April 15, 2025</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className="bg-muted p-2 rounded">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">Practice Problems: Algebra Review</h4>
                            <p className="text-sm text-muted-foreground mt-1">Uploaded: April 28, 2025</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="grades" className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Grades</h3>
                  <div className="text-sm text-muted-foreground">Current Average: B+ (85%)</div>
                </div>

                <div className="space-y-3">
                  {/* Sample grades for the selected class */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Quiz 1: Limits and Continuity</h4>
                          <p className="text-sm text-muted-foreground mt-1">Date: April 10, 2025</p>
                        </div>
                        <Badge className="text-lg">92%</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Homework: Derivatives</h4>
                          <p className="text-sm text-muted-foreground mt-1">Date: April 18, 2025</p>
                        </div>
                        <Badge className="text-lg">88%</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Mid-term Exam: Chapters 1-3</h4>
                          <p className="text-sm text-muted-foreground mt-1">Date: April 25, 2025</p>
                        </div>
                        <Badge className="text-lg">85%</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Group Project: Mathematical Modeling</h4>
                          <p className="text-sm text-muted-foreground mt-1">Date: May 2, 2025</p>
                        </div>
                        <Badge className="text-lg">90%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
