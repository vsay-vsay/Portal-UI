"use client";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Calendar, Check, X } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useRequestHook from "@/hooks/requestHook";
import api from "@/utils/api";
import { useEffect } from "react";

export default function AttendancePage() {
  const [fetchAttendance, res, isLoading, error, reset, status] =
    useRequestHook(api.ATTENDANCE.ALL, "GET", null);

  useEffect(() => {
    fetchAttendance();
  }, []);
  // Sample data for student attendance
  const studentAttendance = [
    {
      id: "1",
      studentId: "ST-1001",
      studentName: "Alice Johnson",
      grade: "10A",
      date: "2023-05-28",
      status: "Present",
      checkedBy: "John Smith",
      remarks: "",
    },
    {
      id: "2",
      studentId: "ST-1002",
      studentName: "Bob Smith",
      grade: "9B",
      date: "2023-05-28",
      status: "Present",
      checkedBy: "Sarah Johnson",
      remarks: "",
    },
    {
      id: "3",
      studentId: "ST-1003",
      studentName: "Charlie Brown",
      grade: "11A",
      date: "2023-05-28",
      status: "Absent",
      checkedBy: "Michael Brown",
      remarks: "Sick leave",
    },
    {
      id: "4",
      studentId: "ST-1004",
      studentName: "Diana Miller",
      grade: "10B",
      date: "2023-05-28",
      status: "Present",
      checkedBy: "Emily Davis",
      remarks: "",
    },
    {
      id: "5",
      studentId: "ST-1005",
      studentName: "Edward Wilson",
      grade: "12A",
      date: "2023-05-28",
      status: "Late",
      checkedBy: "Robert Wilson",
      remarks: "15 minutes late",
    },
  ];

  // Sample data for teacher attendance
  const teacherAttendance = [
    {
      id: "1",
      teacherId: "TCH-1001",
      teacherName: "John Smith",
      department: "Mathematics",
      date: "2023-05-28",
      status: "Present",
      checkedBy: "Admin",
      remarks: "",
    },
    {
      id: "2",
      teacherId: "TCH-1002",
      teacherName: "Sarah Johnson",
      department: "Science",
      date: "2023-05-28",
      status: "Present",
      checkedBy: "Admin",
      remarks: "",
    },
    {
      id: "3",
      teacherId: "TCH-1003",
      teacherName: "Michael Brown",
      department: "Science",
      date: "2023-05-28",
      status: "Absent",
      checkedBy: "Admin",
      remarks: "Sick leave",
    },
    {
      id: "4",
      teacherId: "TCH-1004",
      teacherName: "Emily Davis",
      department: "Languages",
      date: "2023-05-28",
      status: "Present",
      checkedBy: "Admin",
      remarks: "",
    },
    {
      id: "5",
      teacherId: "TCH-1005",
      teacherName: "Robert Wilson",
      department: "Social Studies",
      date: "2023-05-28",
      status: "Late",
      checkedBy: "Admin",
      remarks: "20 minutes late",
    },
  ];

  // Column definitions for the student attendance data table
  const studentAttendanceColumns = [
    {
      header: "Student ID",
      accessorKey: "studentId",
    },
    {
      header: "Student Name",
      accessorKey: "studentName",
      cell: (info: any) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      header: "Grade",
      accessorKey: "grade",
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => {
        const status = info.getValue();
        let statusClass = "bg-gray-100 text-gray-800";
        let icon = null;

        if (status === "Present") {
          statusClass = "bg-green-100 text-green-800";
          icon = <Check className="mr-1 h-3 w-3" />;
        } else if (status === "Absent") {
          statusClass = "bg-red-100 text-red-800";
          icon = <X className="mr-1 h-3 w-3" />;
        } else if (status === "Late") {
          statusClass = "bg-yellow-100 text-yellow-800";
          icon = <Calendar className="mr-1 h-3 w-3" />;
        }

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${statusClass}`}
          >
            {icon}
            {status}
          </span>
        );
      },
    },
    {
      header: "Checked By",
      accessorKey: "checkedBy",
    },
    {
      header: "Remarks",
      accessorKey: "remarks",
    },
    {
      header: "Actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </div>
      ),
    },
  ];

  // Column definitions for the teacher attendance data table
  const teacherAttendanceColumns = [
    {
      header: "Teacher ID",
      accessorKey: "teacherId",
    },
    {
      header: "Teacher Name",
      accessorKey: "teacherName",
      cell: (info: any) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      header: "Department",
      accessorKey: "department",
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => {
        const status = info.getValue();
        let statusClass = "bg-gray-100 text-gray-800";
        let icon = null;

        if (status === "Present") {
          statusClass = "bg-green-100 text-green-800";
          icon = <Check className="mr-1 h-3 w-3" />;
        } else if (status === "Absent") {
          statusClass = "bg-red-100 text-red-800";
          icon = <X className="mr-1 h-3 w-3" />;
        } else if (status === "Late") {
          statusClass = "bg-yellow-100 text-yellow-800";
          icon = <Calendar className="mr-1 h-3 w-3" />;
        }

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit ${statusClass}`}
          >
            {icon}
            {status}
          </span>
        );
      },
    },
    {
      header: "Checked By",
      accessorKey: "checkedBy",
    },
    {
      header: "Remarks",
      accessorKey: "remarks",
    },
    {
      header: "Actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Attendance Management"
        description="Track and manage attendance for students and teachers"
        actions={
          <div className="flex items-center gap-2">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Take Attendance
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        }
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="date">Date:</Label>
            <Input id="date" type="date" className="w-auto" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students">Student Attendance</TabsTrigger>
          <TabsTrigger value="teachers">Teacher Attendance</TabsTrigger>
        </TabsList>
        <TabsContent value="students" className="space-y-4">
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
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Attendance</CardTitle>
              <CardDescription>
                View and manage student attendance records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={studentAttendanceColumns}
                data={studentAttendance}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="teachers" className="space-y-4">
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
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Teacher Attendance</CardTitle>
              <CardDescription>
                View and manage teacher attendance records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={teacherAttendanceColumns}
                data={teacherAttendance}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
