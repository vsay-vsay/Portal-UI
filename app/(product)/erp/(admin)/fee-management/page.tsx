
"use client";
import { Button } from "@/components/ui/button"
import { Plus, Search, Filter, Download, Upload } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"

import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";




export const metadata: Metadata = generatePageMetadata({
  title: 'Fee Management',
  description: 'Manage fee structures, collect payments, and generate reports for student fees within the ERP system.',
  keywords: ['ERP', 'Fee Management', 'Student Fees', 'Payments', 'Financial Management'],
  baseTitle: 'ERP System',
})


export default function FeeManagementPage() {
  // Sample data for fee structures
  const feeStructures = [
    {
      id: "1",
      name: "Regular Tuition Fee",
      academicYear: "2023-2024",
      grade: "All",
      amount: "$5,000",
      frequency: "Annual",
      dueDate: "August 15, 2023",
      status: "Active",
    },
    {
      id: "2",
      name: "Transportation Fee",
      academicYear: "2023-2024",
      grade: "All",
      amount: "$800",
      frequency: "Annual",
      dueDate: "August 15, 2023",
      status: "Active",
    },
    {
      id: "3",
      name: "Laboratory Fee",
      academicYear: "2023-2024",
      grade: "9-12",
      amount: "$300",
      frequency: "Annual",
      dueDate: "August 15, 2023",
      status: "Active",
    },
    {
      id: "4",
      name: "Sports Fee",
      academicYear: "2023-2024",
      grade: "All",
      amount: "$200",
      frequency: "Annual",
      dueDate: "August 15, 2023",
      status: "Active",
    },
    {
      id: "5",
      name: "Library Fee",
      academicYear: "2023-2024",
      grade: "All",
      amount: "$100",
      frequency: "Annual",
      dueDate: "August 15, 2023",
      status: "Active",
    },
  ]

  // Sample data for fee transactions
  const feeTransactions = [
    {
      id: "1",
      studentId: "ST-1001",
      studentName: "Alice Johnson",
      grade: "10A",
      feeType: "Tuition Fee",
      amount: "$5,000",
      paidAmount: "$5,000",
      balance: "$0",
      status: "Paid",
      paymentDate: "August 10, 2023",
      paymentMethod: "Credit Card",
    },
    {
      id: "2",
      studentId: "ST-1002",
      studentName: "Bob Smith",
      grade: "9B",
      feeType: "Tuition Fee",
      amount: "$5,000",
      paidAmount: "$2,500",
      balance: "$2,500",
      status: "Partial",
      paymentDate: "August 12, 2023",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "3",
      studentId: "ST-1003",
      studentName: "Charlie Brown",
      grade: "11A",
      feeType: "Tuition Fee",
      amount: "$5,000",
      paidAmount: "$0",
      balance: "$5,000",
      status: "Unpaid",
      paymentDate: "-",
      paymentMethod: "-",
    },
    {
      id: "4",
      studentId: "ST-1001",
      studentName: "Alice Johnson",
      grade: "10A",
      feeType: "Transportation Fee",
      amount: "$800",
      paidAmount: "$800",
      balance: "$0",
      status: "Paid",
      paymentDate: "August 10, 2023",
      paymentMethod: "Credit Card",
    },
    {
      id: "5",
      studentId: "ST-1002",
      studentName: "Bob Smith",
      grade: "9B",
      feeType: "Laboratory Fee",
      amount: "$300",
      paidAmount: "$300",
      balance: "$0",
      status: "Paid",
      paymentDate: "August 12, 2023",
      paymentMethod: "Bank Transfer",
    },
  ]

  // Column definitions for the fee structures data table
  const feeStructuresColumns = [
    {
      header: "Fee Name",
      accessorKey: "name",
      cell: (info: any) => <div className="font-medium">{info.getValue()}</div>,
    },
    {
      header: "Academic Year",
      accessorKey: "academicYear",
    },
    {
      header: "Grade",
      accessorKey: "grade",
    },
    {
      header: "Amount",
      accessorKey: "amount",
    },
    {
      header: "Frequency",
      accessorKey: "frequency",
    },
    {
      header: "Due Date",
      accessorKey: "dueDate",
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

  // Column definitions for the fee transactions data table
  const feeTransactionsColumns = [
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
      header: "Fee Type",
      accessorKey: "feeType",
    },
    {
      header: "Amount",
      accessorKey: "amount",
    },
    {
      header: "Paid",
      accessorKey: "paidAmount",
    },
    {
      header: "Balance",
      accessorKey: "balance",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info: any) => {
        const status = info.getValue()
        let statusClass = "bg-gray-100 text-gray-800"

        if (status === "Paid") {
          statusClass = "bg-green-100 text-green-800"
        } else if (status === "Partial") {
          statusClass = "bg-yellow-100 text-yellow-800"
        } else if (status === "Unpaid") {
          statusClass = "bg-red-100 text-red-800"
        }

        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>{status}</span>
      },
    },
    {
      header: "Payment Date",
      accessorKey: "paymentDate",
    },
    {
      header: "Actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            View
          </Button>
          <Button variant="ghost" size="sm">
            Receipt
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Fee Management"
        description="Manage fee structures, collect payments, and generate reports"
        actions={
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Fee Structure
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Fee Structure</DialogTitle>
                  <DialogDescription>Create a new fee structure for the academic year</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="feeName" className="text-right">
                      Fee Name
                    </Label>
                    <Input id="feeName" placeholder="Technology Fee" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="academicYear" className="text-right">
                      Academic Year
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select academic year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023-2024">2023-2024</SelectItem>
                        <SelectItem value="2024-2025">2024-2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="grade" className="text-right">
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
                    <Label htmlFor="amount" className="text-right">
                      Amount
                    </Label>
                    <Input id="amount" placeholder="$500" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="frequency" className="text-right">
                      Frequency
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">Annual</SelectItem>
                        <SelectItem value="semester">Per Semester</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="onetime">One-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dueDate" className="text-right">
                      Due Date
                    </Label>
                    <Input id="dueDate" type="date" className="col-span-3" />
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="col-start-2 col-span-3 flex items-center space-x-2">
                      <Checkbox id="mandatory" />
                      <Label htmlFor="mandatory">Mandatory for all students</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Fee Structure</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Record Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Record Fee Payment</DialogTitle>
                  <DialogDescription>Record a new fee payment for a student</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="studentId" className="text-right">
                      Student ID
                    </Label>
                    <Input id="studentId" placeholder="ST-1001" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="studentName" className="text-right">
                      Student Name
                    </Label>
                    <Input id="studentName" placeholder="John Doe" className="col-span-3" readOnly />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="feeType" className="text-right">
                      Fee Type
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select fee type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tuition">Tuition Fee</SelectItem>
                        <SelectItem value="transportation">Transportation Fee</SelectItem>
                        <SelectItem value="laboratory">Laboratory Fee</SelectItem>
                        <SelectItem value="sports">Sports Fee</SelectItem>
                        <SelectItem value="library">Library Fee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="totalAmount" className="text-right">
                      Total Amount
                    </Label>
                    <Input id="totalAmount" placeholder="$5,000" className="col-span-3" readOnly />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="paidAmount" className="text-right">
                      Amount Paid
                    </Label>
                    <Input id="paidAmount" placeholder="$2,500" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="paymentMethod" className="text-right">
                      Payment Method
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="creditCard">Credit Card</SelectItem>
                        <SelectItem value="debitCard">Debit Card</SelectItem>
                        <SelectItem value="bankTransfer">Bank Transfer</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="paymentDate" className="text-right">
                      Payment Date
                    </Label>
                    <Input id="paymentDate" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="transactionId" className="text-right">
                      Transaction ID
                    </Label>
                    <Input id="transactionId" placeholder="TXN-12345" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Record Payment</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <Tabs defaultValue="feeStructures">
        <TabsList>
          <TabsTrigger value="feeStructures">Fee Structures</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="feeStructures" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-gray-400" />
              <Input placeholder="Search fee structures..." />
            </div>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Academic Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                  <SelectItem value="2022-2023">2022-2023</SelectItem>
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
              <CardTitle>Fee Structures</CardTitle>
              <CardDescription>Manage all fee structures for different academic years</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={feeStructuresColumns} data={feeStructures} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-gray-400" />
              <Input placeholder="Search transactions..." />
            </div>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fee Transactions</CardTitle>
              <CardDescription>View all fee payments and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={feeTransactionsColumns} data={feeTransactions} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
