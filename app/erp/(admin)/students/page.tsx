
"use client"
import { Button } from "@/components/ui/button"
import { Plus, Search, Filter, Download, Upload, Eye, Edit, Trash2 } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"

export default function StudentsPage() {
  // Sample data for students
  const students = [
    {
      id: "ST-1001",
      name: "Alice Johnson",
      grade: "10A",
      gender: "Female",
      dateOfBirth: "15/05/2008",
      parentName: "Robert Johnson",
      contactNumber: "+1 (555) 123-4567",
      email: "alice.j@example.com",
      address: "123 Main St, Anytown",
      status: "Active",
    },
    {
      id: "ST-1002",
      name: "Bob Smith",
      grade: "9B",
      gender: "Male",
      dateOfBirth: "22/08/2009",
      parentName: "James Smith",
      contactNumber: "+1 (555) 234-5678",
      email: "bob.s@example.com",
      address: "456 Oak Ave, Anytown",
      status: "Active",
    },
    {
      id: "ST-1003",
      name: "Charlie Brown",
      grade: "11A",
      gender: "Male",
      dateOfBirth: "10/03/2007",
      parentName: "David Brown",
      contactNumber: "+1 (555) 345-6789",
      email: "charlie.b@example.com",
      address: "789 Pine Rd, Anytown",
      status: "Active",
    },
    {
      id: "ST-1004",
      name: "Diana Miller",
      grade: "10B",
      gender: "Female",
      dateOfBirth: "05/11/2008",
      parentName: "Sarah Miller",
      contactNumber: "+1 (555) 456-7890",
      email: "diana.m@example.com",
      address: "101 Elm St, Anytown",
      status: "Active",
    },
    {
      id: "ST-1005",
      name: "Edward Wilson",
      grade: "12A",
      gender: "Male",
      dateOfBirth: "18/07/2006",
      parentName: "Michael Wilson",
      contactNumber: "+1 (555) 567-8901",
      email: "edward.w@example.com",
      address: "202 Maple Dr, Anytown",
      status: "Inactive",
    },
  ]

  // Column definitions for the students data table
  const columns = [
    {
      header: "Student ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: (info: any) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      header: "Grade",
      accessorKey: "grade",
    },
    {
      header: "Gender",
      accessorKey: "gender",
    },
    {
      header: "Date of Birth",
      accessorKey: "dateOfBirth",
    },
    {
      header: "Parent Name",
      accessorKey: "parentName",
    },
    {
      header: "Contact Number",
      accessorKey: "contactNumber",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => {
        const status = info.getValue()
        let statusClass = "bg-gray-100 text-gray-800"

        if (status === "Active") {
          statusClass = "bg-green-100 text-green-800"
        } else if (status === "Inactive") {
          statusClass = "bg-red-100 text-red-800"
        }

        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>{status}</span>
      },
    },
    {
      header: "Actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Student Management"
        description="Manage students, view profiles, and track academic progress"
        actions={
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>Enter student details to create a new student profile</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="personal">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="contact">Contact Info</TabsTrigger>
                    <TabsTrigger value="academic">Academic Info</TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input id="dateOfBirth" type="date" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a+">A+</SelectItem>
                          <SelectItem value="a-">A-</SelectItem>
                          <SelectItem value="b+">B+</SelectItem>
                          <SelectItem value="b-">B-</SelectItem>
                          <SelectItem value="ab+">AB+</SelectItem>
                          <SelectItem value="ab-">AB-</SelectItem>
                          <SelectItem value="o+">O+</SelectItem>
                          <SelectItem value="o-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                  <TabsContent value="contact" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="parentName">Parent/Guardian Name</Label>
                        <Input id="parentName" placeholder="Robert Johnson" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="relationship">Relationship</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="father">Father</SelectItem>
                            <SelectItem value="mother">Mother</SelectItem>
                            <SelectItem value="guardian">Guardian</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactNumber">Contact Number</Label>
                        <Input id="contactNumber" placeholder="+1 (555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" placeholder="123 Main St, Anytown" />
                    </div>
                  </TabsContent>
                  <TabsContent value="academic" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="admissionDate">Admission Date</Label>
                        <Input id="admissionDate" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="grade">Grade</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9a">Grade 9A</SelectItem>
                            <SelectItem value="9b">Grade 9B</SelectItem>
                            <SelectItem value="10a">Grade 10A</SelectItem>
                            <SelectItem value="10b">Grade 10B</SelectItem>
                            <SelectItem value="11a">Grade 11A</SelectItem>
                            <SelectItem value="11b">Grade 11B</SelectItem>
                            <SelectItem value="12a">Grade 12A</SelectItem>
                            <SelectItem value="12b">Grade 12B</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rollNumber">Roll Number</Label>
                        <Input id="rollNumber" placeholder="101" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="section">Section</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a">A</SelectItem>
                            <SelectItem value="b">B</SelectItem>
                            <SelectItem value="c">C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="previousSchool">Previous School (if any)</Label>
                      <Input id="previousSchool" placeholder="ABC School" />
                    </div>
                  </TabsContent>
                </Tabs>
                <DialogFooter>
                  <Button type="submit">Save Student</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        }
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 w-full max-w-sm">
          <Search className="h-4 w-4 text-gray-400" />
          <Input placeholder="Search students..." />
        </div>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="9">Grade 9</SelectItem>
              <SelectItem value="10">Grade 10</SelectItem>
              <SelectItem value="11">Grade 11</SelectItem>
              <SelectItem value="12">Grade 12</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>Manage all students and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={students} />
        </CardContent>
      </Card>
    </div>
  )
}
