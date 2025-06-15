import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, Clock, FileText } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

const upcomingExams = [
  {
    id: "exam1",
    title: "Mid-Term Examination",
    subject: "Advanced Mathematics",
    date: "Jun 20, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Examination Hall A",
    topics: ["Differential Equations", "Vector Calculus", "Multivariable Functions"],
    status: "upcoming",
    daysLeft: 8,
  },
  {
    id: "exam2",
    title: "Lab Practical",
    subject: "Physics II: Electromagnetism",
    date: "Jun 22, 2023",
    time: "2:00 PM - 4:00 PM",
    location: "Physics Laboratory 102",
    topics: ["Circuit Analysis", "Magnetic Fields", "Electromagnetic Induction"],
    status: "upcoming",
    daysLeft: 10,
  },
  {
    id: "exam3",
    title: "Mid-Term Examination",
    subject: "Introduction to Computer Science",
    date: "Jun 25, 2023",
    time: "9:00 AM - 11:00 AM",
    location: "Examination Hall B",
    topics: ["Data Structures", "Algorithms", "Programming Fundamentals"],
    status: "upcoming",
    daysLeft: 13,
  },
]

const completedExams = [
  {
    id: "exam4",
    title: "Quiz 2",
    subject: "English Literature",
    date: "Jun 5, 2023",
    score: 85,
    maxScore: 100,
    grade: "B+",
    feedback: "Good analysis of themes, but could improve on textual references.",
    status: "completed",
  },
  {
    id: "exam5",
    title: "Mid-Term Examination",
    subject: "Organic Chemistry",
    date: "Jun 2, 2023",
    score: 78,
    maxScore: 100,
    grade: "C+",
    feedback: "Adequate understanding of reaction mechanisms, but needs improvement in stereochemistry concepts.",
    status: "completed",
  },
  {
    id: "exam6",
    title: "Programming Assignment",
    subject: "Introduction to Computer Science",
    date: "May 28, 2023",
    score: 92,
    maxScore: 100,
    grade: "A-",
    feedback: "Excellent code structure and implementation. Minor issues with documentation.",
    status: "completed",
  },
]

export default function StudentExamsPage() {
  return (
    <div className="container space-y-6 p-4 md:p-8">
      <PageHeader title="Exams" description="View your upcoming and completed examinations" />

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-2 md:w-auto">
          <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
          <TabsTrigger value="completed">Completed Exams</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingExams.map((exam) => (
            <Card key={exam.id}>
              <CardHeader>
                <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
                  <div>
                    <CardTitle>{exam.title}</CardTitle>
                    <CardDescription>{exam.subject}</CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {exam.daysLeft} days left
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Date & Time</p>
                        <p className="text-sm text-muted-foreground">
                          {exam.date}, {exam.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{exam.location}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Topics Covered</p>
                    <ul className="mt-2 space-y-1">
                      {exam.topics.map((topic, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{exam.time}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Bell className="mr-2 h-4 w-4" />
                    Set Reminder
                  </Button>
                  <Button size="sm">View Details</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedExams.map((exam) => (
            <Card key={exam.id}>
              <CardHeader>
                <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
                  <div>
                    <CardTitle>{exam.title}</CardTitle>
                    <CardDescription>{exam.subject}</CardDescription>
                  </div>
                  <Badge
                    className="w-fit"
                    variant={
                      exam.score >= 90
                        ? "default"
                        : exam.score >= 80
                          ? "secondary"
                          : exam.score >= 70
                            ? "outline"
                            : "destructive"
                    }
                  >
                    Grade: {exam.grade}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span>Date: {exam.date}</span>
                  </div>
                  <div className="font-medium">
                    Score: {exam.score}/{exam.maxScore} ({((exam.score / exam.maxScore) * 100).toFixed(1)}%)
                  </div>
                </div>

                <Progress value={(exam.score / exam.maxScore) * 100} className="h-2" />

                <Separator />

                <div>
                  <p className="font-medium">Feedback</p>
                  <p className="mt-1 text-sm text-muted-foreground">{exam.feedback}</p>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <Button variant="secondary" size="sm" className="ml-auto">
                  View Full Results
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
