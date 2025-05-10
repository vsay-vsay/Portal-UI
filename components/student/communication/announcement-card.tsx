import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, ExternalLink, Eye } from 'lucide-react'

export interface AnnouncementCardProps {
  id: string
  title: string
  content: string
  date: string
  author: {
    name: string
    role: string
    avatar?: string
  }
  category: string
  isImportant?: boolean
  isNew?: boolean
  hasAttachment?: boolean
  attachmentUrl?: string
  viewCount?: number
}

export function AnnouncementCard({
  id,
  title,
  content,
  date,
  author,
  category,
  isImportant = false,
  isNew = false,
  hasAttachment = false,
  attachmentUrl,
  viewCount,
}: AnnouncementCardProps) {
  return (
    <Card className={isImportant ? "border-primary" : ""}>
      <CardHeader className="p-4 pb-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              {isImportant && <Badge variant="destructive">Important</Badge>}
              {isNew && <Badge variant="default">New</Badge>}
              <Badge variant="outline" className="capitalize">
                {category}
              </Badge>
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{date}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{content}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/50 p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">
            {author.name} <span className="text-muted-foreground">({author.role})</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          {viewCount !== undefined && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Eye className="mr-1 h-4 w-4" />
              <span>{viewCount}</span>
            </div>
          )}
          {hasAttachment && attachmentUrl && (
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              Attachment
            </Button>
          )}
          <Button size="sm">View Details</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
