import { Activity, Building, GraduationCap, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/page-header"
import { StatsCard } from "@/components/stats-card"

export default function AdminDashboardPage() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Admin Dashboard"
          description="Overview of your educational institution"
          actions={<Button>Generate Report</Button>}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Students"
            value="2,856"
            description="Across all branches"
            icon={<GraduationCap className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Total Teachers"
            value="187"
            description="Full-time and part-time"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard title="Branches" value="8" description="Active campuses" icon={<Building className="h-4 w-4" />} />
          <StatsCard
            title="Attendance Rate"
            value="94.2%"
            description="Average across all classes"
            icon={<Activity className="h-4 w-4" />}
            trend={{ value: 2, isPositive: true }}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest activities across the institution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New Teacher Onboarded</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <GraduationCap className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Exam Results Published</p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Building className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New Branch Setup Completed</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events scheduled in the next 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">Annual Sports Day</p>
                      <p className="text-xs text-muted-foreground">May 15, 2023</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">Parent-Teacher Meeting</p>
                      <p className="text-xs text-muted-foreground">May 20, 2023</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">Board Exam Preparation Workshop</p>
                      <p className="text-xs text-muted-foreground">May 25, 2023</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current system health and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Server Uptime</span>
                      <span className="text-sm font-medium">99.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Database Status</span>
                      <span className="text-sm font-medium text-emerald-500">Healthy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Backup</span>
                      <span className="text-sm font-medium">Today, 03:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Storage Usage</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Overview</CardTitle>
                  <CardDescription>Summary of financial status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Revenue (YTD)</span>
                      <span className="text-sm font-medium">$2,856,420</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Expenses (YTD)</span>
                      <span className="text-sm font-medium">$1,987,345</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Outstanding Fees</span>
                      <span className="text-sm font-medium">$145,780</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Budget Utilization</span>
                      <span className="text-sm font-medium">72%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Academic Performance</CardTitle>
                  <CardDescription>Overall academic metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Average GPA</span>
                      <span className="text-sm font-medium">3.6/4.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pass Rate</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Top Performing Department</span>
                      <span className="text-sm font-medium">Science</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Improvement Areas</span>
                      <span className="text-sm font-medium">Languages</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Detailed analytics will be displayed here</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">Analytics charts and graphs will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generated reports will be displayed here</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">Reports will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>System notifications will be displayed here</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">Notifications will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
