"use client"

import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, MapPin, Users, DollarSign, Eye, UserCheck, Edit, Trash2, Settings } from "lucide-react"

interface EventDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event?: any
}

export function EventDetailsDialog({ open, onOpenChange, event }: EventDetailsDialogProps) {
  if (!event) return null

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

  const attendancePercentage = (event.attendees / event.maxCapacity) * 100
  const budgetPercentage = (event.spent / event.budget) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{event.title}</span>
            <div className="flex gap-2">
              <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
              <Badge className={getPriorityColor(event.priority)}>{event.priority} Priority</Badge>
            </div>
          </DialogTitle>
          <DialogDescription>{event.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{event.date}</p>
                  <p className="text-sm text-muted-foreground">Date</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{event.time}</p>
                  <p className="text-sm text-muted-foreground">Time</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{event.venue}</p>
                  <p className="text-sm text-muted-foreground">Venue</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>
                    {event.organizer
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{event.organizer}</p>
                  <p className="text-sm text-muted-foreground">Organizer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Registered</span>
                    <span>
                      {event.attendees}/{event.maxCapacity}
                    </span>
                  </div>
                  <Progress value={attendancePercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(attendancePercentage)}% capacity filled</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Budget
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Spent</span>
                    <span>
                      ${event.spent}/${event.budget}
                    </span>
                  </div>
                  <Progress value={budgetPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(budgetPercentage)}% budget utilized</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visibility & Permissions */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Visibility
                </CardTitle>
                <CardDescription>Who can see this event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {event.visibility.map((role: string) => (
                    <Badge key={role} variant="secondary">
                      {role}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Permissions Summary
                </CardTitle>
                <CardDescription>Action permissions overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(event.permissions).map(([permission, roles]) => (
                    <div key={permission} className="flex justify-between text-sm">
                      <span className="capitalize">{permission}:</span>
                      <span className="text-muted-foreground">{(roles as string[]).length} roles</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Permissions</CardTitle>
              <CardDescription>Complete breakdown of who can perform each action</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {Object.entries(event.permissions).map(([permission, roles]) => (
                  <div key={permission} className="space-y-2">
                    <div className="flex items-center gap-2">
                      {permission === "view" && <Eye className="h-4 w-4" />}
                      {permission === "register" && <UserCheck className="h-4 w-4" />}
                      {permission === "edit" && <Edit className="h-4 w-4" />}
                      {permission === "delete" && <Trash2 className="h-4 w-4" />}
                      {permission === "manage" && <Settings className="h-4 w-4" />}
                      <span className="font-medium capitalize">{permission}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-6">
                      {(roles as string[]).map((role) => (
                        <Badge key={role} variant="outline">
                          {role}
                        </Badge>
                      ))}
                      {(roles as string[]).length === 0 && (
                        <span className="text-sm text-muted-foreground">No roles assigned</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
