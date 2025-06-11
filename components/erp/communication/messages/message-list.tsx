"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus } from 'lucide-react'
import { useEffect, useState } from "react"

type MessagePreview = {
  id: string
  sender: {
    name: string
    avatar: string
  }
  lastMessage: string
  timestamp: string
  unread: boolean
  online: boolean
}

export function MessageList() {
  const [messages, setMessages] = useState<MessagePreview[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Simulate API call to fetch messages
    const fetchMessages = async () => {
      try {
        setLoading(true)
        // In a real app, this would be an API call
        const mockMessages: MessagePreview[] = [
          {
            id: "1",
            sender: {
              name: "John Doe",
              avatar: "/avatars/user.jpg"
            },
            lastMessage: "Hi there! Just checking in on the project status.",
            timestamp: "10:30 AM",
            unread: true,
            online: true
          },
          {
            id: "2",
            sender: {
              name: "Jane Smith",
              avatar: "/avatars/user.jpg"
            },
            lastMessage: "The meeting has been rescheduled to tomorrow at 2 PM.",
            timestamp: "Yesterday",
            unread: false,
            online: false
          },
          {
            id: "3",
            sender: {
              name: "Alex Johnson",
              avatar: "/avatars/user.jpg"
            },
            lastMessage: "I've uploaded the files you requested to the shared folder.",
            timestamp: "Yesterday",
            unread: false,
            online: true
          },
          {
            id: "4",
            sender: {
              name: "Sarah Williams",
              avatar: "/avatars/user.jpg"
            },
            lastMessage: "Can we discuss the budget for the new project?",
            timestamp: "2 days ago",
            unread: false,
            online: false
          },
          {
            id: "5",
            sender: {
              name: "Michael Brown",
              avatar: "/avatars/user.jpg"
            },
            lastMessage: "The client approved our proposal! We can start next week.",
            timestamp: "3 days ago",
            unread: false,
            online: true
          },
          {
            id: "6",
            sender: {
              name: "Emily Davis",
              avatar: "/avatars/user.jpg"
            },
            lastMessage: "I need your feedback on the latest design mockups.",
            timestamp: "4 days ago",
            unread: false,
            online: false
          },
          {
            id: "7",
            sender: {
              name: "David Wilson",
              avatar: "/avatars/user.jpg"
            },
            lastMessage: "Let's schedule a call to discuss the next steps.",
            timestamp: "5 days ago",
            unread: false,
            online: false
          }
        ]
        
        setMessages(mockMessages)
      } catch (error) {
        console.error("Error fetching messages:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (activeTab === "all") return matchesSearch
    if (activeTab === "unread") return matchesSearch && message.unread
    if (activeTab === "online") return matchesSearch && message.online
    
    return matchesSearch
  })

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="icon" variant="ghost">
            <Plus className="h-4 w-4" />
            <span className="sr-only">New message</span>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="p-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="online">Online</TabsTrigger>
        </TabsList>
      </Tabs>
      <ScrollArea className="flex-1">
        <div className="p-4 pt-0 space-y-2">
          {loading ? (
            <div className="flex justify-center p-4">
              <p className="text-sm text-muted-foreground">Loading messages...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="flex justify-center p-4">
              <p className="text-sm text-muted-foreground">No messages found</p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div 
                key={message.id} 
                className={`flex items-start space-x-3 rounded-md p-2 transition-all hover:bg-muted/50 cursor-pointer ${
                  message.unread ? "bg-muted/50" : ""
                }`}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={message.sender.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {message.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                  )}
                </div>
                <div className="flex-1 space-y-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium leading-none ${message.unread ? "font-semibold" : ""}`}>
                      {message.sender.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{message.lastMessage}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
