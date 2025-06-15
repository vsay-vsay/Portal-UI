import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Plus, Search, Trash } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCard } from "@/components/student/communication/message-card"

export default function StudentMessagesPage() {
  return (
    <div className="container space-y-6 p-4 md:p-8">
      <PageHeader title="Messages" description="Communicate with teachers, staff, and classmates" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search messages..." className="w-full pl-8" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Messages</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="teachers">From Teachers</SelectItem>
              <SelectItem value="admin">From Administration</SelectItem>
              <SelectItem value="students">From Students</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      <Tabs defaultValue="inbox">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">3</Badge>
              <span className="text-sm">unread messages</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <Button variant="outline" size="sm">Mark as Read</Button>
            </div>
          </div>

          <div className="space-y-4">
            <MessageCard
              id="msg1"
              sender={{
                name: "Dr. Alex Johnson",
                role: "Mathematics Teacher",
                avatar: "/placeholder.svg?height=40&width=40",
              }}
              subject="Upcoming Calculus Test"
              content="Dear John, I wanted to remind you about the calculus test scheduled for next week. It will cover chapters 5-7, focusing on integration techniques. Please make sure to review the practice problems we discussed in class. Let me know if you have any questions or need clarification on any topics."
              timestamp="Today, 10:30 AM"
              isRead={false}
              hasAttachments={true}
              attachments={[
                { name: "Calculus_Test_Study_Guide.pdf", size: "1.2 MB", type: "pdf" },
                { name: "Practice_Problems.docx", size: "850 KB", type: "docx" },
              ]}
            />
            <MessageCard
              id="msg2"
              sender={{
                name: "Prof. Sarah Williams",
                role: "Physics Teacher",
                avatar: "/placeholder.svg?height=40&width=40",
              }}
              subject="Lab Report Feedback"
              content="Hello John, I've reviewed your recent lab report on electromagnetic induction. Your experimental setup and data collection were excellent, but I'd like you to revise the analysis section. Please see my detailed comments in the attached document. Let's discuss this during office hours if you need further clarification."
              timestamp="Yesterday, 3:45 PM"
              isRead={false}
              hasAttachments={true}
              attachments={[
                { name: "Lab_Report_Feedback.pdf", size: "980 KB", type: "pdf" },
              ]}
            />
            <MessageCard
              id="msg3"
              sender={{
                name: "Academic Office",
                role: "Administration",
                avatar: "/placeholder.svg?height=40&width=40",
              }}
              subject="Schedule Change Notification"
              content="Dear Student, Please be informed that there has been a change in the class schedule for next week. The Computer Science class on Tuesday will be held in Lab 104 instead of Lab 102. This change is only for next week. Please adjust your schedule accordingly."
              timestamp="Jun 10, 2023"
              isRead={false}
              hasAttachments={false}
            />
            <MessageCard
              id="msg4"
              sender={{
                name: "Dr. Michael Chen",
                role: "Computer Science Teacher",
                avatar: "/placeholder.svg?height=40&width=40",
              }}
              subject="Programming Assignment Extension"
              content="Hi John, I'm extending the deadline for the programming assignment by three days. The new due date is June 18th. This should give everyone enough time to complete the more challenging aspects of the assignment. Remember to test your code thoroughly before submission."
              timestamp="Jun 8, 2023"
              isRead={true}
              hasAttachments={false}
            />
            <MessageCard
              id="msg5"
              sender={{
                name: "Library Services",
                role: "Administration",
                avatar: "/placeholder.svg?height=40&width=40",
              }}
              subject="Book Return Reminder"
              content="Dear Student, This is a reminder that the book 'Introduction to Algorithms' is due for return on June 15, 2023. Please ensure timely return to avoid late fees. If you need to extend the borrowing period, please visit the library desk or request an extension through the student portal."
              timestamp="Jun 5, 2023"
              isRead={true}
              hasAttachments={false}
            />
          </div>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          <div className="space-y-4">
            <MessageCard
              id="sent1"
              sender={{
                name: "You",
                role: "Student",
                avatar: "/placeholder.svg?height=40&width=40",
              }}
              subject="Question about Assignment"
              content="Dear Dr. Johnson, I have a question regarding problem #5 in the calculus assignment. I'm not sure if I should use the substitution method or integration by parts. Could you please clarify which approach would be more appropriate for this particular problem? Thank you for your help."
              timestamp="Jun 9, 2023"
              isRead={true}
              hasAttachments={false}
            />
            <MessageCard
              id="sent2"
              sender={{
                name: "You",
                role: "Student",
                avatar: "/placeholder.svg?height=40&width=40",
              }}
              subject="Absence Notification"
              content="Dear Prof. Williams, I wanted to inform you that I will be absent from class on June 7th due to a medical appointment. I have already arranged with a classmate to share their notes with me. I will make sure to complete any assignments or work that I miss during this absence. Thank you for your understanding."
              timestamp="Jun 5, 2023"
              isRead={true}
              hasAttachments={false}
            />
            <MessageCard
              id="sent3"
              sender={{
                name: "You",
                role: "Student",
                avatar: "/placeholder.svg?height=40&width=40",
              }}
              subject="Lab Partner Request"
              content="Hello Dr. Chen, I'm writing to request if it would be possible to work with Emma Thompson as my lab partner for the upcoming computer science project. We have collaborated effectively on previous assignments and share a similar work schedule, which would make coordination easier. Please let me know if this arrangement is acceptable."
              timestamp="Jun 2, 2023"
              isRead={true}
              hasAttachments={false}
            />
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardHeader className="p-4 pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">Request for Reference Letter</CardTitle>
                    <CardDescription>Draft saved on Jun 10, 2023</CardDescription>
                  </div>
                  <Badge variant="outline">Draft</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  Dear Dr. Johnson, I am applying for a summer internship program at the National Science Foundation and would like to request a letter of recommendation from you. Having taken your Advanced Mathematics course...
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t bg-muted/50 p-4">
                <Button variant="outline">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="p-4 pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">Study Group Formation</CardTitle>
                    <CardDescription>Draft saved on Jun 8, 2023</CardDescription>
                  </div>
                  <Badge variant="outline">Draft</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  Hi everyone, I'm thinking of forming a study group for the upcoming physics exam. I believe collaborative studying would be beneficial for understanding complex concepts and solving...
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t bg-muted/50 p-4">
                <Button variant="outline">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <div className="space-y-4">
            <MessageCard
              id="arch1"
              sender={{
                name: "Student Services",
                role: "Administration",
                avatar: "/placeholder.svg?height=40&width=40",
              }}
              subject="Student ID Card Renewal"
              content="Dear Student, This is a reminder that your student ID card will expire at the end of this semester. Please visit the Student Services office with a recent photograph to renew your ID card. The renewal process takes approximately 24 hours."
              timestamp="May 15, 2023"
              isRead={true}
              hasAttachments={false}
            />
            <MessageCard
              id="arch2"
              sender={{
                name: "Prof. Lisa Brown",
                role: "English Teacher",
                avatar: "/placeholder.svg?height=40&width=40",
              }}
              subject="Essay Feedback"
              content="Hello John, I've reviewed your essay on 'The Impact of Modernism in Literature.' Your analysis was thoughtful and well-structured. I particularly appreciated your insights on how historical context influenced modernist writers. I've attached detailed feedback with some suggestions for improvement."
              timestamp="May 10, 2023"
              isRead={true}
              hasAttachments={true}
              attachments={[
                { name: "Essay_Feedback.docx", size: "750 KB", type: "docx" },
              ]}
            />
            <MessageCard
              id="arch3"
              sender={{
                name: "IT Support",
                role: "Administration",
                avatar: "/placeholder.svg?height=40&width=40",
              }}
              subject="System Maintenance Notification"
              content="Dear Users, Please be informed that the student portal will be undergoing scheduled maintenance on May 5th from 10:00 PM to 2:00 AM. During this time, the system will be unavailable. We apologize for any inconvenience this may cause and appreciate your understanding."
              timestamp="May 3, 2023"
              isRead={true}
              hasAttachments={false}
            />
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Contacts</CardTitle>
          <CardDescription>Quickly message your teachers and classmates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Alex Johnson" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">Dr. Alex Johnson</p>
                <p className="text-sm text-muted-foreground">Mathematics Teacher</p>
              </div>
              <Button variant="ghost" size="sm">
                Message
              </Button>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Prof. Sarah Williams" />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">Prof. Sarah Williams</p>
                <p className="text-sm text-muted-foreground">Physics Teacher</p>
              </div>
              <Button variant="ghost" size="sm">
                Message
              </Button>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Michael Chen" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">Dr. Michael Chen</p>
                <p className="text-sm text-muted-foreground">Computer Science Teacher</p>
              </div>
              <Button variant="ghost" size="sm">
                Message
              </Button>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Prof. Lisa Brown" />
                <AvatarFallback>LB</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">Prof. Lisa Brown</p>
                <p className="text-sm text-muted-foreground">English Teacher</p>
              </div>
              <Button variant="ghost" size="sm">
                Message
              </Button>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Emily Parker" />
                <AvatarFallback>EP</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">Dr. Emily Parker</p>
                <p className="text-sm text-muted-foreground">Biology Teacher</p>
              </div>
              <Button variant="ghost" size="sm">
                Message
              </Button>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Academic Office" />
                <AvatarFallback>AO</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">Academic Office</p>
                <p className="text-sm text-muted-foreground">Administration</p>
              </div>
              <Button variant="ghost" size="sm">
                Message
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Contacts
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
