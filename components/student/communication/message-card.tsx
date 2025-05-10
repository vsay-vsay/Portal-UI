import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Reply } from 'lucide-react'

export interface MessageCardProps {
  id: string
  sender: {
    name: string
    role: string
    avatar?: string
  }
  subject: string
  content: string
  timestamp: string
  isRead: boolean
  hasAttachments: boolean
  attachments?: Array<{
    name: string
    size: string
    type: string
  }>
}

export function MessageCard({
  id,
  sender,
  subject,
  content,
  timestamp,
  isRead,
  hasAttachments,
  attachments,
}: MessageCardProps) {
  return (
    <Card className={isRead ? "" : "border-primary bg-primary/5"}>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={sender.avatar || "/placeholder.svg"} alt={sender.name} />
              <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{sender.name}</span>
                <Badge variant="outline" className="font-normal">
                  {sender.role}
                </Badge>
                {!isRead && <Badge variant="default">New</Badge>}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                <span>{timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="mb-2 font-semibold">{subject}</h3>
        <p className="text-sm text-muted-foreground">{content}</p>
        
        {hasAttachments && attachments && attachments.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium">Attachments:</p>
            <div className="mt-2 space-y-2">
              {attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between rounded-md border p-2 text-sm">
                  <div className="flex items-center">
                    <span className="font-medium">{attachment.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">({attachment.size})</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end border-t bg-muted/50 p-4">
        <Button>
          <Reply className="mr-2 h-4 w-4" />
          Reply
        </Button>
      </CardFooter>
    </Card>
  )
}
