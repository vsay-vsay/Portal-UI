import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, GraduationCap } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

export interface ScholarshipCardProps {
  id: string
  title: string
  provider: string
  amount: number
  deadline?: string
  status: "active" | "applied" | "awarded" | "expired" | "rejected"
  description: string
  eligibility?: string[]
  progress?: number
  applicationUrl?: string
}

export function ScholarshipCard({
  id,
  title,
  provider,
  amount,
  deadline,
  status,
  description,
  eligibility,
  progress,
  applicationUrl,
}: ScholarshipCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{provider}</CardDescription>
          </div>
          <Badge
            variant={
              status === "awarded"
                ? "default"
                : status === "active"
                ? "outline"
                : status === "applied"
                ? "secondary"
                : status === "rejected"
                ? "destructive"
                : "outline"
            }
            className="capitalize"
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-2xl font-bold">${amount.toFixed(2)}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
        
        {deadline && status === "active" && (
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Application Deadline: {deadline}</span>
          </div>
        )}
        
        {eligibility && status === "active" && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Eligibility Criteria:</p>
            <ul className="ml-5 list-disc text-sm text-muted-foreground">
              {eligibility.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {progress !== undefined && status === "applied" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Application Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {status === "active" && applicationUrl && (
          <Button>
            <ExternalLink className="mr-2 h-4 w-4" />
            Apply Now
          </Button>
        )}
        {status === "applied" && (
          <Button variant="outline">
            <GraduationCap className="mr-2 h-4 w-4" />
            Check Status
          </Button>
        )}
        {status === "awarded" && (
          <Button variant="outline">
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
