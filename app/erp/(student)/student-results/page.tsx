import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BarChart, Calendar, Download, FileText, Info } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const currentSemester = [
  { subject: "Advanced Mathematics", grade: "A-", gpa: 3.7, credits: 4, status: "Ongoing" },
  { subject: "Physics II: Electromagnetism", grade: "B+", gpa: 3.3, credits: 4, status: "Ongoing" },
  { subject: "Introduction to Computer Science", grade: "A", gpa: 4.0, credits: 3, status: "Ongoing" },
  { subject: "English Literature", grade: "B", gpa: 3.0, credits: 3, status: "Ongoing" },
  { subject: "Introduction to Biology", grade: "A-", gpa: 3.7, credits: 4, status: "Ongoing" },
  { subject: "Organic Chemistry", grade: "B-", gpa: 2.7, credits: 4, status: "Ongoing" },
]

const previousSemesters = [
  {
    name: "Fall 2022",
    gpa: 3.6,
    subjects: [
      { subject: "Precalculus", grade: "A", gpa: 4.0, credits: 4 },
      { subject: "Physics I: Mechanics", grade: "A-", gpa: 3.7, credits: 4 },
      { subject: "Introduction to Programming", grade: "A", gpa: 4.0, credits: 3 },
      { subject: "English Composition", grade: "B+", gpa: 3.3, credits: 3 },
      { subject: "General Chemistry", grade: "B+", gpa: 3.3, credits: 4 },
    ],
  },
  {
    name: "Spring 2022",
    gpa: 3.4,
    subjects: [
      { subject: "Algebra", grade: "A-", gpa: 3.7, credits: 3 },
      { subject: "Introduction to Physics", grade: "B+", gpa: 3.3, credits: 3 },
      { subject: "Computer Literacy", grade: "A", gpa: 4.0, credits: 2 },
      { subject: "Critical Reading", grade: "B", gpa: 3.0, credits: 3 },
      { subject: "Biology Foundations", grade: "B+", gpa: 3.3, credits: 3 },
    ],
  },
]

export default function StudentResultsPage() {
  return (
    <div className="container space-y-6 p-4 md:p-8">
      <PageHeader title="Academic Results" description="View your academic performance and grades" />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Current GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.5</div>
            <p className="text-xs text-muted-foreground">Spring Semester 2023</p>
            <Progress value={(3.5 / 4.0) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Cumulative GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.6</div>
            <p className="text-xs text-muted-foreground">All semesters</p>
            <Progress value={(3.6 / 4.0) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Credits Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Out of 120 required</p>
            <Progress value={(42 / 120) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <CardTitle>Result Overview</CardTitle>
              <CardDescription>View your academic performance by semester</CardDescription>
            </div>
            <Select defaultValue="spring2023">
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spring2023">Current (Spring 2023)</SelectItem>
                <SelectItem value="fall2022">Fall 2022</SelectItem>
                <SelectItem value="spring2022">Spring 2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Note</AlertTitle>
            <AlertDescription>
              Current semester grades are tentative and subject to change until the end of the semester.
            </AlertDescription>
          </Alert>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 transition-colors">
                  <th className="h-10 px-4 text-left font-medium">Subject</th>
                  <th className="h-10 px-4 text-center font-medium">Grade</th>
                  <th className="h-10 px-4 text-center font-medium">GPA</th>
                  <th className="h-10 px-4 text-center font-medium">Credits</th>
                  <th className="h-10 px-4 text-center font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentSemester.map((subject, index) => (
                  <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 font-medium">{subject.subject}</td>
                    <td className="p-4 text-center">{subject.grade}</td>
                    <td className="p-4 text-center">{subject.gpa.toFixed(1)}</td>
                    <td className="p-4 text-center">{subject.credits}</td>
                    <td className="p-4 text-center">
                      <Badge variant="outline">{subject.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-muted/50 font-medium">
                  <td className="p-4">Semester GPA</td>
                  <td className="p-4 text-center"></td>
                  <td className="p-4 text-center">3.5</td>
                  <td className="p-4 text-center">22</td>
                  <td className="p-4 text-center"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            <BarChart className="mr-2 h-4 w-4" />
            View Performance Graph
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="semesters">
        <TabsList className="grid w-full grid-cols-2 md:w-auto">
          <TabsTrigger value="semesters">Past Semesters</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        </TabsList>

        <TabsContent value="semesters" className="space-y-4">
          {previousSemesters.map((semester, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <CardTitle>{semester.name}</CardTitle>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-muted-foreground">Semester GPA:</span>
                    <Badge variant="outline">{semester.gpa.toFixed(1)}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50 transition-colors">
                        <th className="h-10 px-4 text-left font-medium">Subject</th>
                        <th className="h-10 px-4 text-center font-medium">Grade</th>
                        <th className="h-10 px-4 text-center font-medium">GPA</th>
                        <th className="h-10 px-4 text-center font-medium">Credits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {semester.subjects.map((subject, subjectIndex) => (
                        <tr key={subjectIndex} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 font-medium">{subject.subject}</td>
                          <td className="p-4 text-center">{subject.grade}</td>
                          <td className="p-4 text-center">{subject.gpa.toFixed(1)}</td>
                          <td className="p-4 text-center">{subject.credits}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="transcript">
          <Card>
            <CardHeader>
              <CardTitle>Official Transcript</CardTitle>
              <CardDescription>View and download your official academic transcript</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start sm:items-center">
                  <FileText className="mr-3 h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">Official Academic Transcript</p>
                    <p className="text-sm text-muted-foreground">Updated: Jun 1, 2023</p>
                  </div>
                </div>
                <Button className="mt-4 sm:mt-0">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>

              <Alert>
                <Calendar className="h-4 w-4" />
                <AlertTitle>Transcript Request</AlertTitle>
                <AlertDescription>
                  To request an official sealed transcript, please visit the registrar's office or make a request
                  through the student portal.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
