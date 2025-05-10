import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AssignmentCard } from "@/components/assignment-card"

export default function StudentAssignmentsPage() {
  return (
    <div className="container space-y-6 p-4 md:p-8">
      <PageHeader title="Assignments" description="View and manage your course assignments" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search assignments..." className="w-full pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="math">Mathematics</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="cs">Computer Science</SelectItem>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="biology">Biology</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AssignmentCard
              id="assign1"
              title="Calculus Problem Set 5"
              subject="Advanced Mathematics"
              description="Complete problems 1-15 from Chapter 7 on integration techniques."
              dueDate="Jun 15, 2023"
              timeRemaining="2 days remaining"
              status="pending"
            />
            <AssignmentCard
              id="assign2"
              title="Physics Lab Report"
              subject="Physics II: Electromagnetism"
              description="Write a lab report on the electromagnetic induction experiment conducted last week."
              dueDate="Jun 18, 2023"
              timeRemaining="5 days remaining"
              status="pending"
            />
            <AssignmentCard
              id="assign4"
              title="Literary Analysis Essay"
              subject="English Literature"
              description="Write a 1000-word essay analyzing the themes in 'To Kill a Mockingbird'."
              dueDate="Jun 20, 2023"
              timeRemaining="7 days remaining"
              status="pending"
            />
            <AssignmentCard
              id="assign5"
              title="Chemistry Lab Report"
              subject="Organic Chemistry"
              description="Complete the lab report for the experiment on organic reactions."
              dueDate="Jun 25, 2023"
              timeRemaining="12 days remaining"
              status="pending"
            />
          </div>
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AssignmentCard
              id="assign3"
              title="Programming Assignment 3"
              subject="Introduction to Computer Science"
              description="Implement a binary search tree and perform various operations on it."
              dueDate="Jun 10, 2023"
              timeRemaining="Submitted on Jun 9"
              status="submitted"
            />
            <AssignmentCard
              id="assign6"
              title="Biology Worksheet"
              subject="Introduction to Biology"
              description="Complete the worksheet on cell structures and functions."
              dueDate="Jun 8, 2023"
              timeRemaining="Submitted on Jun 7"
              status="submitted"
            />
          </div>
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AssignmentCard
              id="assign7"
              title="Calculus Problem Set 4"
              subject="Advanced Mathematics"
              description="Problems on differential equations and applications."
              dueDate="Jun 1, 2023"
              timeRemaining="Graded on Jun 5"
              status="graded"
              score={92}
              maxScore={100}
            />
            <AssignmentCard
              id="assign8"
              title="Physics Quiz 2"
              subject="Physics II: Electromagnetism"
              description="Quiz covering Coulomb's Law and electric fields."
              dueDate="May 28, 2023"
              timeRemaining="Graded on Jun 2"
              status="graded"
              score={85}
              maxScore={100}
            />
            <AssignmentCard
              id="assign9"
              title="Programming Assignment 2"
              subject="Introduction to Computer Science"
              description="Implement sorting algorithms and analyze their complexity."
              dueDate="May 25, 2023"
              timeRemaining="Graded on May 30"
              status="graded"
              score={95}
              maxScore={100}
            />
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* This would include all assignments from the other tabs */}
            {/* For brevity, I'm not including all of them again */}
            <AssignmentCard
              id="assign1"
              title="Calculus Problem Set 5"
              subject="Advanced Mathematics"
              description="Complete problems 1-15 from Chapter 7 on integration techniques."
              dueDate="Jun 15, 2023"
              timeRemaining="2 days remaining"
              status="pending"
            />
            <AssignmentCard
              id="assign3"
              title="Programming Assignment 3"
              subject="Introduction to Computer Science"
              description="Implement a binary search tree and perform various operations on it."
              dueDate="Jun 10, 2023"
              timeRemaining="Submitted on Jun 9"
              status="submitted"
            />
            <AssignmentCard
              id="assign7"
              title="Calculus Problem Set 4"
              subject="Advanced Mathematics"
              description="Problems on differential equations and applications."
              dueDate="Jun 1, 2023"
              timeRemaining="Graded on Jun 5"
              status="graded"
              score={92}
              maxScore={100}
            />
            {/* More assignments would be here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
