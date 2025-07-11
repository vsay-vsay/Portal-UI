"use client"

import { useState, useEffect } from "react"
import { Search, Users, MessageCircle, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { currentUser } from "@/lib/mock-data"
import { CreateGroupDialog } from "./create-group-dialog"
import { UserSearchDialog } from "./user-search-dialog"
import useRequestHook from "@/hooks/requestHook"
import api from "@/utils/api"

// Updated interface to match your API response
interface ApiMessage {
  _id: string
  sender: string
  content: string
  readBy: string[]
  timestamp: string
  chat?: string
  __v: number
}

interface ApiParticipant {
  _id: string
  name: string
  email: string
  role: string
  avatar?: string
  isOnline?: boolean
}

interface ApiChat {
  _id: string
  name?: string
  isGroup: boolean
  participants: ApiParticipant[]
  messages: ApiMessage[]
  admin?: ApiParticipant
  domainName: string
  createdAt: string
  __v: number
  unreadCount?: number
  isTyping?: boolean
}

interface ChatSidebarProps {
  selectedChatId?: string
  onChatSelect: (chat: ApiChat) => void
}

export function MessageList({ selectedChatId, onChatSelect }: ChatSidebarProps) {
  const [fetchChats, chatData, isLoading, error, reset, status] = useRequestHook(api.CHAT.GET_CHATS, "GET", null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showUserSearch, setShowUserSearch] = useState(false)

  useEffect(() => {
    fetchChats()
  }, [])

  const chats: ApiChat[] = chatData?.data || []

  const getChatDisplayName = (chat: ApiChat) => {
    if (chat.isGroup) return chat.name || "Group Chat"

    // For direct chats, find the other participant
    const otherParticipant = chat.participants.find((p) => p._id !== currentUser.id)
    return otherParticipant?.name || "Unknown"
  }

  const getChatAvatar = (chat: ApiChat) => {
    if (chat.isGroup) {
      return "/placeholder.svg?height=40&width=40" // You can add group avatar logic here
    }

    const otherParticipant = chat.participants.find((p) => p._id !== currentUser.id)
    return otherParticipant?.avatar || "/placeholder.svg?height=40&width=40"
  }

  const filteredChats = chats.filter((chat: ApiChat) => {
    const chatName = getChatDisplayName(chat)
    return (
      chatName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.participants.some(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    )
  })

  const formatTime = (date: Date | string) => {
    const messageDate = new Date(date)
    const now = new Date()
    const diff = now.getTime() - messageDate.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return "now"
    if (hours < 24) return `${hours}h`
    return `${Math.floor(hours / 24)}d`
  }

  

  const getOnlineStatus = (chat: ApiChat) => {
    if (chat.isGroup) return null

    const otherParticipant = chat.participants.find((p) => p._id !== currentUser.id)
    return otherParticipant?.isOnline
  }

  const getLastMessage = (chat: ApiChat) => {
    if (!chat.messages || chat.messages.length === 0) return null

    // Sort messages by timestamp and get the latest one
    const sortedMessages = [...chat.messages].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )

    return sortedMessages[0]
  }

  const handleGroupCreated = (group: ApiChat) => {
    fetchChats() // Refresh the chat list
    onChatSelect(group)
  }

  const handleChatCreated = (chat: ApiChat) => {
    fetchChats() // Refresh the chat list
    onChatSelect(chat)
  }

  return (
    <div className="border-r bg-background flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
              <AvatarFallback>{currentUser.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">Chats</h2>
              <p className="text-xs text-muted-foreground">{currentUser.name}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" onClick={() => setShowUserSearch(true)}>
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowCreateGroup(true)}>
              <Users className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))
          ) : error ? (
            <div className="p-4 text-center text-destructive">
              <p>Failed to load chats</p>
              <Button size="sm" variant="outline" onClick={() => fetchChats()} className="mt-2">
                Retry
              </Button>
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              {searchQuery ? "No chats found" : "No chats yet"}
            </div>
          ) : (
            filteredChats.map((chat: ApiChat) => {
              const lastMessage = getLastMessage(chat)

              return (
                <div
                  key={chat._id}
                  className={`flex w-full items-center  p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                    selectedChatId === chat._id ? "bg-accent" : ""
                  }`}
                  onClick={() => onChatSelect(chat)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={getChatAvatar(chat) || "/placeholder.svg"} />
                      <AvatarFallback>
                        {chat.isGroup ? (
                          <Users className="h-5 w-5" />
                        ) : (
                          getChatDisplayName(chat).charAt(0).toUpperCase()
                        )}
                      </AvatarFallback>
                    </Avatar>
                    {!chat.isGroup && getOnlineStatus(chat) && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className=" p-2">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium">{getChatDisplayName(chat)}</h3>
                      <div className="flex items-center gap-1">
                        {lastMessage && (
                          <div className="text-xs text-muted-foreground">{formatTime(lastMessage.timestamp)}</div>
                        )}
                        {chat.unreadCount && chat.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs min-w-[20px] h-5">
                            {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground  text-ellipsis">
                        {lastMessage?.content || "No messages yet"}
                      </p>
                      {chat.isTyping && (
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce delay-100" />
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce delay-200" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </ScrollArea>

      <CreateGroupDialog open={showCreateGroup} onOpenChange={setShowCreateGroup} onGroupCreated={handleGroupCreated} />
      <UserSearchDialog open={showUserSearch} onOpenChange={setShowUserSearch} onChatCreated={handleChatCreated} />
    </div>
  )
}
