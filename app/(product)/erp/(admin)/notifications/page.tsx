import { Bell, Check, Filter, Trash } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample notifications data
const notifications = [
  {
    id: 1,
    title: "System Update Completed",
    description: "The system has been successfully updated to version 2.5.0.",
    time: "2 hours ago",
    type: "system",
    read: false,
  },
  {
    id: 2,
    title: "New Teacher Registration",
    description: "A new teacher has registered and is awaiting approval.",
    time: "5 hours ago",
    type: "user",
    read: false,
  },
  {
    id: 3,
    title: "Backup Completed",
    description: "Daily database backup has been completed successfully.",
    time: "Yesterday",
    type: "system",
    read: true,
  },
  {
    id: 4,
    title: "Fee Payment Reminder",
    description: "Reminder to send fee payment notifications to students.",
    time: "Yesterday",
    type: "task",
    read: true,
  },
  {
    id: 5,
    title: "New Student Enrollment",
    description: "10 new students have been enrolled in the system.",
    time: "2 days ago",
    type: "user",
    read: true,
  },
  {
    id: 6,
    title: "Server Maintenance",
    description: "Scheduled server maintenance will occur on Saturday at 2 AM.",
    time: "3 days ago",
    type: "system",
    read: true,
  },
  {
    id: 7,
    title: "Exam Results Published",
    description: "Final exam results have been published for all classes.",
    time: "4 days ago",
    type: "academic",
    read: true,
  },
  {
    id: 8,
    title: "Budget Approval Required",
    description: "The annual budget proposal requires your approval.",
    time: "5 days ago",
    type: "task",
    read: true,
  },
];

export default function NotificationsPage() {
  return (
    <div className="flex flex-1 flex-col gap-5">
      <PageHeader
        title="Notifications"
        description="Manage system notifications and alerts"
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <Check className="mr-2 h-4 w-4" />
              Mark All as Read
            </Button>
            <Button variant="destructive">
              <Trash className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              All Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
            <p className="text-xs text-muted-foreground">Total notifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.filter((n) => !n.read).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Unread notifications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.filter((n) => n.type === "system").length}
            </div>
            <p className="text-xs text-muted-foreground">
              System notifications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.filter((n) => n.type === "task").length}
            </div>
            <p className="text-xs text-muted-foreground">Task notifications</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="task">Tasks</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>View all system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 rounded-lg border p-4 ${
                      !notification.read ? "bg-muted/50" : ""
                    }`}
                  >
                    <div className="rounded-full bg-primary/10 p-2">
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>View all unread notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications
                  .filter((notification) => !notification.read)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-4 rounded-lg border bg-muted/50 p-4"
                    >
                      <div className="rounded-full bg-primary/10 p-2">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Notifications</CardTitle>
              <CardDescription>
                View all system-related notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications
                  .filter((notification) => notification.type === "system")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 rounded-lg border p-4 ${
                        !notification.read ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="rounded-full bg-primary/10 p-2">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>User Notifications</CardTitle>
              <CardDescription>
                View all user-related notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications
                  .filter((notification) => notification.type === "user")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 rounded-lg border p-4 ${
                        !notification.read ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="rounded-full bg-primary/10 p-2">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="task">
          <Card>
            <CardHeader>
              <CardTitle>Task Notifications</CardTitle>
              <CardDescription>
                View all task-related notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications
                  .filter((notification) => notification.type === "task")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 rounded-lg border p-4 ${
                        !notification.read ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="rounded-full bg-primary/10 p-2">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Academic Notifications</CardTitle>
              <CardDescription>
                View all academic-related notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications
                  .filter((notification) => notification.type === "academic")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 rounded-lg border p-4 ${
                        !notification.read ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="rounded-full bg-primary/10 p-2">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Configure your notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Email Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">SMS Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Receive notifications via SMS
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Push Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Receive push notifications
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Notification Categories</p>
                <p className="text-xs text-muted-foreground">
                  Configure which types of notifications to receive
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
