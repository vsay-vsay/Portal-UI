import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Clock, Download, ExternalLink } from 'lucide-react'

export interface PaymentCardProps {
  id: string
  title: string
  amount: number
  date: string
  status: "completed" | "pending" | "failed" | "processing"
  paymentMethod: string
  transactionId?: string
  receiptUrl?: string
  description?: string
}

export function PaymentCard({
  id,
  title,
  amount,
  date,
  status,
  paymentMethod,
  transactionId,
  receiptUrl,
  description,
}: PaymentCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{date}</CardDescription>
          </div>
          <Badge
            variant={
              status === "completed"
                ? "default"
                : status === "pending"
                ? "outline"
                : status === "processing"
                ? "secondary"
                : "destructive"
            }
            className="capitalize"
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-2xl font-bold">${amount.toFixed(2)}</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method:</span>
            <span>{paymentMethod}</span>
          </div>
          {transactionId && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction ID:</span>
              <span className="font-mono text-xs">{transactionId}</span>
            </div>
          )}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
        <div className="flex items-center text-sm">
          {status === "completed" ? (
            <Check className="mr-1 h-4 w-4 text-green-500" />
          ) : (
            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status === "completed" ? "Paid on " : "Due by "} {date}</span>
        </div>
        <div className="flex gap-2">
          {status === "completed" && receiptUrl && (
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Receipt
            </Button>
          )}
          {status === "pending" && (
            <Button size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              Pay Now
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
