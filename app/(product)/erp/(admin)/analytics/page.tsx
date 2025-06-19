import { BarChart, LineChart, PieChart } from "lucide-react"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "ERP System - Analytics",
  description:"Comprehensive analytics and insights for your institution",
  keywords: [
    "analytics",
    "education analytics",
    "institution insights",
    "academic performance",
    "financial analysis",
    "operational metrics",
    "admissions data",
    "school management",
    "data visualization",
    "educational trends"
  ],
  baseTitle: "",
});

export default function AnalyticsPage() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Analytics"
          description="Comprehensive analytics and insights for your institution"
          actions={
            <div className="flex gap-2">
              <Button variant="outline">Export Data</Button>
              <Button>Generate Report</Button>
            </div>
          }
        />

        <Tabs defaultValue="academic" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="operational">Operational</TabsTrigger>
            <TabsTrigger value="admissions">Admissions</TabsTrigger>
          </TabsList>
          <TabsContent value="academic" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Performance Trends</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87.2%</div>
                  <p className="text-xs text-muted-foreground">Average performance across all subjects</p>
                  <div className="mt-4 h-[200px] w-full rounded-md bg-muted/20"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subject Distribution</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42 Subjects</div>
                  <p className="text-xs text-muted-foreground">Across all departments and grades</p>
                  <div className="mt-4 h-[200px] w-full rounded-md bg-muted/20"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Grade Distribution</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.6 GPA</div>
                  <p className="text-xs text-muted-foreground">Average GPA across all students</p>
                  <div className="mt-4 h-[200px] w-full rounded-md bg-muted/20"></div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Academic Performance Analysis</CardTitle>
                <CardDescription>Detailed breakdown of academic performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full rounded-md bg-muted/20"></div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="financial" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue Breakdown</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2.8M</div>
                  <p className="text-xs text-muted-foreground">Total revenue year to date</p>
                  <div className="mt-4 h-[200px] w-full rounded-md bg-muted/20"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Expense Categories</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1.9M</div>
                  <p className="text-xs text-muted-foreground">Total expenses year to date</p>
                  <div className="mt-4 h-[200px] w-full rounded-md bg-muted/20"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">72%</div>
                  <p className="text-xs text-muted-foreground">Of annual budget utilized</p>
                  <div className="mt-4 h-[200px] w-full rounded-md bg-muted/20"></div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Financial Trends</CardTitle>
                <CardDescription>Monthly revenue and expense trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full rounded-md bg-muted/20"></div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="operational" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attendance Trends</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground">Average attendance rate</p>
                  <div className="mt-4 h-[200px] w-full rounded-md bg-muted/20"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resource Utilization</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">Average resource utilization</p>
                  <div className="mt-4 h-[200px] w-full rounded-md bg-muted/20"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Staff Performance</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2/5</div>
                  <p className="text-xs text-muted-foreground">Average staff rating</p>
                  <div className="mt-4 h-[200px] w-full rounded-md bg-muted/20"></div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Operational Efficiency</CardTitle>
                <CardDescription>Key operational metrics and efficiency indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full rounded-md bg-muted/20"></div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="admissions" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Admission Trends</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12%</div>
                  <p className="text-xs text-muted-foreground">Increase in admissions YoY</p>
                  <div className="mt-4 h-[200px] w-full rounded-md bg-muted/20"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Application Sources</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,245</div>
                  <p className="text-xs text-muted-foreground">Total applications received</p>
                  <div className="mt-4 h-[200px] w-full rounded-md bg-muted/20"></div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-xs text-muted-foreground">Application to enrollment rate</p>
                  <div className="mt-4 h-[200px] w-full rounded-md bg-muted/20"></div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Admission Demographics</CardTitle>
                <CardDescription>Demographic breakdown of new admissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full rounded-md bg-muted/20"></div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
