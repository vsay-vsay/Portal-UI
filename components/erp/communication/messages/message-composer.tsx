"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Paperclip, Send, Smile } from 'lucide-react'
import { useState } from "react"
import { toast } from "sonner"

export function MessageComposer() {
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)

  const handleSendMessage = async () => {
    if (!message.trim()) return
    
    try {
      setSending(true)
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success("Message sent")
      setMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message")
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="border-t p-4">
      <div className="flex items-end gap-2">
        <Button size="icon" variant="ghost" className="shrink-0">
          <Paperclip className="h-4 w-4" />
          <span className="sr-only">Attach file</span>
        </Button>
        <Textarea
          placeholder="Type a message..."
          className="min-h-10 flex-1 resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button size="icon" variant="ghost" className="shrink-0">
          <Smile className="h-4 w-4" />
          <span className="sr-only">Add emoji</span>
        </Button>
        <Button 
          size="icon" 
          className="shrink-0" 
          onClick={handleSendMessage}
          disabled={!message.trim() || sending}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  )
}
