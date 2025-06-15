"use client"

import { useState } from "react"
import { Bell, BookOpen, Calendar, CheckCircle2, Clock, FileText, Filter, GraduationCap, MessageSquare, Trash2 } from 'lucide-react'

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

export default function StudentNotificationsPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: "Assignment Due Reminder",
      message: "Your Science Project is due tomorrow at 11:59 PM.",
      time: "10 minutes ago",
      type: "assignment",
      isRead: false,
      icon: FileText,
    },
    {
      id: 2,
      title: "New Announcement",
      message: "The annual sports day will be held on May 15th. All students are required to participate in at least one event.",
      time: "2 hours ago",
      type: "announcement",
      isRead: false,
      icon: Bell,
    },
    {
      id: 3,
      title: "Grade Updated",
      message: "Your Mathematics quiz grade has been updated. You scored 92%.",
      time: "Yesterday",
      type: "grade",
      isRead: true,
      icon: GraduationCap,
    },
    {
      id: 4,
      title: "New Message",
      message: "You have a new message from Ms. Sarah Johnson regarding your Science project.",
      time: "Yesterday",
      type: "message",
      isRead: true,
      icon: MessageSquare,
    },
    {
      id: 5,
      title: "Attendance Marked",
      message: "Your attendance has been marked for today's classes.",
      time: "2 days ago",
      type: "attendance",
      isRead: true,
      icon: CheckCircle2,
    },
    {
      id: 6,
      title: "New Learning Material",
      message: "New learning materials for Computer Science have been uploaded.",
      time: "3 days ago",
      type: "material",
      isRead: true,
      icon: BookOpen,
    },
    {
      id: 7,
      title: "Event Reminder",
      message: "Parent-Teacher Meeting is scheduled for May 15th at 9:00 AM.",
      time: "4 days ago",
      type: "event",
      isRead: true,
      icon: Calendar,
    },
  ]
  
  // Filter notifications based on selected tab
  const filteredNotifications = notifications.filter(notification => {
    if (selectedTab === "all") return true
    if (selectedTab === "unread") return !notification.isRead
    return notification.type === selectedTab
  })
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.isRead).length
  
  return (
    <>
      <PageHeader 
        title="Notifications" 
        description={`You have ${unreadCount} unread notifications`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark all as read</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-7">
              <TabsTrigger value="all">
                All
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="assignment">Assignments</TabsTrigger>
              <TabsTrigger value="grade">Grades</TabsTrigger>
              <TabsTrigger value="announcement" className="hidden md:inline-flex">Announcements</TabsTrigger>
              <TabsTrigger value="message" className="hidden md:inline-flex">Messages</TabsTrigger>
              <TabsTrigger value="event" className="hidden md:inline-flex">Events</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex items-start gap-4 rounded-lg border p-4 ${!notification.isRead ? 'bg-primary/5' : ''}`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <notification.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{notification.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                        {!notification.isRead && (
                          <Badge variant="secondary" className="h-2 w-2 rounded-full p-0" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm">{notification.message}</p>
                    <div className="mt-2 flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        Mark as read
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <Bell className="mx-auto h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No notifications</h3>
                  <p className="mt-2 text-sm text-muted-foreground">You don't have any notifications in this category.</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
