
"use client"
import { Button } from "@/components/ui/button"
import { Calendar, Plus, Search } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"




export default function AcademicYearPage() {
  // Sample data for academic years
  const academicYears = [
    {
      id: "1",
      name: "2023-2024",
      startDate: "June 1, 2023",
      endDate: "March 31, 2024",
      status: "Current",
      terms: 3,
    },
    {
      id: "2",
      name: "2022-2023",
      startDate: "June 1, 2022",
      endDate: "March 31, 2023",
      status: "Completed",
      terms: 3,
    },
    {
      id: "3",
      name: "2021-2022",
      startDate: "June 1, 2021",
      endDate: "March 31, 2022",
      status: "Archived",
      terms: 3,
    },
    {
      id: "4",
      name: "2024-2025",
      startDate: "June 1, 2024",
      endDate: "March 31, 2025",
      status: "Upcoming",
      terms: 3,
    },
  ]

  // Column definitions for the data table
  const columns = [
    {
      header: "Academic Year",
      accessorKey: "name",
      cell: (info: any) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      header: "Start Date",
      accessorKey: "startDate",
    },
    {
      header: "End Date",
      accessorKey: "endDate",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => {
        const status = info.getValue()
        let statusClass = "bg-gray-100 text-gray-800"

        if (status === "Current") {
          statusClass = "bg-green-100 text-green-800"
        } else if (status === "Upcoming") {
          statusClass = "bg-blue-100 text-blue-800"
        } else if (status === "Completed") {
          statusClass = "bg-yellow-100 text-yellow-800"
        } else if (status === "Archived") {
          statusClass = "bg-gray-100 text-gray-800"
        }

        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>{status}</span>
      },
    },
    {
      header: "Terms",
      accessorKey: "terms",
    },
    {
      header: "Actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Edit
          </Button>
          <Button variant="ghost" size="sm">
            View
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Academic Year Management"
        description="Create and manage academic years, terms, and sessions"
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Academic Year
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Academic Year</DialogTitle>
                <DialogDescription>Create a new academic year with terms and sessions</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="2024-2025" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startDate" className="text-right">
                    Start Date
                  </Label>
                  <div className="col-span-3 flex items-center">
                    <Input id="startDate" type="date" />
                    <Calendar className="ml-2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endDate" className="text-right">
                    End Date
                  </Label>
                  <div className="col-span-3 flex items-center">
                    <Input id="endDate" type="date" />
                    <Calendar className="ml-2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="terms" className="text-right">
                    Number of Terms
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select number of terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Academic Year</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 w-full max-w-sm">
          <Search className="h-4 w-4 text-gray-400" />
          <Input placeholder="Search academic years..." />
        </div>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="current">Current</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Academic Years</CardTitle>
          <CardDescription>Manage all academic years and their terms</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={academicYears} />
        </CardContent>
      </Card>
    </div>
  )
}
