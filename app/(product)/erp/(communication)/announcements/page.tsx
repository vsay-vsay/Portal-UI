"use client";

import { useEffect, useState, useCallback } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Megaphone, Plus, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { AnnouncementCard } from "@/components/erp/communication/announcement-card";
import { useToast } from "@/hooks/use-toast";
import useRequestHook from "@/hooks/requestHook";
import api from "@/utils/api";

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000/api";

// Types
interface Announcement {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  timestamp: Date;
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  targetAudience: string[];
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
  }>;
  reactions: {
    likes: number;
    comments: number;
  };
  isPinned: boolean;
  expiryDate?: Date;
}

// API Service Functions


const createAnnouncement = async (announcement: Omit<Announcement, 'id'>): Promise<Announcement> => {
  try {
    const response = await fetch(`${API_BASE_URL}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(announcement),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      ...data,
      timestamp: new Date(data.timestamp),
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
    };
  } catch (error) {
    console.error('Failed to create announcement:', error);
    throw error;
  }
};

const updateAnnouncement = async (id: string, announcement: Partial<Announcement>): Promise<Announcement> => {
  try {
    const response = await fetch(`${API_BASE_URL}/announcements/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(announcement),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      ...data,
      timestamp: new Date(data.timestamp),
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
    };
  } catch (error) {
    console.error('Failed to update announcement:', error);
    throw error;
  }
};

const deleteAnnouncement = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/announcements/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to delete announcement:', error);
    throw error;
  }
};

