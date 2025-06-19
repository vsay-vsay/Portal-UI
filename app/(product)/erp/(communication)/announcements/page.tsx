"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Megaphone, Plus, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { AnnouncementCard } from "@/components/erp/communication/announcement-card";
import { useToast } from "@/hooks/use-toast";

import type { Announcement } from "@/lib/types";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";




export const metadata: Metadata = generatePageMetadata({
  title: 'Manage Announcements',
  description: 'Create, edit, and manage school announcements',
  keywords: ['ERP', 'Announcements', 'School Management', 'Communication'],
  baseTitle: 'ERP System',
})


export default function AdminAnnouncementsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<
    Announcement | undefined
  >(undefined);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      const data = [
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
      ];
      setAnnouncements(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch announcements. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAnnouncement = () => {
    setSelectedAnnouncement(undefined);
    setIsDialogOpen(true);
  };

  const handleEditAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDialogOpen(true);
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const handlePinToggle = (id: string, isPinned: boolean) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isPinned } : a))
    );
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || announcement.category === selectedCategory;
    const matchesPriority =
      selectedPriority === "all" || announcement.priority === selectedPriority;

    return matchesSearch && matchesCategory && matchesPriority;
  });

  const pinnedAnnouncements = filteredAnnouncements.filter((a) => a.isPinned);
  const regularAnnouncements = filteredAnnouncements.filter((a) => !a.isPinned);

  const categories = [
    "all",
    ...Array.from(new Set(announcements.map((a) => a.category))),
  ];
  const priorities = ["all", "low", "medium", "high", "urgent"];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Announcements"
        description="Create, edit, and manage school announcements"
        icon={Megaphone}
        actions={
          <Button onClick={handleCreateAnnouncement}>
            <Plus className="mr-2 h-4 w-4" />
            New Announcement
          </Button>
        }
      ></PageHeader>

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
                {priority === "all"
                  ? "All Priorities"
                  : priority.charAt(0).toUpperCase() + priority.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
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
                  <Badge variant="secondary">
                    {pinnedAnnouncements.length}
                  </Badge>
                </h3>
                <div className="grid gap-4">
                  {pinnedAnnouncements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={announcement}
                      isAdmin={true}
                      onEdit={handleEditAnnouncement}
                      onDelete={handleDeleteAnnouncement}
                      onPinToggle={handlePinToggle}
                    />
                  ))}
                </div>
              </div>
            )}

            {regularAnnouncements.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  Regular Announcements
                  <Badge variant="secondary">
                    {regularAnnouncements.length}
                  </Badge>
                </h3>
                <div className="grid gap-4">
                  {regularAnnouncements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={announcement}
                      isAdmin={true}
                      onEdit={handleEditAnnouncement}
                      onDelete={handleDeleteAnnouncement}
                      onPinToggle={handlePinToggle}
                    />
                  ))}
                </div>
              </div>
            )}

            {filteredAnnouncements.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No announcements found</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pinned" className="space-y-4">
            {pinnedAnnouncements.length > 0 ? (
              <div className="grid gap-4">
                {pinnedAnnouncements.map((announcement) => (
                  <AnnouncementCard
                    key={announcement.id}
                    announcement={announcement}
                    isAdmin={true}
                    onEdit={handleEditAnnouncement}
                    onDelete={handleDeleteAnnouncement}
                    onPinToggle={handlePinToggle}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No pinned announcements</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            {regularAnnouncements.length > 0 ? (
              <div className="grid gap-4">
                {regularAnnouncements.slice(0, 5).map((announcement) => (
                  <AnnouncementCard
                    key={announcement.id}
                    announcement={announcement}
                    isAdmin={true}
                    onEdit={handleEditAnnouncement}
                    onDelete={handleDeleteAnnouncement}
                    onPinToggle={handlePinToggle}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No recent announcements</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}

      <AnnouncementDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        announcement={selectedAnnouncement}
        onSuccess={fetchAnnouncements}
      />
    </div>
  );
}
