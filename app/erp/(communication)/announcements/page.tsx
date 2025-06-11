"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Megaphone } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { AnnouncementCard } from "@/components/erp/communication/announcement-card"
import useRequestHook from "@/hooks/requestHook"
import api from "@/utils/api"

// Mock data
const mockAnnouncements = [
  {
    id: "1",
    title: "Important: Exam Schedule Update",
    content:
      "The mid-term examinations have been rescheduled. Please check the updated timetable on the student portal. All students are required to report 30 minutes before their scheduled exam time.",
    author: {
      name: "Dr. Michael Roberts",
      avatar: "/avatars/principal.jpg",
      role: "Principal",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    priority: "urgent" as const,
    category: "Academic",
    targetAudience: ["All Students", "Teachers"],
    attachments: [
      {
        id: "att-1",
        name: "updated-exam-schedule.pdf",
        type: "PDF",
      },
    ],
    reactions: {
      likes: 45,
      comments: 12,
    },
    isPinned: true,
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week from now
  },
  {
    id: "2",
    title: "Library Hours Extended",
    content:
      "Good news! The library will now be open until 9 PM on weekdays to accommodate students during exam preparation. Additional study spaces have been arranged in the east wing.",
    author: {
      name: "Ms. Jennifer Adams",
      avatar: "/avatars/librarian.jpg",
      role: "Head Librarian",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    priority: "medium" as const,
    category: "Facilities",
    targetAudience: ["All Students"],
    reactions: {
      likes: 78,
      comments: 5,
    },
    isPinned: false,
  },
  {
    id: "3",
    title: "Science Fair Registration Open",
    content:
      "Registration for the annual science fair is now open! This year's theme is 'Innovation for Tomorrow'. Students can participate individually or in teams of up to 3 members. Deadline for registration is next Friday.",
    author: {
      name: "Prof. David Wilson",
      avatar: "/avatars/science-teacher.jpg",
      role: "Science Department Head",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    priority: "high" as const,
    category: "Events",
    targetAudience: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"],
    reactions: {
      likes: 34,
      comments: 18,
    },
    isPinned: false,
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
  },
  {
    id: "4",
    title: "Cafeteria Menu Update",
    content:
      "We're excited to introduce new healthy meal options in our cafeteria! Starting Monday, we'll have a dedicated salad bar and fresh juice station. Special dietary requirements can be accommodated with advance notice.",
    author: {
      name: "Mr. Carlos Martinez",
      avatar: "/avatars/cafeteria-manager.jpg",
      role: "Cafeteria Manager",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    priority: "low" as const,
    category: "General",
    targetAudience: ["All Students", "Staff"],
    reactions: {
      likes: 56,
      comments: 23,
    },
    isPinned: false,
  },
]

export default function StudentAnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [fetchAnnouncement, res, isLoading, error, reset, status]=useRequestHook(api.ANNOUNCEMENTS.ALL, "GET", null);

  useEffect(()=>{
fetchAnnouncement()
  },[])

  const filteredAnnouncements = mockAnnouncements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || announcement.category === selectedCategory
    const matchesPriority = selectedPriority === "all" || announcement.priority === selectedPriority

    return matchesSearch && matchesCategory && matchesPriority
  })

  const pinnedAnnouncements = filteredAnnouncements.filter((a) => a.isPinned)
  const regularAnnouncements = filteredAnnouncements.filter((a) => !a.isPinned)

  const categories = ["all", ...Array.from(new Set(mockAnnouncements.map((a) => a.category)))]
  const priorities = ["all", "low", "medium", "high", "urgent"]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Announcements"
        description="Stay updated with the latest school announcements and news"
        // icon={Megaphone}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            {priorities.map((priority) => (
              <SelectItem key={priority} value={priority}>
                {priority === "all" ? "All Priorities" : priority.charAt(0).toUpperCase() + priority.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Announcements</TabsTrigger>
          <TabsTrigger value="pinned">Pinned</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {pinnedAnnouncements.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                Pinned Announcements
                <Badge variant="secondary">{pinnedAnnouncements.length}</Badge>
              </h3>
              <div className="grid gap-4">
                {pinnedAnnouncements.map((announcement) => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
              </div>
            </div>
          )}

          {regularAnnouncements.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                Recent Announcements
                <Badge variant="secondary">{regularAnnouncements.length}</Badge>
              </h3>
              <div className="grid gap-4">
                {regularAnnouncements.map((announcement) => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pinned" className="space-y-4">
          <div className="grid gap-4">
            {pinnedAnnouncements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4">
            {regularAnnouncements.slice(0, 5).map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
