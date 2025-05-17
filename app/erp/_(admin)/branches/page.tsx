"use client";
import { Building, Edit, MapPin, MoreHorizontal, Plus, Trash } from "lucide-react"

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

// Sample data for branches
const branches = [
  {
    id: "BR001",
    name: "Main Campus",
    location: "123 Education St, New York, NY",
    established: "2005",
    students: 1250,
    staff: 85,
    status: "Active",
  },
  {
    id: "BR002",
    name: "West Wing Campus",
    location: "456 Learning Ave, New York, NY",
    established: "2010",
    students: 850,
    staff: 62,
    status: "Active",
  },
  {
    id: "BR003",
    name: "South Campus",
    location: "789 Knowledge Blvd, New Jersey, NJ",
    established: "2015",
    students: 620,
    staff: 45,
    status: "Active",
  },
  {
    id: "BR004",
    name: "East Campus",
    location: "321 Wisdom Rd, Connecticut, CT",
    established: "2018",
    students: 480,
    staff: 38,
    status: "Active",
  },
  {
    id: "BR005",
    name: "North Campus",
    location: "654 Scholar St, Massachusetts, MA",
    established: "2020",
    students: 320,
    staff: 28,
    status: "Active",
  },
  {
    id: "BR006",
    name: "Downtown Center",
    location: "987 Education Ln, New York, NY",
    established: "2021",
    students: 180,
    staff: 15,
    status: "Active",
  },
  {
    id: "BR007",
    name: "International Campus",
    location: "111 Global Ave, London, UK",
    established: "2019",
    students: 350,
    staff: 32,
    status: "Active",
  },
  {
    id: "BR008",
    name: "Tech Campus",
    location: "222 Innovation Dr, California, CA",
    established: "2022",
    students: 150,
    staff: 18,
    status: "Under Construction",
  },
]

// Define columns for the branches table
const columns = [
  {
    accessorKey: "id",
    header: "Branch ID",
  },
  {
    accessorKey: "name",
    header: "Branch Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "established",
    header: "Established",
  },
  {
    accessorKey: "students",
    header: "Students",
  },
  {
    accessorKey: "staff",
    header: "Staff",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
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
    cell: ({ row }) => {
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
              Edit Branch
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MapPin className="mr-2 h-4 w-4" />
              View Location
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete Branch
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function BranchesPage() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Branches"
          description="Manage all branches of your educational institution"
          actions={
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Branch
            </Button>
          }
        />

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{branches.length}</div>
              <p className="text-xs text-muted-foreground">Across all locations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{branches.reduce((sum, branch) => sum + branch.students, 0)}</div>
              <p className="text-xs text-muted-foreground">Enrolled across all branches</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{branches.reduce((sum, branch) => sum + branch.staff, 0)}</div>
              <p className="text-xs text-muted-foreground">Employed across all branches</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Branches</CardTitle>
            <CardDescription>View and manage all branches of your institution</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={branches} searchKey="name" searchPlaceholder="Search branches..." />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Branch Distribution</CardTitle>
              <CardDescription>Geographic distribution of branches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Building className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Branch location map will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Branch Performance</CardTitle>
              <CardDescription>Academic and operational performance by branch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Building className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Branch performance metrics will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
