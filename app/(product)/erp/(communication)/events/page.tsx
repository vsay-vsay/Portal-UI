"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  Eye,
  Edit,
  Trash2,
  Copy,
  Send,
  MoreHorizontal,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EventPermissionsDialog } from "@/components/erp/events/event-permissions-dialog"
import { EventDetailsDialog } from "@/components/erp/events/event-details-dialog"
import { CreateEventDialog } from "@/components/erp/events/create-event-dialog"
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";




export const metadata: Metadata = generatePageMetadata({
  title: 'Events Management',
  description: 'Create, manage, and control access to institutional events with detailed permissions and analytics.',
  keywords: ['ERP', 'Events Management', 'Institutional Events', 'Event Permissions', 'Event Analytics'],
  baseTitle: 'ERP System',
})


// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "Annual Science Fair",
    description: "Student science project exhibition and competition",
    category: "Academic",
    type: "Student Event",
    date: "2024-03-15",
    time: "09:00 AM",
    venue: "Main Auditorium",
    organizer: "Dr. Sarah Johnson",
    status: "Published",
    attendees: 245,
    maxCapacity: 300,
    visibility: ["Students", "Teachers", "Parents"],
    permissions: {
      view: ["Students", "Teachers", "Parents", "Admin"],
      register: ["Students"],
      edit: ["Admin", "Event Coordinator"],
      delete: ["Admin"],
      manage: ["Admin", "Event Coordinator"],
    },
    priority: "High",
    budget: 5000,
    spent: 3200,
  },
  {
    id: 2,
    title: "Faculty Development Workshop",
    description: "Professional development session on modern teaching methodologies",
    category: "Administrative",
    type: "Training",
    date: "2024-03-20",
    time: "02:00 PM",
    venue: "Conference Room A",
    organizer: "Prof. Michael Chen",
    status: "Draft",
    attendees: 0,
    maxCapacity: 50,
    visibility: ["Teachers", "Admin"],
    permissions: {
      view: ["Teachers", "Admin"],
      register: ["Teachers"],
      edit: ["Admin", "HR Manager"],
      delete: ["Admin"],
      manage: ["Admin", "HR Manager"],
    },
    priority: "Medium",
    budget: 2000,
    spent: 0,
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting",
    description: "Quarterly progress discussion between parents and teachers",
    category: "Community",
    type: "Meeting",
    date: "2024-03-25",
    time: "10:00 AM",
    venue: "Multiple Classrooms",
    organizer: "Ms. Emily Davis",
    status: "Published",
    attendees: 180,
    maxCapacity: 200,
    visibility: ["Parents", "Teachers"],
    permissions: {
      view: ["Parents", "Teachers", "Admin"],
      register: ["Parents"],
      edit: ["Admin", "Academic Coordinator"],
      delete: ["Admin"],
      manage: ["Admin", "Academic Coordinator"],
    },
    priority: "High",
    budget: 500,
    spent: 200,
  },
  {
    id: 4,
    title: "Sports Day Championship",
    description: "Inter-house sports competition and athletic events",
    category: "Student",
    type: "Sports Event",
    date: "2024-04-10",
    time: "08:00 AM",
    venue: "Sports Complex",
    organizer: "Coach Robert Wilson",
    status: "Planning",
    attendees: 0,
    maxCapacity: 500,
    visibility: ["Students", "Teachers", "Parents"],
    permissions: {
      view: ["Students", "Teachers", "Parents", "Admin"],
      register: ["Students"],
      edit: ["Admin", "Sports Coordinator"],
      delete: ["Admin"],
      manage: ["Admin", "Sports Coordinator"],
    },
    priority: "High",
    budget: 8000,
    spent: 1500,
  },
]

const eventCategories = ["All", "Academic", "Student", "Administrative", "Community", "Infrastructure"]
const eventStatuses = ["All", "Draft", "Planning", "Published", "Ongoing", "Completed", "Cancelled"]
const userRoles = [
  "Admin",
  "Teachers",
  "Students",
  "Parents",
  "Event Coordinator",
  "Academic Coordinator",
  "Sports Coordinator",
  "HR Manager",
]

