import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, FileText, Video } from 'lucide-react'
import Link from "next/link"

interface ResourceCardProps {
  id: string
  title: string
  subject: string
  type: "document" | "video" | "link" | "book"
  description: string
  size?: string
  downloadable?: boolean
  url: string
  isNew?: boolean
}

export function ResourceCard({
  id,
  title,
  subject,
  type,
  description,
  size,
  downloadable = false,
  url,
  isNew = false,
}: ResourceCardProps) {
  const renderIcon = () => {
    switch (type) {
      case "document":
        return <FileText className="h-8 w-8 text-blue-500" />
      case "video":
        return <Video className="h-8 w-8 text-red-500" />
      case "link":
        return <ExternalLink className="h-8 w-8 text-green-500" />
      case "book":
        return <FileText className="h-8 w-8 text-purple-500" />
      default:
        return <FileText className="h-8 w-8" />
    }
  }

  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {renderIcon()}
            <div>
              <CardTitle className="line-clamp-1 text-base">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{subject}</p>
            </div>
          </div>
          {isNew && (
            <Badge variant="default" className="ml-auto">
              New
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="mb-2 line-clamp-2 text-sm">{description}</p>
        {size && <p className="text-xs text-muted-foreground">Size: {size}</p>}
      </CardContent>
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button asChild variant="secondary" className="flex-1">
          <Link href={`/erp/learning-materials/${id}`}>
            View
          </Link>
        </Button>
        {downloadable && (
          <Button asChild variant="outline" size="icon">
            <a href={url} download>
              <Download className="h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
