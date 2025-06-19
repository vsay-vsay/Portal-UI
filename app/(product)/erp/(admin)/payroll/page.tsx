"use client"

import { Button } from "@/components/ui/button"
import { Plus, Search, Filter, Download, Calendar } from "lucide-react"
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
  title: 'Payroll Management',
  description: 'Manage salary structures, process payroll, and generate payslips for employees within the ERP system.',
  keywords: ['ERP', 'Payroll', 'Salary Structures', 'Payslips', 'Employee Management'],
  baseTitle: 'ERP System',
})


export default function PayrollPage() {
  // Sample data for salary structures
  const salaryStructures = [
    {
      id: "1",
      role: "Principal",
      basicSalary: "$8,000",
      allowances: "$2,000",
      deductions: "$1,000",
      netSalary: "$9,000",
      paymentFrequency: "Monthly",
      status: "Active",
    },
    {
      id: "2",
      role: "Vice Principal",
      basicSalary: "$7,000",
      allowances: "$1,500",
      deductions: "$900",
      netSalary: "$7,600",
      paymentFrequency: "Monthly",
      status: "Active",
    },
    {
      id: "3",
      role: "Senior Teacher",
      basicSalary: "$6,000",
      allowances: "$1,200",
      deductions: "$800",
      netSalary: "$6,400",
      paymentFrequency: "Monthly",
      status: "Active",
    },
    {
      id: "4",
      role: "Teacher",
      basicSalary: "$5,000",
      allowances: "$1,000",
      deductions: "$700",
      netSalary: "$5,300",
      paymentFrequency: "Monthly",
      status: "Active",
    },
    {
      id: "5",
      role: "Administrative Staff",
      basicSalary: "$4,000",
      allowances: "$800",
      deductions: "$600",
      netSalary: "$4,200",
      paymentFrequency: "Monthly",
      status: "Active",
    },
  ]

  // Sample data for payroll transactions
  const payrollTransactions = [
    {
      id: "1",
      employeeId: "EMP-1001",
      employeeName: "John Smith",
      role: "Principal",
      month: "May 2023",
      basicSalary: "$8,000",
      allowances: "$2,000",
      deductions: "$1,000",
      netSalary: "$9,000",
      paymentDate: "May 28, 2023",
      status: "Paid",
    },
    {
      id: "2",
      employeeId: "EMP-1002",
      employeeName: "Sarah Johnson",
      role: "Vice Principal",
      month: "May 2023",
      basicSalary: "$7,000",
      allowances: "$1,500",
      deductions: "$900",
      netSalary: "$7,600",
      paymentDate: "May 28, 2023",
      status: "Paid",
    },
    {
      id: "3",
      employeeId: "EMP-1003",
      employeeName: "Michael Brown",
      role: "Senior Teacher",
      month: "May 2023",
      basicSalary: "$6,000",
      allowances: "$1,200",
      deductions: "$800",
      netSalary: "$6,400",
      paymentDate: "May 28, 2023",
      status: "Paid",
    },
    {
      id: "4",
      employeeId: "EMP-1004",
      employeeName: "Emily Davis",
      role: "Teacher",
      month: "May 2023",
      basicSalary: "$5,000",
      allowances: "$1,000",
      deductions: "$700",
      netSalary: "$5,300",
      paymentDate: "May 28, 2023",
      status: "Paid",
    },
    {
      id: "5",
      employeeId: "EMP-1005",
      employeeName: "Robert Wilson",
      role: "Administrative Staff",
      month: "May 2023",
      basicSalary: "$4,000",
      allowances: "$800",
      deductions: "$600",
      netSalary: "$4,200",
      paymentDate: "May 28, 2023",
      status: "Paid",
    },
  ]

  // Column definitions for the salary structures data table
  const salaryStructuresColumns = [
    {
      header: "Role",
      accessorKey: "role",
      cell: (info: any) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      header: "Basic Salary",
      accessorKey: "basicSalary",
    },
    {
      header: "Allowances",
      accessorKey: "allowances",
    },
    {
      header: "Deductions",
      accessorKey: "deductions",
    },
    {
      header: "Net Salary",
      accessorKey: "netSalary",
    },
    {
      header: "Payment Frequency",
      accessorKey: "paymentFrequency",
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

  // Column definitions for the payroll transactions data table
  const payrollTransactionsColumns = [
    {
      header: "Employee ID",
      accessorKey: "employeeId",
    },
    {
      header: "Employee Name",
      accessorKey: "employeeName",
      cell: (info: any) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Month",
      accessorKey: "month",
    },
    {
      header: "Basic Salary",
      accessorKey: "basicSalary",
    },
    {
      header: "Allowances",
      accessorKey: "allowances",
    },
    {
      header: "Deductions",
      accessorKey: "deductions",
    },
    {
      header: "Net Salary",
      accessorKey: "netSalary",
    },
    {
      header: "Payment Date",
      accessorKey: "paymentDate",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => {
        const status = info.getValue()
        let statusClass = "bg-gray-100 text-gray-800"

        if (status === "Paid") {
          statusClass = "bg-green-100 text-green-800"
        } else if (status === "Pending") {
          statusClass = "bg-yellow-100 text-yellow-800"
        }

        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>{status}</span>
      },
    },
    {
      header: "Actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            View
          </Button>
          <Button variant="ghost" size="sm">
            Payslip
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Payroll Management"
        description="Manage salary structures, process payroll, and generate payslips"
        actions={
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Salary Structure
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Salary Structure</DialogTitle>
                  <DialogDescription>Create a new salary structure for a role</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Input id="role" placeholder="Assistant Teacher" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="basicSalary" className="text-right">
                      Basic Salary
                    </Label>
                    <Input id="basicSalary" placeholder="$4,500" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="allowances" className="text-right">
                      Allowances
                    </Label>
                    <Input id="allowances" placeholder="$900" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deductions" className="text-right">
                      Deductions
                    </Label>
                    <Input id="deductions" placeholder="$650" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="paymentFrequency" className="text-right">
                      Payment Frequency
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
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
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Salary Structure</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Process Payroll
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Process Monthly Payroll</DialogTitle>
                  <DialogDescription>Generate payroll for all employees for a specific month</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="month" className="text-right">
                      Month
                    </Label>
                    <div className="col-span-3 flex items-center">
                      <Input id="month" type="month" />
                      <Calendar className="ml-2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="department" className="text-right">
                      Department
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="teaching">Teaching Staff</SelectItem>
                        <SelectItem value="administrative">Administrative Staff</SelectItem>
                        <SelectItem value="support">Support Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="paymentDate" className="text-right">
                      Payment Date
                    </Label>
                    <div className="col-span-3 flex items-center">
                      <Input id="paymentDate" type="date" />
                      <Calendar className="ml-2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Process Payroll</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <Tabs defaultValue="salaryStructures">
        <TabsList>
          <TabsTrigger value="salaryStructures">Salary Structures</TabsTrigger>
          <TabsTrigger value="payrollTransactions">Payroll Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="salaryStructures" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-gray-400" />
              <Input placeholder="Search salary structures..." />
            </div>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="teaching">Teaching Staff</SelectItem>
                  <SelectItem value="administrative">Administrative Staff</SelectItem>
                  <SelectItem value="support">Support Staff</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Salary Structures</CardTitle>
              <CardDescription>Manage all salary structures for different roles</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={salaryStructuresColumns} data={salaryStructures} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payrollTransactions" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-gray-400" />
              <Input placeholder="Search payroll transactions..." />
            </div>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  <SelectItem value="may2023">May 2023</SelectItem>
                  <SelectItem value="april2023">April 2023</SelectItem>
                  <SelectItem value="march2023">March 2023</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payroll Transactions</CardTitle>
              <CardDescription>View all payroll transactions and generate payslips</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={payrollTransactionsColumns} data={payrollTransactions} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
