"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const eventCategories = ["Academic", "Student", "Administrative", "Community", "Infrastructure"]
const eventTypes = {
  Academic: ["Conference", "Seminar", "Workshop", "Examination", "Graduation"],
  Student: ["Cultural Event", "Sports Event", "Competition", "Club Activity", "Field Trip"],
  Administrative: ["Meeting", "Training", "Review", "Planning", "Recruitment"],
  Community: ["Parent Meeting", "Alumni Event", "Open House", "Career Fair", "Outreach"],
  Infrastructure: ["Maintenance", "Construction", "Inspection", "Upgrade", "Emergency"],
}
const venues = [
  "Main Auditorium",
  "Conference Room A",
  "Conference Room B",
  "Sports Complex",
  "Library Hall",
  "Cafeteria",
  "Outdoor Grounds",
  "Virtual/Online",
]
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

interface CreateEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event?: any
  onEventCreated: (event: any) => void
}

export function CreateEventDialog({ open, onOpenChange, event, onEventCreated }: CreateEventDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    date: "",
    time: "",
    venue: "",
    organizer: "",
    maxCapacity: "",
    budget: "",
    priority: "Medium",
    status: "Draft",
    visibility: [] as string[],
    permissions: {
      view: [] as string[],
      register: [] as string[],
      edit: [] as string[],
      delete: [] as string[],
      manage: [] as string[],
    },
    requiresRegistration: false,
    isPublic: false,
    allowWaitlist: false,
    sendNotifications: true,
  })

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        category: event.category || "",
        type: event.type || "",
        date: event.date || "",
        time: event.time || "",
        venue: event.venue || "",
        organizer: event.organizer || "",
        maxCapacity: event.maxCapacity?.toString() || "",
        budget: event.budget?.toString() || "",
        priority: event.priority || "Medium",
        status: event.status || "Draft",
        visibility: event.visibility || [],
        permissions: event.permissions || {
          view: [],
          register: [],
          edit: [],
          delete: [],
          manage: [],
        },
        requiresRegistration: event.requiresRegistration || false,
        isPublic: event.isPublic || false,
        allowWaitlist: event.allowWaitlist || false,
        sendNotifications: event.sendNotifications !== false,
      })
    } else {
      // Reset form for new event
      setFormData({
        title: "",
        description: "",
        category: "",
        type: "",
        date: "",
        time: "",
        venue: "",
        organizer: "",
        maxCapacity: "",
        budget: "",
        priority: "Medium",
        status: "Draft",
        visibility: [],
        permissions: {
          view: [],
          register: [],
          edit: [],
          delete: [],
          manage: [],
        },
        requiresRegistration: false,
        isPublic: false,
        allowWaitlist: false,
        sendNotifications: true,
      })
    }
  }, [event, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEventCreated({
      ...formData,
      maxCapacity: Number.parseInt(formData.maxCapacity) || 0,
      budget: Number.parseInt(formData.budget) || 0,
      attendees: event?.attendees || 0,
      spent: event?.spent || 0,
    })
    onOpenChange(false)
  }

  const handleVisibilityChange = (role: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      visibility: checked ? [...prev.visibility, role] : prev.visibility.filter((r) => r !== role),
    }))
  }

  const handlePermissionChange = (permission: string, role: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked
          ? [...prev.permissions[permission as keyof typeof prev.permissions], role]
          : prev.permissions[permission as keyof typeof prev.permissions].filter((r) => r !== role),
      },
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Create New Event"}</DialogTitle>
          <DialogDescription>
            {event ? "Update event details and permissions" : "Fill in the details to create a new event"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="visibility">Visibility</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter event title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizer">Organizer *</Label>
                  <Input
                    id="organizer"
                    value={formData.organizer}
                    onChange={(e) => setFormData((prev) => ({ ...prev, organizer: e.target.value }))}
                    placeholder="Event organizer name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Event description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value, type: "" }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                    disabled={!formData.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.category &&
                        eventTypes[formData.category as keyof typeof eventTypes]?.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue *</Label>
                  <Select
                    value={formData.venue}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, venue: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select venue" />
                    </SelectTrigger>
                    <SelectContent>
                      {venues.map((venue) => (
                        <SelectItem key={venue} value={venue}>
                          {venue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Max Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData((prev) => ({ ...prev, maxCapacity: e.target.value }))}
                    placeholder="Maximum attendees"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                    placeholder="Event budget"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="registration"
                    checked={formData.requiresRegistration}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, requiresRegistration: checked as boolean }))
                    }
                  />
                  <Label htmlFor="registration">Requires Registration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="public"
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPublic: checked as boolean }))}
                  />
                  <Label htmlFor="public">Public Event</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="waitlist"
                    checked={formData.allowWaitlist}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, allowWaitlist: checked as boolean }))
                    }
                  />
                  <Label htmlFor="waitlist">Allow Waitlist</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifications"
                    checked={formData.sendNotifications}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, sendNotifications: checked as boolean }))
                    }
                  />
                  <Label htmlFor="notifications">Send Notifications</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="visibility" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Event Visibility</CardTitle>
                  <CardDescription>Select which user roles can see this event</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {userRoles.map((role) => (
                      <div key={role} className="flex items-center space-x-2">
                        <Checkbox
                          id={`visibility-${role}`}
                          checked={formData.visibility.includes(role)}
                          onCheckedChange={(checked) => handleVisibilityChange(role, checked as boolean)}
                        />
                        <Label htmlFor={`visibility-${role}`}>{role}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              <div className="grid gap-4">
                {Object.entries(formData.permissions).map(([permission, roles]) => (
                  <Card key={permission}>
                    <CardHeader>
                      <CardTitle className="capitalize">{permission} Permission</CardTitle>
                      <CardDescription>Who can {permission} this event</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {userRoles.map((role) => (
                          <div key={role} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${permission}-${role}`}
                              checked={roles.includes(role)}
                              onCheckedChange={(checked) =>
                                handlePermissionChange(permission, role, checked as boolean)
                              }
                            />
                            <Label htmlFor={`${permission}-${role}`}>{role}</Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{event ? "Update Event" : "Create Event"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
