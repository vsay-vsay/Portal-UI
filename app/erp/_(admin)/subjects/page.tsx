
"use client"
import { Button } from "@/components/ui/button"
import { Plus, Search, Filter } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"

export default function SubjectsPage() {
  // Sample data for subjects
  const subjects = [
    {
      id: "1",
      name: "Mathematics",
      code: "MATH101",
      department: "Mathematics",
      grades: "9, 10, 11, 12",
      teachers: 5,
      creditHours: 4,
    },
    {
      id: "2",
      name: "Physics",
      code: "PHYS101",
      department: "Science",
      grades: "9, 10, 11, 12",
      teachers: 3,
      creditHours: 4,
    },
    {
      id: "3",
      name: "Chemistry",
      code: "CHEM101",
      department: "Science",
      grades: "9, 10, 11, 12",
      teachers: 3,
      creditHours: 4,
    },
    {
      id: "4",
      name: "Biology",
      code: "BIO101",
      department: "Science",
      grades: "9, 10, 11, 12",
      teachers: 2,
      creditHours: 4,
    },
    {
      id: "5",
      name: "English",
      code: "ENG101",
      department: "Languages",
      grades: "All",
      teachers: 6,
      creditHours: 3,
    },
    {
      id: "6",
      name: "History",
      code: "HIST101",
      department: "Social Studies",
      grades: "9, 10, 11",
      teachers: 2,
      creditHours: 3,
    },
  ]

  // Column definitions for the subjects data table
  const columns = [
    {
      header: "Subject Name",
      accessorKey: "name",
      cell: (info: any) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      header: "Code",
      accessorKey: "code",
    },
    {
      header: "Department",
      accessorKey: "department",
    },
    {
      header: "Grades",
      accessorKey: "grades",
    },
    {
      header: "Teachers",
      accessorKey: "teachers",
    },
    {
      header: "Credit Hours",
      accessorKey: "creditHours",
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
        title="Subject Management"
        description="Manage subjects, assign teachers, and set curriculum"
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Subject
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Subject</DialogTitle>
                <DialogDescription>Create a new subject and set its details</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subjectName" className="text-right">
                    Subject Name
                  </Label>
                  <Input id="subjectName" placeholder="Geography" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subjectCode" className="text-right">
                    Subject Code
                  </Label>
                  <Input id="subjectCode" placeholder="GEO101" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">
                    Department
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="languages">Languages</SelectItem>
                      <SelectItem value="socialStudies">Social Studies</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                      <SelectItem value="physical">Physical Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="grades" className="text-right">
                    Applicable Grades
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select grades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      <SelectItem value="elementary">Elementary (1-5)</SelectItem>
                      <SelectItem value="middle">Middle School (6-8)</SelectItem>
                      <SelectItem value="high">High School (9-12)</SelectItem>
                      <SelectItem value="custom">Custom Selection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="creditHours" className="text-right">
                    Credit Hours
                  </Label>
                  <Input id="creditHours" type="number" placeholder="3" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter subject description..."
                    className="col-span-3"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Subject</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 w-full max-w-sm">
          <Search className="h-4 w-4 text-gray-400" />
          <Input placeholder="Search subjects..." />
        </div>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="languages">Languages</SelectItem>
              <SelectItem value="socialStudies">Social Studies</SelectItem>
              <SelectItem value="arts">Arts</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subjects</CardTitle>
          <CardDescription>Manage all subjects and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={subjects} />
        </CardContent>
      </Card>
    </div>
  )
}