const togglePin = async (id: string, isPinned: boolean): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/announcements/${id}/pin`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isPinned }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to toggle pin:', error);
    throw error;
  }
};

// Mock data generator
const getMockData = (): Announcement[] => [
  {
    id: "1",
    title: "Important: Exam Schedule Update",
    content: "The mid-term examinations have been rescheduled. Please check the updated timetable on the student portal.",
    author: {
      name: "Dr. Michael Roberts",
      avatar: "/avatars/principal.jpg",
      role: "Principal",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    priority: "urgent",
    category: "Academic",
    targetAudience: ["All Students", "Teachers"],
    attachments: [{
      id: "att-1",
      name: "updated-exam-schedule.pdf",
      type: "PDF",
    }],
    reactions: { likes: 45, comments: 12 },
    isPinned: true,
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: "2",
    title: "School Sports Day Registration",
    content: "Registration for the annual sports day is now open. Please submit your forms by the end of this week.",
    author: {
      name: "Ms. Sarah Johnson",
      avatar: "/avatars/sports-coordinator.jpg",
      role: "Sports Coordinator",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    priority: "medium",
    category: "Sports",
    targetAudience: ["All Students"],
    reactions: { likes: 32, comments: 8 },
    isPinned: false,
  },
  {
    id: "3",
    title: "Library New Book Collection",
    content: "We've added 200 new books to our library collection. Check out the latest additions in science and literature.",
    author: {
      name: "Mr. David Wilson",
      avatar: "/avatars/librarian.jpg",
      role: "Librarian",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    priority: "low",
    category: "Library",
    targetAudience: ["All Students", "Teachers"],
    reactions: { likes: 18, comments: 3 },
    isPinned: false,
  },
];

// Filter Component
const AnnouncementFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  selectedPriority, 
  setSelectedPriority,
  categories,
  priorities 
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedPriority: string;
  setSelectedPriority: (priority: string) => void;
  categories: string[];
  priorities: string[];
}) => (
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
);

// Loading Component
const LoadingState = () => (
  <div className="space-y-6">
    <PageHeader
      title="Manage Announcements"
      description="Create, edit, and manage school announcements"
      icon={Megaphone}
    />
    <div className="flex justify-center items-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-muted-foreground">Loading announcements...</span>
    </div>
  </div>
);

// Error Alert Component
const ErrorAlert = ({ error }: { error: string }) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>
      {error}. {process.env.NODE_ENV === 'development' && 'Using fallback data.'}
    </AlertDescription>
  </Alert>
);

// Empty State Component
const EmptyState = ({ 
  searchQuery, 
  selectedCategory, 
  selectedPriority 
}: {
  searchQuery: string;
  selectedCategory: string;
  selectedPriority: string;
}) => (
  <div className="text-center py-12">
    <Megaphone className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
    <p className="text-muted-foreground text-lg mb-2">No announcements found</p>
    <p className="text-sm text-muted-foreground">
      {searchQuery || selectedCategory !== "all" || selectedPriority !== "all"
        ? "Try adjusting your filters"
        : "Create your first announcement to get started"}
    |</p>
  </div>
);

// Announcement List Component
const AnnouncementList = ({ 
  announcements, 
  title, 
  onEdit, 
  onDelete, 
  onPinToggle 
}: {
  announcements: Announcement[];
  title: string;
  onEdit: (announcement: Announcement) => void;
  onDelete: (id: string) => void;
  onPinToggle: (id: string, isPinned: boolean) => void;
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold flex items-center gap-2">
      {title}
      <Badge variant="secondary">{announcements.length}</Badge>
    </h3>
    <div className="grid gap-4">
      {announcements?.map((announcement) => (
        <AnnouncementCard
          key={announcement.id}
          announcement={announcement}
          isAdmin={true}
          onEdit={onEdit}
          onDelete={onDelete}
          onPinToggle={onPinToggle}
        />
      ))}
    </div>
  </div>
);

// Header Actions Component
const HeaderActions = ({ 
 onRefresh, 
  onCreateNew, 
  isRefreshing 
}: {
  onRefresh: () => void;
  onCreateNew: () => void;
  isRefreshing: boolean;
}) => (
  <div className="flex gap-2">
    <Button
      variant="outline"
      size="sm"
      onClick={onRefresh}
      disabled={isRefreshing}
    >
      <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      Refresh
    </Button>
    <Button onClick={onCreateNew}>
      <Plus className="mr-2 h-4 w-4" />
      New Announcement
    </Button>
  </div>
);

// Custom hook for announcement management
const useAnnouncements = () => {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
 
  const [getAnnouncements, announcementsData, isLoading, error, reset, status ]=useRequestHook(api.ANNOUNCEMENTS.ALL, "GET", null);

  const fetchAnnouncements = useCallback(async (showRefreshLoader = false) => {
    getAnnouncements()
  }, [toast]);

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      const originalAnnouncements = [...announcements];
      setAnnouncements(prev => prev.filter(a => a.id !== id));

      await deleteAnnouncement(id);
      
      toast({
        title: "Success",
        description: "Announcement deleted successfully",
      });
    } catch (error) {
      setAnnouncements(announcements);
      
      toast({
        title: "Error",
        description: "Failed to delete announcement",
        variant: "destructive",
      });
    }
  };

  const handlePinToggle = async (id: string, isPinned: boolean) => {
    try {
      const originalAnnouncements = [...announcements];
      setAnnouncements(prev =>
        prev.map(a => (a.id === id ? { ...a, isPinned } : a))
      );

      await togglePin(id, isPinned);
      
      toast({
        title: "Success",
        description: `Announcement ${isPinned ? 'pinned' : 'unpinned'} successfully`,
      });
    } catch (error) {
      setAnnouncements(originalAnnouncements);
      
      toast({
        title: "Error",
        description: "Failed to update announcement",
        variant: "destructive",
      });
    }
  };

  return {
    announcements,
    isLoading,
    isRefreshing,
    error,
    fetchAnnouncements,
    handleDeleteAnnouncement,
    handlePinToggle,
  };
};

// Main Component
export default function AdminAnnouncementsPage() {
  const {
    announcements,
    isLoading,
    isRefreshing,
    error,
    fetchAnnouncements,
    handleDeleteAnnouncement,
    handlePinToggle,
  } = useAnnouncements();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | undefined>(undefined);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleCreateAnnouncement = () => {
    setSelectedAnnouncement(undefined);
    setIsDialogOpen(true);
  };

  const handleEditAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDialogOpen(true);
  };

  const handleRefresh = () => {
    fetchAnnouncements(true);
  };

  // Filter announcements
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

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.isPinned);
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.isPinned);

  const categories = ["all", ...Array.from(new Set(announcements.map(a => a.category)))];
  const priorities = ["all", "low", "medium", "high", "urgent"];

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Announcements"
        description="Create, edit, and manage school announcements"
        icon={Megaphone}
        actions={
          <HeaderActions
            onRefresh={handleRefresh}
            onCreateNew={handleCreateAnnouncement}
            isRefreshing={isRefreshing}
          />
        }
      />

      {error && <ErrorAlert error={error} />}

      <AnnouncementFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        categories={categories}
        priorities={priorities}
      />

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">
            All Announcements
            <Badge variant="secondary" className="ml-2">
              {filteredAnnouncements.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pinned">
            Pinned
            <Badge variant="secondary" className="ml-2">
              {pinnedAnnouncements.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {pinnedAnnouncements.length > 0 && (
            <AnnouncementList
              announcements={pinnedAnnouncements}
              title="Pinned Announcements"
              onEdit={handleEditAnnouncement}
              onDelete={handleDeleteAnnouncement}
              onPinToggle={handlePinToggle}
            />
          )}

          {regularAnnouncements.length > 0 && (
            <AnnouncementList
              announcements={regularAnnouncements}
              title="Regular Announcements"
              onEdit={handleEditAnnouncement}
              onDelete={handleDeleteAnnouncement}
              onPinToggle={handlePinToggle}
            />
          )}

          {filteredAnnouncements.length === 0 && (
            <EmptyState
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              selectedPriority={selectedPriority}
            />
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
              {regularAnnouncements
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .slice(0, 5)
                .map((announcement) => (
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
    </div>
  );
}