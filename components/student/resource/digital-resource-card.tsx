import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Download, ExternalLink, FileText, Video } from 'lucide-react'

export interface DigitalResourceCardProps {
  id: string
  title: string
  type: "video" | "document" | "interactive" | "audio" | "course"
  subject: string
  author: string
  thumbnail?: string
  description: string
  duration?: string
  fileSize?: string
  downloadable: boolean
  url: string
  isNew?: boolean
  isPremium?: boolean
}

export function DigitalResourceCard({
  id,
  title,
  type,
  subject,
  author,
  thumbnail,
  description,
  duration,
  fileSize,
  downloadable,
  url,
  isNew = false,
  isPremium = false,
}: DigitalResourceCardProps) {
  const renderIcon = () => {
    switch (type) {
      case "video":
        return <Video className="h-8 w-8 text-red-500" />
      case "document":
        return <FileText className="h-8 w-8 text-blue-500" />
      case "interactive":
        return <ExternalLink className="h-8 w-8 text-green-500" />
      case "audio":
        return <FileText className="h-8 w-8 text-purple-500" />
      case "course":
        return <BookOpen className="h-8 w-8 text-amber-500" />
      default:
        return <FileText className="h-8 w-8" />
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div
          className="h-40 bg-cover bg-center"
          style={{
            backgroundImage: thumbnail
              ? `url(${thumbnail})`
              : "linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)/0.8))",
          }}
        />
        {isNew && (
          <Badge className="absolute right-2 top-2" variant="default">
            New
          </Badge>
        )}
        {isPremium && (
          <Badge className="absolute left-2 top-2" variant="secondary">
            Premium
          </Badge>
        )}
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="capitalize">
            {type}
          </Badge>
          <span className="text-sm text-muted-foreground">{subject}</span>
        </div>
        <CardTitle className="line-clamp-1 mt-2 text-base">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">by {author}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm">{description}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {duration && (
            <div className="flex items-center">
              <span className="text-muted-foreground">Duration: {duration}</span>
            </div>
          )}
          {fileSize && (
            <div className="flex items-center">
              <span className="text-muted-foreground">Size: {fileSize}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 border-t bg-muted/50 p-4">
        <Button asChild className="flex-1">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {type === "video" || type === "audio" ? "Play" : type === "interactive" || type === "course" ? "Open" : "View"}
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
        {downloadable && (
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