export default function EventsManagement() {
  const [events, setEvents] = useState(mockEvents)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || event.status === selectedStatus
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-gray-100 text-gray-800"
      case "Planning":
        return "bg-blue-100 text-blue-800"
      case "Ongoing":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-purple-100 text-purple-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleEventAction = (action: string, event: any) => {
    setSelectedEvent(event)
    switch (action) {
      case "view":
        setShowDetailsDialog(true)
        break
      case "edit":
        setShowCreateDialog(true)
        break
      case "permissions":
        setShowPermissionsDialog(true)
        break
      case "duplicate":
        // Handle duplicate logic
        console.log("Duplicating event:", event.title)
        break
      case "delete":
        // Handle delete logic
        if (confirm(`Are you sure you want to delete "${event.title}"?`)) {
          setEvents(events.filter((e) => e.id !== event.id))
        }
        break
      case "publish":
        // Handle publish logic
        setEvents(events.map((e) => (e.id === event.id ? { ...e, status: "Published" } : e)))
        break
      case "cancel":
        // Handle cancel logic
        setEvents(events.map((e) => (e.id === event.id ? { ...e, status: "Cancelled" } : e)))
        break
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events Management</h1>
          <p className="text-muted-foreground">Create, manage, and control access to institutional events</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Events</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.filter((e) => e.status === "Published").length}</div>
            <p className="text-xs text-muted-foreground">Active and visible</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.reduce((sum, event) => sum + event.attendees, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (events.reduce((sum, event) => sum + event.spent, 0) /
                  events.reduce((sum, event) => sum + event.budget, 0)) *
                  100,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Of total budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Event Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Category: {selectedCategory}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {eventCategories.map((category) => (
                    <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Status: {selectedStatus}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {eventStatuses.map((status) => (
                    <DropdownMenuItem key={status} onClick={() => setSelectedStatus(status)}>
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>Events List</CardTitle>
          <CardDescription>Manage all institutional events and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Organizer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">{event.venue}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{event.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{event.date}</div>
                      <div className="text-sm text-muted-foreground">{event.time}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {event.organizer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{event.organizer}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(event.priority)}>{event.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {event.attendees}/{event.maxCapacity}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round((event.attendees / event.maxCapacity) * 100)}% full
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {event.visibility.slice(0, 2).map((role) => (
                        <Badge key={role} variant="secondary" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                      {event.visibility.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{event.visibility.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEventAction("view", event)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEventAction("edit", event)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Event
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEventAction("permissions", event)}>
                          <Users className="mr-2 h-4 w-4" />
                          Manage Permissions
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEventAction("duplicate", event)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        {event.status === "Draft" && (
                          <DropdownMenuItem onClick={() => handleEventAction("publish", event)}>
                            <Send className="mr-2 h-4 w-4" />
                            Publish
                          </DropdownMenuItem>
                        )}
                        {event.status === "Published" && (
                          <DropdownMenuItem onClick={() => handleEventAction("cancel", event)}>
                            <Calendar className="mr-2 h-4 w-4" />
                            Cancel Event
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEventAction("delete", event)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateEventDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        event={selectedEvent}
        onEventCreated={(newEvent) => {
          if (selectedEvent) {
            // Update existing event
            setEvents(events.map((e) => (e.id === selectedEvent.id ? { ...e, ...newEvent } : e)))
          } else {
            // Add new event
            setEvents([...events, { ...newEvent, id: events.length + 1 }])
          }
          setSelectedEvent(null)
        }}
      />

      <EventPermissionsDialog
        open={showPermissionsDialog}
        onOpenChange={setShowPermissionsDialog}
        event={selectedEvent}
        onPermissionsUpdated={(updatedPermissions) => {
          setEvents(events.map((e) => (e.id === selectedEvent?.id ? { ...e, permissions: updatedPermissions } : e)))
        }}
      />

      <EventDetailsDialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog} event={selectedEvent} />
    </div>
  )
}
