"use client"

import { useState } from "react"
import { Bell, Calendar, Check, FileText, MessageCircle, Settings, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample notifications data
const notifications = [
  {
    id: 1,
    title: "New message from John Doe",
    description: "Regarding his son's performance in mathematics",
    time: "10 minutes ago",
    read: false,
    type: "message",
    sender: {
      name: "John Doe",
      avatar: "/avatars/01.png",
      role: "Parent",
    },
  },
  {
    id: 2,
    title: "Staff Meeting Reminder",
    description: "Monthly staff meeting tomorrow at 3:30 PM in the Conference Room",
    time: "1 hour ago",
    read: false,
    type: "event",
    sender: {
      name: "Principal Adams",
      avatar: "/avatars/02.png",
      role: "Admin",
    },
  },
  {
    id: 3,
    title: "Grade Submission Deadline",
    description: "Mid-term grades must be submitted by May 15th",
    time: "3 hours ago",
    read: true,
    type: "task",
    sender: {
      name: "Academic Office",
      avatar: "/avatars/03.png",
      role: "Admin",
    },
  },
  {
    id: 4,
    title: "New Assignment Submission",
    description: "Jane Smith has submitted her algebra assignment",
    time: "Yesterday",
    read: true,
    type: "submission",
    sender: {
      name: "Jane Smith",
      avatar: "/avatars/04.png",
      role: "Student",
    },
  },
  {
    id: 5,
    title: "Curriculum Update",
    description: "New mathematics curriculum guidelines have been published",
    time: "2 days ago",
    read: true,
    type: "announcement",
    sender: {
      name: "Department Head",
      avatar: "/avatars/05.png",
      role: "Admin",
    },
  },
]

export default function TeacherNotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationState, setNotificationState] = useState(notifications)

  // Filter notifications based on active tab
  const filteredNotifications = notificationState.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotificationState((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotificationState((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      case "task":
        return <FileText className="h-4 w-4" />
      case "submission":
        return <FileText className="h-4 w-4" />
      case "announcement":
        return <Bell className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <>
    

      <Card>
        <CardHeader className="pb-3">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="message">Messages</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
              <TabsTrigger value="task">Tasks</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-4 rounded-lg border p-4 ${
                    !notification.read ? "bg-muted/40" : ""
                  }`}
                >
                  <div className="flex-shrink-0">
                    <Avatar>
                      <AvatarImage
                        src={notification.sender.avatar || "/placeholder.svg"}
                        alt={notification.sender.name}
                      />
                      <AvatarFallback>{notification.sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full ${
                            notification.type === "message"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                              : notification.type === "event"
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                                : notification.type === "task"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                  : notification.type === "submission"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                    : "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
                          }`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {notification.sender.name} ({notification.sender.role})
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as Read
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <Bell className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-medium">No notifications</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {activeTab === "all"
                      ? "You don't have any notifications yet"
                      : activeTab === "unread"
                        ? "You don't have any unread notifications"
                        : `You don't have any ${activeTab} notifications`}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredNotifications.length} of {notificationState.length} notifications
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
