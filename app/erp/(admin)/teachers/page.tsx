
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

export default function TeachersPage() {
  // Sample data for teachers
  const teachers = [
    {
      id: "TCH-1001",
      name: "John Smith",
      department: "Mathematics",
      qualification: "M.Sc., B.Ed.",
      experience: "8 years",
      contactNumber: "+1 (555) 123-4567",
      email: "john.s@example.com",
      joiningDate: "15/08/2015",
      subjects: "Mathematics",
      status: "Active",
    },
    {
      id: "TCH-1002",
      name: "Sarah Johnson",
      department: "Science",
      qualification: "Ph.D., B.Ed.",
      experience: "10 years",
      contactNumber: "+1 (555) 234-5678",
      email: "sarah.j@example.com",
      joiningDate: "10/06/2013",
      subjects: "Physics, Chemistry",
      status: "Active",
    },
    {
      id: "TCH-1003",
      name: "Michael Brown",
      department: "Science",
      qualification: "M.Sc., B.Ed.",
      experience: "6 years",
      contactNumber: "+1 (555) 345-6789",
      email: "michael.b@example.com",
      joiningDate: "22/07/2017",
      subjects: "Biology",
      status: "Active",
    },
    {
      id: "TCH-1004",
      name: "Emily Davis",
      department: "Languages",
      qualification: "M.A., B.Ed.",
      experience: "7 years",
      contactNumber: "+1 (555) 456-7890",
      email: "emily.d@example.com",
      joiningDate: "05/09/2016",
      subjects: "English",
      status: "Active",
    },
    {
      id: "TCH-1005",
      name: "Robert Wilson",
      department: "Social Studies",
      qualification: "M.A., B.Ed.",
      experience: "5 years",
      contactNumber: "+1 (555) 567-8901",
      email: "robert.w@example.com",
      joiningDate: "18/08/2018",
      subjects: "History, Geography",
      status: "Inactive",
    },
  ]

  // Column definitions for the teachers data table
  const columns = [
    {
      header: "Teacher ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: (info: any) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      header: "Department",
      accessorKey: "department",
    },
    {
      header: "Qualification",
      accessorKey: "qualification",
    },
    {
      header: "Experience",
      accessorKey: "experience",
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
      header: "Subjects",
      accessorKey: "subjects",
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
        title="Teacher Management"
        description="Manage teachers, assign subjects, and track performance"
        actions={
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Teacher
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Teacher</DialogTitle>
                  <DialogDescription>Enter teacher details to create a new teacher profile</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="personal">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="contact">Contact Info</TabsTrigger>
                    <TabsTrigger value="professional">Professional Info</TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Smith" />
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
                        <Label htmlFor="contactNumber">Contact Number</Label>
                        <Input id="contactNumber" placeholder="+1 (555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john.smith@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" placeholder="123 Main St, Anytown" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input id="emergencyContact" placeholder="+1 (555) 987-6543" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                        <Input id="emergencyContactName" placeholder="Jane Smith" />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="professional" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
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
                      <div className="space-y-2">
                        <Label htmlFor="joiningDate">Joining Date</Label>
                        <Input id="joiningDate" type="date" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="qualification">Qualification</Label>
                        <Input id="qualification" placeholder="M.Sc., B.Ed." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience</Label>
                        <Input id="experience" placeholder="5 years" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subjects">Subjects</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subjects" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="geography">Geography</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </Tabs>
                <DialogFooter>
                  <Button type="submit">Save Teacher</Button>
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
          <Input placeholder="Search teachers..." />
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
          <CardTitle>Teachers</CardTitle>
          <CardDescription>Manage all teachers and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={teachers} />
        </CardContent>
      </Card>
    </div>
  )
}
