
"use client";
import { Building, Edit, MoreHorizontal, Plus, Trash, Users } from "lucide-react"

import { DataTable } from "@/components/data-table"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


// Sample data for departments
const departments = [
  {
    id: "DEP001",
    name: "Mathematics",
    head: "Dr. John Smith",
    faculty: 12,
    students: 450,
    courses: 18,
    established: "2005",
    status: "Active",
  },
  {
    id: "DEP002",
    name: "Science",
    head: "Dr. Emily Johnson",
    faculty: 15,
    students: 520,
    courses: 22,
    established: "2005",
    status: "Active",
  },
  {
    id: "DEP003",
    name: "English",
    head: "Prof. Michael Brown",
    faculty: 10,
    students: 380,
    courses: 15,
    established: "2006",
    status: "Active",
  },
  {
    id: "DEP004",
    name: "History",
    head: "Dr. Sarah Wilson",
    faculty: 8,
    students: 290,
    courses: 12,
    established: "2007",
    status: "Active",
  },
  {
    id: "DEP005",
    name: "Computer Science",
    head: "Prof. David Lee",
    faculty: 14,
    students: 480,
    courses: 20,
    established: "2010",
    status: "Active",
  },
  {
    id: "DEP006",
    name: "Physical Education",
    head: "Coach Robert Taylor",
    faculty: 6,
    students: 320,
    courses: 8,
    established: "2008",
    status: "Active",
  },
  {
    id: "DEP007",
    name: "Arts",
    head: "Prof. Jennifer Adams",
    faculty: 9,
    students: 310,
    courses: 14,
    established: "2009",
    status: "Active",
  },
  {
    id: "DEP008",
    name: "Music",
    head: "Dr. Thomas Wilson",
    faculty: 7,
    students: 180,
    courses: 10,
    established: "2011",
    status: "Active",
  },
  {
    id: "DEP009",
    name: "Foreign Languages",
    head: "Prof. Maria Rodriguez",
    faculty: 11,
    students: 340,
    courses: 16,
    established: "2012",
    status: "Active",
  },
  {
    id: "DEP010",
    name: "Economics",
    head: "Dr. Richard Chen",
    faculty: 8,
    students: 270,
    courses: 12,
    established: "2015",
    status: "Active",
  },
]

// Define columns for the departments table
const columns = [
  {
    accessorKey: "id",
    header: "Dept ID",
  },
  {
    accessorKey: "name",
    header: "Department Name",
  },
  {
    accessorKey: "head",
    header: "Department Head",
  },
  {
    accessorKey: "faculty",
    header: "Faculty",
  },
  {
    accessorKey: "students",
    header: "Students",
  },
  {
    accessorKey: "courses",
    header: "Courses",
  },
  {
    accessorKey: "established",
    header: "Established",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }:{
      row:any
    }) => {
      const status = row.getValue("status")
      return (
        <div className="flex items-center">
          <span className={`mr-2 h-2 w-2 rounded-full ${status === "Active" ? "bg-green-500" : "bg-yellow-500"}`} />
          {status}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }:{
      row:any
    }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Department
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              View Faculty
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete Department
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function DepartmentsPage() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Departments"
          description="Manage academic departments of your institution"
          actions={
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          }
        />

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departments.length}</div>
              <p className="text-xs text-muted-foreground">Academic departments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departments.reduce((sum, dept) => sum + dept.faculty, 0)}</div>
              <p className="text-xs text-muted-foreground">Across all departments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departments.reduce((sum, dept) => sum + dept.students, 0)}</div>
              <p className="text-xs text-muted-foreground">Enrolled in departments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departments.reduce((sum, dept) => sum + dept.courses, 0)}</div>
              <p className="text-xs text-muted-foreground">Offered by departments</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Departments</CardTitle>
            <CardDescription>View and manage all academic departments</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={departments}
              searchKey="name"
              searchPlaceholder="Search departments..."
            />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Academic performance by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Building className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Department performance metrics will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Student Distribution</CardTitle>
              <CardDescription>Student distribution across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Users className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Student distribution chart will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
