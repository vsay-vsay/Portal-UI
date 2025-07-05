
"use client"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard, DollarSign, Download, FileText } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { Progress } from "@/components/ui/progress"
import type { ColumnDef } from "@tanstack/react-table"

interface FeePayment {
  id: string
  description: string
  dueDate: string
  amount: number
  status: "paid" | "pending" | "overdue" | "partial"
  paymentDate?: string
  receiptId?: string
}

const columns: ColumnDef<FeePayment>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }:{
      row:any
    }) => {
      return <span>${row.getValue("amount")}</span>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }:{
      row:any
    }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "paid"
              ? "default"
              : status === "pending"
                ? "outline"
                : status === "partial"
                  ? "secondary"
                  : "destructive"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
  },
  {
    id: "actions",
    cell: ({ row }:{
      row:any
    }) => {
      const status = row.getValue("status") as string
      const receiptId = row.original.receiptId

      return (
        <div className="flex gap-2">
          {status === "paid" || status === "partial" ? (
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download Receipt</span>
            </Button>
          ) : (
            <Button variant="default" size="sm" className="h-8">
              Pay Now
            </Button>
          )}
        </div>
      )
    },
  },
]

const data: FeePayment[] = [
  {
    id: "fee1",
    description: "Tuition Fee (Semester 1)",
    dueDate: "Sep 15, 2022",
    amount: 4500,
    status: "paid",
    paymentDate: "Sep 10, 2022",
    receiptId: "REC-2022-001",
  },
  {
    id: "fee2",
    description: "Library Fee",
    dueDate: "Sep 20, 2022",
    amount: 100,
    status: "paid",
    paymentDate: "Sep 18, 2022",
    receiptId: "REC-2022-002",
  },
  {
    id: "fee3",
    description: "Laboratory Fee",
    dueDate: "Sep 25, 2022",
    amount: 250,
    status: "paid",
    paymentDate: "Sep 22, 2022",
    receiptId: "REC-2022-003",
  },
  {
    id: "fee4",
    description: "Tuition Fee (Semester 2)",
    dueDate: "Feb 15, 2023",
    amount: 4500,
    status: "paid",
    paymentDate: "Feb 12, 2023",
    receiptId: "REC-2023-001",
  },
  {
    id: "fee5",
    description: "Examination Fee",
    dueDate: "Feb 28, 2023",
    amount: 200,
    status: "paid",
    paymentDate: "Feb 25, 2023",
    receiptId: "REC-2023-002",
  },
  {
    id: "fee6",
    description: "Tuition Fee (Semester 3)",
    dueDate: "Jun 15, 2023",
    amount: 4500,
    status: "pending",
    paymentDate: undefined,
    receiptId: undefined,
  },
  {
    id: "fee7",
    description: "Technology Fee",
    dueDate: "Jun 10, 2023",
    amount: 300,
    status: "overdue",
    paymentDate: undefined,
    receiptId: undefined,
  },
]

export default function StudentFeesPage() {
  // Calculate fee statistics
  const totalFees = data.reduce((sum, fee) => sum + fee.amount, 0)
  const paidFees = data.filter((fee) => fee.status === "paid").reduce((sum, fee) => sum + fee.amount, 0)
  const pendingFees = data
    .filter((fee) => fee.status === "pending" || fee.status === "overdue")
    .reduce((sum, fee) => sum + fee.amount, 0)
  const paymentProgress = Math.round((paidFees / totalFees) * 100)

  return (
    <div className="container space-y-6 p-4 md:p-8">
      <PageHeader title="Fee Details" description="View and manage your fee payments" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Academic Year 2022-2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Fees</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paidFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total amount paid</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Due amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Progress</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentProgress}%</div>
            <Progress value={paymentProgress} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">Overall payment status</p>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Fee Payments</CardTitle>
          <CardDescription>View all your fee payments and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter className="bg-muted/50 p-4">
          <div className="flex justify-between w-full items-center">
            <div>
              <p className="text-sm font-medium">Upcoming Payment:</p>
              <p className="text-sm text-muted-foreground">Tuition Fee (Semester 3) - $4,500.00 due on Jun 15, 2023</p>
            </div>
            <Button>
              Make Payment
              <CreditCard className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
