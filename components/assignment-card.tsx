import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText } from "lucide-react"
import Link from "next/link"

interface AssignmentCardProps {
  id: string
  title: string
  subject: string
  description: string
  dueDate: string
  timeRemaining: string
  status: "pending" | "submitted" | "graded" | "overdue"
  score?: number
  maxScore?: number
}

export function AssignmentCard({
  id,
  title,
  subject,
  description,
  dueDate,
  timeRemaining,
  status,
  score,
  maxScore,
}: AssignmentCardProps) {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <Badge
            variant={
              status === "pending"
                ? "outline"
                : status === "submitted"
                  ? "secondary"
                  : status === "graded"
                    ? "default"
                    : "destructive"
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          {status === "graded" && score !== undefined && maxScore !== undefined && (
            <span className="text-sm font-medium">
              Score: {score}/{maxScore}
            </span>
          )}
        </div>
        <CardTitle className="mt-2 line-clamp-1">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{subject}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="mb-4 line-clamp-2 text-sm">{description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Due: {dueDate}</span>
          </div>
          {status === "pending" && (
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{timeRemaining}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" variant={status === "pending" ? "default" : "secondary"}>
          <Link href={`/erp/student-assignments/${id}`}>
            {status === "pending" ? "Complete Assignment" : status === "graded" ? "View Feedback" : "View Details"}
            <FileText className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
