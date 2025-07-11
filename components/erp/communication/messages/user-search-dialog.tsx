"use client"

import { useState } from "react"
import { Search, MessageCircle, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

import { currentUser } from "@/lib/mock-data"
import type { Chat, User } from "@/types/chat"
import useRequestHook from "@/hooks/requestHook"
import api from "@/utils/api"

interface UserSearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onChatCreated: (chat: Chat) => void
}

export function UserSearchDialog({ open, onOpenChange, onChatCreated }: UserSearchDialogProps) {
  const [searchUsers, searchData, isSearching] = useRequestHook(api.CHAT.SEARCH_USERS, "GET", null)
  const [searchQuery, setSearchQuery] = useState("")

  const searchResults: User[] = searchData?.users || []

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

   
      await searchUsers({
        query:searchQuery
      })
   
  }

  const handleStartChat = async (user: User) => {
    try {
      // Create a direct chat
      const directChat: Chat = {
        id: `direct_${currentUser.id}_${user.id}`,
        type: "direct",
        participants: [currentUser, user],
        lastActivity: new Date(),
        unreadCount: 0,
      }

      onChatCreated(directChat)
      onOpenChange(false)
      setSearchQuery("")
    } catch (error) {
      console.error("Failed to create chat:", error)
    }
  }

  const handleClose = () => {
    setSearchQuery("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Start New Chat
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  // Update the URL for the search hook
                  searchUsers.bind(null, {
                    method: "GET",
                    headers: {},
                  })
                }}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} disabled={!searchQuery.trim() || isSearching}>
              {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </div>

          <ScrollArea className="h-64">
            <div className="space-y-2">
              {isSearching ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Searching...</span>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {user.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        {!user.isOnline && user.lastSeen && (
                          <p className="text-xs text-muted-foreground">
                            Last seen {new Date(user.lastSeen).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleStartChat(user)}>
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                ))
              ) : searchQuery && !isSearching ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No users found for "{searchQuery}"</p>
                  <p className="text-sm">Try searching with a different term</p>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Search for users to start a conversation</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
