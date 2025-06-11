"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MoreHorizontal, Phone, Video } from 'lucide-react'
import { useEffect, useState } from "react"

type Message = {
  id: string
  content: string
  timestamp: string
  sender: "user" | "other"
}

export function MessageDetail() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [contact, setContact] = useState({
    name: "John Doe",
    avatar: "/avatars/user.jpg",
    status: "Online",
    lastSeen: "Active now"
  })

  useEffect(() => {
    // Simulate API call to fetch messages
    const fetchMessages = async () => {
      try {
        setLoading(true)
        // In a real app, this would be an API call
        const mockMessages: Message[] = [
          {
            id: "1",
            content: "Hi there! How are you doing today?",
            timestamp: "10:30 AM",
            sender: "other"
          },
          {
            id: "2",
            content: "I'm doing well, thanks for asking! How about you?",
            timestamp: "10:32 AM",
            sender: "user"
          },
          {
            id: "3",
            content: "I'm good too. I wanted to check in on the project status. Have you made any progress on the design mockups?",
            timestamp: "10:33 AM",
            sender: "other"
          },
          {
            id: "4",
            content: "Yes, I've completed the initial designs. I'll share them with you shortly.",
            timestamp: "10:35 AM",
            sender: "user"
          },
          {
            id: "5",
            content: "That's great news! I'm looking forward to seeing them. Do you think we'll be able to meet the deadline?",
            timestamp: "10:36 AM",
            sender: "other"
          },
          {
            id: "6",
            content: "I believe so. We're on track with the timeline we discussed last week.",
            timestamp: "10:38 AM",
            sender: "user"
          },
          {
            id: "7",
            content: "Perfect! Let's schedule a call tomorrow to go over the designs together.",
            timestamp: "10:40 AM",
            sender: "other"
          },
          {
            id: "8",
            content: "Sounds good. How about 2 PM?",
            timestamp: "10:41 AM",
            sender: "user"
          },
          {
            id: "9",
            content: "2 PM works for me. I'll send a calendar invite.",
            timestamp: "10:42 AM",
            sender: "other"
          },
          {
            id: "10",
            content: "Great, looking forward to it!",
            timestamp: "10:43 AM",
            sender: "user"
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={contact.avatar || "/placeholder.svg"} />
            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{contact.name}</p>
            <p className="text-xs text-muted-foreground">{contact.lastSeen}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Phone className="h-4 w-4" />
            <span className="sr-only">Call</span>
          </Button>
          <Button size="icon" variant="ghost">
            <Video className="h-4 w-4" />
            <span className="sr-only">Video call</span>
          </Button>
          <Button size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center p-4">
              <p className="text-sm text-muted-foreground">Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex justify-center p-4">
              <p className="text-sm text-muted-foreground">No messages yet</p>
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === "user" 
                      ? "text-primary-foreground/70" 
                      : "text-muted-foreground"
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
