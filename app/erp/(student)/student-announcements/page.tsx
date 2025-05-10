import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnnouncementCard } from "@/components/student/communication/announcement-card"

export default function StudentAnnouncementsPage() {
  return (
    <div className="container space-y-6 p-4 md:p-8">
      <PageHeader title="Announcements" description="Stay updated with important school announcements" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search announcements..." className="w-full pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="events">Events</SelectItem>
            <SelectItem value="administrative">Administrative</SelectItem>
            <SelectItem value="extracurricular">Extracurricular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="important">Important</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <AnnouncementCard
            id="announce1"
            title="End of Semester Examination Schedule"
            content="The end of semester examinations will begin on July 1, 2023. The detailed schedule has been attached to this announcement. Please review it carefully and note the dates and times for your exams. All students are required to arrive at least 15 minutes before the scheduled exam time."
            date="Jun 10, 2023"
            author={{
              name: "Academic Office",
              role: "Administration",
              avatar: "/placeholder.svg?height=40&width=40",
            }}
            category="academic"
            isImportant={true}
            isNew={true}
            hasAttachment={true}
            attachmentUrl="#"
            viewCount={245}
          />
          <AnnouncementCard
            id="announce2"
            title="Annual Science Fair Registration"
            content="Registration for the Annual Science Fair is now open. Students interested in participating should submit their project proposals by June 25, 2023. This year's theme is 'Sustainable Innovation.' Projects will be judged on creativity, scientific methodology, and relevance to the theme."
            date="Jun 8, 2023"
            author={{
              name: "Science Department",
              role: "Faculty",
              avatar: "/placeholder.svg?height=40&width=40",
            }}
            category="events"
            isNew={true}
            hasAttachment={false}
            viewCount={187}
          />
          <AnnouncementCard
            id="announce3"
            title="Library Hours Extended During Exam Period"
            content="The library will extend its operating hours during the examination period. From June 20 to July 10, the library will be open from 7:00 AM to 10:00 PM on weekdays and 9:00 AM to 8:00 PM on weekends. Study rooms can be reserved in advance through the student portal."
            date="Jun 5, 2023"
            author={{
              name: "Library Services",
              role: "Administration",
              avatar: "/placeholder.svg?height=40&width=40",
            }}
            category="administrative"
            isImportant={false}
            hasAttachment={false}
            viewCount={156}
          />
          <AnnouncementCard
            id="announce4"
            title="Summer Internship Opportunities"
            content="Several companies have partnered with our school to offer summer internship opportunities for students. These internships span various fields including technology, finance, healthcare, and education. Interested students should submit their applications by June 30, 2023."
            date="Jun 3, 2023"
            author={{
              name: "Career Services",
              role: "Administration",
              avatar: "/placeholder.svg?height=40&width=40",
            }}
            category="academic"
            isImportant={false}
            hasAttachment={true}
            attachmentUrl="#"
            viewCount={210}
          />
          <AnnouncementCard
            id="announce5"
            title="School Basketball Team Tryouts"
            content="Tryouts for the school basketball team will be held on June 15, 2023, from 3:30 PM to 5:30 PM in the gymnasium. All students interested in joining the team are encouraged to participate. Please wear appropriate athletic attire and bring your own water bottle."
            date="Jun 1, 2023"
            author={{
              name: "Physical Education Department",
              role: "Faculty",
              avatar: "/placeholder.svg?height=40&width=40"
            }}
            category="extracurricular"
            isImportant={false}
            hasAttachment={false}
            viewCount={98}
          />
          </TabsContent>
          </Tabs>
          </div>
  )
}