
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";




export const metadata: Metadata = generatePageMetadata({
  title: 'Class Management',
  description: 'Manage classes, sections, and assign teachers within the ERP system.',
  keywords: ['ERP', 'Class Management', 'Sections', 'Teachers', 'Education'],
  baseTitle: 'ERP System',
})


export default function ClassManagementPage() {
  // Sample data for classes
  const classes = [
    {
      id: "1",
      name: "Class 10A",
      section: "A",
      grade: "10",
      classTeacher: "John Smith",
      students: 32,
      subjects: 8,
      room: "R-101",
    },
    {
      id: "2",
      name: "Class 10B",
      section: "B",
      grade: "10",
      classTeacher: "Sarah Johnson",
      students: 30,
      subjects: 8,
      room: "R-102",
    },
    {
      id: "3",
      name: "Class 9A",
      section: "A",
      grade: "9",
      classTeacher: "Michael Brown",
      students: 35,
      subjects: 7,
      room: "R-103",
    },
    {
      id: "4",
      name: "Class 9B",
      section: "B",
      grade: "9",
      classTeacher: "Emily Davis",
      students: 33,
      subjects: 7,
      room: "R-104",
    },
    {
      id: "5",
      name: "Class 8A",
      section: "A",
      grade: "8",
      classTeacher: "Robert Wilson",
      students: 34,
      subjects: 7,
      room: "R-105",
    },
  ]

  // Sample data for sections
  const sections = [
    {
      id: "1",
      name: "Section A",
      grade: "10",
      capacity: 35,
      filled: 32,
      classTeacher: "John Smith",
    },
    {
      id: "2",
      name: "Section B",
      grade: "10",
      capacity: 35,
      filled: 30,
      classTeacher: "Sarah Johnson",
    },
    {
      id: "3",
      name: "Section A",
      grade: "9",
      capacity: 35,
      filled: 35,
      classTeacher: "Michael Brown",
    },
  ]

  // Column definitions for the classes data table
  const classesColumns = [
    {
      header: "Class Name",
      accessorKey: "name",
      cell: (info: any) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      header: "Section",
      accessorKey: "section",
    },
    {
      header: "Grade",
      accessorKey: "grade",
    },
    {
      header: "Class Teacher",
      accessorKey: "classTeacher",
    },
    {
      header: "Students",
      accessorKey: "students",
    },
    {
      header: "Subjects",
      accessorKey: "subjects",
    },
    {
      header: "Room",
      accessorKey: "room",
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

  // Column definitions for the sections data table
  const sectionsColumns = [
    {
      header: "Section Name",
      accessorKey: "name",
      cell: (info: any) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      header: "Grade",
      accessorKey: "grade",
    },
    {
      header: "Capacity",
      accessorKey: "capacity",
    },
    {
      header: "Filled",
      accessorKey: "filled",
    },
    {
      header: "Class Teacher",
      accessorKey: "classTeacher",
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
        title="Class Management"
        description="Manage classes, sections, and assign teachers"
        actions={
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Class
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Class</DialogTitle>
                  <DialogDescription>Create a new class and assign a teacher</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="className" className="text-right">
                      Class Name
                    </Label>
                    <Input id="className" placeholder="Class 10C" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="section" className="text-right">
                      Section
                    </Label>
                    <Input id="section" placeholder="C" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="grade" className="text-right">
                      Grade
                    </Label>
                    <Input id="grade" placeholder="10" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="classTeacher" className="text-right">
                      Class Teacher
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="michael">Michael Brown</SelectItem>
                        <SelectItem value="emily">Emily Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="room" className="text-right">
                      Room
                    </Label>
                    <Input id="room" placeholder="R-106" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Class</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Section
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Section</DialogTitle>
                  <DialogDescription>Create a new section for a grade</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sectionName" className="text-right">
                      Section Name
                    </Label>
                    <Input id="sectionName" placeholder="Section C" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sectionGrade" className="text-right">
                      Grade
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">Grade 8</SelectItem>
                        <SelectItem value="9">Grade 9</SelectItem>
                        <SelectItem value="10">Grade 10</SelectItem>
                        <SelectItem value="11">Grade 11</SelectItem>
                        <SelectItem value="12">Grade 12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="capacity" className="text-right">
                      Capacity
                    </Label>
                    <Input id="capacity" type="number" placeholder="35" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sectionTeacher" className="text-right">
                      Class Teacher
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="michael">Michael Brown</SelectItem>
                        <SelectItem value="emily">Emily Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Section</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <Tabs defaultValue="classes">
        <TabsList>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
        </TabsList>
        <TabsContent value="classes" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-gray-400" />
              <Input placeholder="Search classes..." />
            </div>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="8">Grade 8</SelectItem>
                  <SelectItem value="9">Grade 9</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="11">Grade 11</SelectItem>
                  <SelectItem value="12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Classes</CardTitle>
              <CardDescription>Manage all classes and their details</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={classesColumns} data={classes} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sections" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-gray-400" />
              <Input placeholder="Search sections..." />
            </div>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="8">Grade 8</SelectItem>
                  <SelectItem value="9">Grade 9</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="11">Grade 11</SelectItem>
                  <SelectItem value="12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sections</CardTitle>
              <CardDescription>Manage all sections and their details</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={sectionsColumns} data={sections} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
