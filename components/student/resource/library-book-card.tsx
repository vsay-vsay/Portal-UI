import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Clock, Download, ExternalLink } from 'lucide-react'

export interface LibraryBookCardProps {
  id: string
  title: string
  author: string
  coverImage?: string
  isbn: string
  category: string
  status: "available" | "borrowed" | "reserved" | "digital"
  dueDate?: string
  format: "physical" | "ebook" | "audiobook"
  description: string
  downloadUrl?: string
  readUrl?: string
}

export function LibraryBookCard({
  id,
  title,
  author,
  coverImage,
  isbn,
  category,
  status,
  dueDate,
  format,
  description,
  downloadUrl,
  readUrl,
}: LibraryBookCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex h-full flex-col">
        <div className="flex flex-col md:flex-row">
          <div
            className="h-48 w-full bg-cover bg-center md:h-auto md:w-1/3"
            style={{
              backgroundImage: coverImage
                ? `url(${coverImage})`
                : "linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)/0.8))",
            }}
          />
          <div className="flex flex-1 flex-col">
            <CardHeader className="p-4 pb-2">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <CardTitle className="line-clamp-1">{title}</CardTitle>
                  <p className="text-sm text-muted-foreground">by {author}</p>
                </div>
                <Badge
                  variant={
                    status === "available"
                      ? "default"
                      : status === "borrowed"
                      ? "secondary"
                      : status === "reserved"
                      ? "outline"
                      : "default"
                  }
                  className="capitalize"
                >
                  {status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-2 p-4 pt-0">
              <p className="line-clamp-2 text-sm">{description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>ISBN: {isbn}</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="font-normal">
                    {category}
                  </Badge>
                </div>
                {status === "borrowed" && dueDate && (
                  <div className="flex items-center col-span-2">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Due: {dueDate}</span>
                  </div>
                )}
                <div className="flex items-center col-span-2">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Format: {format.charAt(0).toUpperCase() + format.slice(1)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 border-t bg-muted/50 p-4">
              {status === "available" && format === "physical" && (
                <Button className="flex-1">Reserve</Button>
              )}
              {status === "borrowed" && format === "physical" && (
                <Button variant="outline" className="flex-1">Renew</Button>
              )}
              {format === "ebook" && readUrl && (
                <Button className="flex-1">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Online
                </Button>
              )}
              {format === "audiobook" && readUrl && (
                <Button className="flex-1">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Listen
                </Button>
              )}
              {(format === "ebook" || format === "audiobook") && downloadUrl && (
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </div>
        </div>
      </div>
    </Card>
  )
}
