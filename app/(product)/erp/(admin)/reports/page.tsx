
"use client"
import { Download, Filter, Plus } from "lucide-react"

import { DataTable } from "@/components/data-table"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";




export const metadata: Metadata = generatePageMetadata({
  title: 'Reports',
  description: 'Generate and manage reports for your institution, including academic, financial, and administrative data.',
  keywords: ['ERP', 'Reports', 'Academic Reports', 'Financial Reports', 'Administrative Reports'],
  baseTitle: 'ERP System',
})

// Sample data for the reports table
const reports = [
  {
    id: "REP001",
    name: "Annual Academic Performance Report",
    category: "Academic",
    generated: "2023-04-15",
    status: "Completed",
  },
  {
    id: "REP002",
    name: "Quarterly Financial Statement",
    category: "Financial",
    generated: "2023-04-01",
    status: "Completed",
  },
  {
    id: "REP003",
    name: "Student Attendance Summary",
    category: "Attendance",
    generated: "2023-04-10",
    status: "Completed",
  },
  {
    id: "REP004",
    name: "Staff Performance Evaluation",
    category: "HR",
    generated: "2023-03-28",
    status: "Completed",
  },
  {
    id: "REP005",
    name: "Facility Utilization Report",
    category: "Infrastructure",
    generated: "2023-03-15",
    status: "Completed",
  },
  {
    id: "REP006",
    name: "Examination Results Analysis",
    category: "Academic",
    generated: "2023-04-05",
    status: "Completed",
  },
  {
    id: "REP007",
    name: "Library Usage Statistics",
    category: "Resources",
    generated: "2023-03-20",
    status: "Completed",
  },
  {
    id: "REP008",
    name: "Transport System Efficiency",
    category: "Operations",
    generated: "2023-03-25",
    status: "Completed",
  },
  {
    id: "REP009",
    name: "Canteen Revenue Report",
    category: "Financial",
    generated: "2023-04-02",
    status: "Completed",
  },
  {
    id: "REP010",
    name: "Admission Trends Analysis",
    category: "Admissions",
    generated: "2023-03-30",
    status: "Completed",
  },
]

// Define columns for the reports table
const columns = [
  {
    accessorKey: "id",
    header: "Report ID",
  },
  {
    accessorKey: "name",
    header: "Report Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "generated",
    header: "Generated On",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      return (
        <div className="flex items-center">
          <span className={`mr-2 h-2 w-2 rounded-full ${status === "Completed" ? "bg-green-500" : "bg-yellow-500"}`} />
          {status}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
          <span className="sr-only">Download report</span>
        </Button>
      )
    },
  },
]

export default function ReportsPage() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Reports"
          description="Generate and manage reports for your institution"
          actions={
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          }
        />

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Academic Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Reports generated this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Financial Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Reports generated this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Administrative Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">Reports generated this month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>View and download recently generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={reports} searchKey="name" searchPlaceholder="Search reports..." />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Reports scheduled for automatic generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Monthly Attendance Report</p>
                    <p className="text-xs text-muted-foreground">Scheduled for 1st of every month</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Quarterly Financial Statement</p>
                    <p className="text-xs text-muted-foreground">Scheduled for end of each quarter</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Weekly Academic Progress</p>
                    <p className="text-xs text-muted-foreground">Scheduled for every Friday</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Customizable report templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Academic Performance Template</p>
                    <p className="text-xs text-muted-foreground">For student performance analysis</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Use
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Financial Summary Template</p>
                    <p className="text-xs text-muted-foreground">For financial reporting</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Use
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Staff Evaluation Template</p>
                    <p className="text-xs text-muted-foreground">For HR performance reviews</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Use
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
