import { BookOpen, FileText, GraduationCap, BarChart } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/teacher/page-header"
import { StatsCard } from "@/components/teacher/stats-card"

// Sample data for subjects
const subjects = [
  {
    id: 1,
    name: "Mathematics",
    classes: 5,
    students: 145,
    completedTopics: 18,
    totalTopics: 25,
    averageGrade: 82,
    description: "Core mathematics curriculum covering algebra, geometry, and calculus fundamentals.",
    topics: [
      { name: "Algebra", progress: 100, status: "completed" },
      { name: "Linear Equations", progress: 100, status: "completed" },
      { name: "Quadratic Equations", progress: 75, status: "in-progress" },
      { name: "Geometry", progress: 50, status: "in-progress" },
      { name: "Trigonometry", progress: 25, status: "in-progress" },
      { name: "Calculus", progress: 0, status: "not-started" },
    ],
    resources: 24,
    assessments: 15,
  },
  {
    id: 2,
    name: "Physics",
    classes: 2,
    students: 58,
    completedTopics: 8,
    totalTopics: 20,
    averageGrade: 78,
    description: "Introductory physics covering mechanics, thermodynamics, and basic electromagnetism.",
    topics: [
      { name: "Mechanics", progress: 100, status: "completed" },
      { name: "Newton's Laws", progress: 100, status: "completed" },
      { name: "Energy & Work", progress: 80, status: "in-progress" },
      { name: "Thermodynamics", progress: 30, status: "in-progress" },
      { name: "Electromagnetism", progress: 0, status: "not-started" },
    ],
    resources: 18,
    assessments: 10,
  },
  {
    id: 3,
    name: "Computer Science",
    classes: 1,
    students: 32,
    completedTopics: 12,
    totalTopics: 15,
    averageGrade: 88,
    description: "Introduction to programming concepts, algorithms, and data structures.",
    topics: [
      { name: "Programming Basics", progress: 100, status: "completed" },
      { name: "Data Types & Variables", progress: 100, status: "completed" },
      { name: "Control Structures", progress: 100, status: "completed" },
      { name: "Functions", progress: 90, status: "in-progress" },
      { name: "Data Structures", progress: 60, status: "in-progress" },
    ],
    resources: 30,
    assessments: 8,
  },
]

export default function TeacherSubjectsPage() {
  return (
    <>
      <PageHeader title="My Subjects" description="Manage your teaching subjects and curriculum" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Subjects" value={subjects.length} description="Across all grades" icon={BookOpen} />
        <StatsCard
          title="Total Classes"
          value={subjects.reduce((acc, subject) => acc + subject.classes, 0)}
          description="Teaching sessions"
          icon={GraduationCap}
        />
        <StatsCard
          title="Total Students"
          value={subjects.reduce((acc, subject) => acc + subject.students, 0)}
          description="Enrolled in your subjects"
          icon={GraduationCap}
        />
        <StatsCard
          title="Average Grade"
          value={`${Math.round(subjects.reduce((acc, subject) => acc + subject.averageGrade, 0) / subjects.length)}%`}
          description="Across all subjects"
          icon={BarChart}
        />
      </div>

      <div className="mt-6 space-y-6">
        {subjects.map((subject) => (
          <Card key={subject.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{subject.name}</CardTitle>
                  <CardDescription>{subject.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <GraduationCap className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>{subject.students} Students</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>
                      {subject.completedTopics}/{subject.totalTopics} Topics
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="curriculum">
                <TabsList className="mb-4">
                  <TabsTrigger value="curriculum">Curriculum Progress</TabsTrigger>
                  <TabsTrigger value="classes">Classes</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                <TabsContent value="curriculum">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Overall Progress</h3>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((subject.completedTopics / subject.totalTopics) * 100)}% Complete
                      </span>
                    </div>
                    <Progress value={(subject.completedTopics / subject.totalTopics) * 100} className="h-2" />

                    <div className="mt-6 space-y-4">
                      <h3 className="text-sm font-medium">Topics</h3>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {subject.topics.map((topic, index) => (
                          <div key={index} className="rounded-lg border p-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium">{topic.name}</h4>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                  topic.status === "completed"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : topic.status === "in-progress"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                      : "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400"
                                }`}
                              >
                                {topic.status === "completed"
                                  ? "Completed"
                                  : topic.status === "in-progress"
                                    ? "In Progress"
                                    : "Not Started"}
                              </span>
                            </div>
                            <div className="mt-2">
                              <Progress value={topic.progress} className="h-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="classes">
                  <div className="rounded-lg border">
                    <div className="grid grid-cols-3 gap-4 p-4 font-medium border-b">
                      <div>Class</div>
                      <div>Schedule</div>
                      <div>Students</div>
                    </div>
                    <div className="divide-y">
                      {Array.from({ length: subject.classes }).map((_, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 p-4">
                          <div>
                            <div className="font-medium">
                              Grade {10 + index}-{String.fromCharCode(65 + index)}
                            </div>
                            <div className="text-sm text-muted-foreground">Room {101 + index * 10}</div>
                          </div>
                          <div>
                            <div>
                              {index % 2 === 0 ? "Mon, Wed, Fri" : "Tue, Thu"} • {9 + index}:00 AM
                            </div>
                          </div>
                          <div>
                            {Math.floor(subject.students / subject.classes) +
                              (index === 0 ? subject.students % subject.classes : 0)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="resources">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Teaching Materials</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{Math.floor(subject.resources * 0.6)}</div>
                        <p className="text-xs text-muted-foreground">Lesson plans, slides, and handouts</p>
                      </CardContent>
                      <CardFooter>
                        <a href="#" className="text-sm text-primary">
                          View Materials
                        </a>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Assessments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{subject.assessments}</div>
                        <p className="text-xs text-muted-foreground">Quizzes, tests, and assignments</p>
                      </CardContent>
                      <CardFooter>
                        <a href="#" className="text-sm text-primary">
                          View Assessments
                        </a>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Reference Materials</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{Math.floor(subject.resources * 0.4)}</div>
                        <p className="text-xs text-muted-foreground">Textbooks, articles, and videos</p>
                      </CardContent>
                      <CardFooter>
                        <a href="#" className="text-sm text-primary">
                          View References
                        </a>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <a href={`/erp/teacher-subjects/${subject.id}`} className="text-sm text-primary">
                View Subject Details
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}
