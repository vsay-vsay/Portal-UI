"use client"

import { useState } from "react"
import { AlertCircle, BookCopy, Calendar, FileText, List, Upload } from "lucide-react"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Sample data for lesson plans
const lessonPlans = [
  {
    id: 1,
    title: "Introduction to Quadratic Equations",
    subject: "Mathematics",
    class: "Grade 10-A",
    duration: "1 week",
    status: "active",
    objectives: [
      "Define and identify quadratic equations",
      "Solve quadratic equations using factoring",
      "Graph quadratic functions and identify key features",
    ],
    resources: ["Textbook: Algebra II, Chapter 5", "Practice Worksheets", "Digital Graphing Calculator"],
    upcoming: "May 8, 2023",
  },
  {
    id: 2,
    title: "Linear Equations and Inequalities",
    subject: "Mathematics",
    class: "Grade 9-B",
    duration: "2 weeks",
    status: "active",
    objectives: [
      "Solve multi-step linear equations",
      "Solve and graph linear inequalities",
      "Apply linear equations to real-world problems",
    ],
    resources: ["Textbook: Algebra I, Chapter 3", "Interactive Online Tool", "Word Problem Worksheets"],
    upcoming: "May 8, 2023",
  },
  {
    id: 3,
    title: "Introduction to Calculus",
    subject: "Mathematics",
    class: "Grade 11-C",
    duration: "3 weeks",
    status: "draft",
    objectives: ["Understand the concept of limits", "Explore continuity of functions", "Introduction to derivatives"],
    resources: ["Textbook: Pre-Calculus, Chapter 10", "Video Tutorials", "Problem Sets"],
    upcoming: "May 15, 2023",
  },
  {
    id: 4,
    title: "Statistical Analysis",
    subject: "Mathematics",
    class: "Grade 12-A",
    duration: "2 weeks",
    status: "completed",
    objectives: [
      "Calculate measures of central tendency",
      "Analyze data distributions",
      "Apply statistical methods to datasets",
    ],
    resources: ["Textbook: Statistics, Chapter 4", "Statistical Software", "Real-world Data Sets"],
    upcoming: "Completed",
  },
]

export default function LessonPlansPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlan, setSelectedPlan] = useState<null | any>(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)

  const filteredPlans = lessonPlans.filter(
    (plan) =>
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.class.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      

      <div className="mb-4 flex items-center justify-between">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="list">
            <List className="mr-2 h-4 w-4" /> List View
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <Calendar className="mr-2 h-4 w-4" /> Calendar View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlans.map((plan) => (
              <Card key={plan.id} className={plan.status === "draft" ? "border-dashed" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{plan.title}</CardTitle>
                    <div
                      className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        plan.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                          : plan.status === "draft"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400"
                      }`}
                    >
                      {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                    </div>
                  </div>
                  <CardDescription>
                    {plan.class} • {plan.subject} • {plan.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Objectives:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        {plan.objectives.map((objective, index) => (
                          <li key={index}>{objective}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Resources:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        {plan.resources.map((resource, index) => (
                          <li key={index}>{resource}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    {plan.status !== "completed" ? (
                      <>
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>Next: {plan.upcoming}</span>
                      </>
                    ) : (
                      <>
                        <BookCopy className="mr-1 h-4 w-4" />
                        <span>Archived</span>
                      </>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedPlan(plan)}>
                    {plan.status === "draft" ? "Edit" : "View"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Calendar</CardTitle>
              <CardDescription>View your lesson plans in a calendar format</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px]">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Calendar View Coming Soon</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We're working on implementing a calendar view for your lesson plans.
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Use List View in the meantime</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedPlan && (
        <Dialog open={!!selectedPlan} onOpenChange={(open) => !open && setSelectedPlan(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedPlan.title}</DialogTitle>
              <DialogDescription>
                {selectedPlan.class} • {selectedPlan.subject} • {selectedPlan.duration}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <h4 className="text-sm font-medium">Learning Objectives:</h4>
                <ul className="space-y-1 list-disc list-inside text-sm">
                  {selectedPlan.objectives.map((objective: string, index: number) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-2">
                <h4 className="text-sm font-medium">Resources & Materials:</h4>
                <ul className="space-y-1 list-disc list-inside text-sm">
                  {selectedPlan.resources.map((resource: string, index: number) => (
                    <li key={index}>{resource}</li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-2">
                <h4 className="text-sm font-medium">Lesson Structure:</h4>
                <div className="rounded-md border p-4 space-y-3 text-sm">
                  <div>
                    <h5 className="font-medium">Introduction (10 minutes)</h5>
                    <p className="text-muted-foreground">
                      Review previous concepts and introduce new topic with a hook.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium">Direct Instruction (20 minutes)</h5>
                    <p className="text-muted-foreground">Present core concepts with examples and demonstrations.</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Guided Practice (15 minutes)</h5>
                    <p className="text-muted-foreground">Work through problems as a class with teacher guidance.</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Independent Practice (15 minutes)</h5>
                    <p className="text-muted-foreground">Students work on problems individually or in groups.</p>
                  </div>
                  <div>
                    <h5 className="font-medium">Assessment & Closure (10 minutes)</h5>
                    <p className="text-muted-foreground">Exit ticket and summary of key concepts.</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" /> Print
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
              <div className="flex gap-2">
                {selectedPlan.status === "draft" && (
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                )}
                <Button size="sm" onClick={() => setSelectedPlan(null)}>
                  Close
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Lesson Plan</DialogTitle>
            <DialogDescription>
              Create a structured plan for your upcoming lessons. Fill out the form below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Lesson Title</Label>
              <Input id="title" placeholder="e.g. Introduction to Quadratic Equations" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Select defaultValue="mathematics">
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="class">Class</Label>
                <Select>
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grade-10a">Grade 10-A</SelectItem>
                    <SelectItem value="grade-9b">Grade 9-B</SelectItem>
                    <SelectItem value="grade-11c">Grade 11-C</SelectItem>
                    <SelectItem value="grade-12a">Grade 12-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" placeholder="e.g. 1 week" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="objectives">Learning Objectives</Label>
              <Textarea id="objectives" placeholder="Enter one objective per line" rows={3} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resources">Resources & Materials</Label>
              <Textarea id="resources" placeholder="Enter one resource per line" rows={3} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assessments">Assessment Methods</Label>
              <Textarea id="assessments" placeholder="How will you assess student understanding?" rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">Save as Draft</Button>
            <Button onClick={() => setIsAddEventOpen(false)}>Create Lesson Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
