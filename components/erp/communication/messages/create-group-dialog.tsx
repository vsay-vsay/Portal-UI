"use client"

import { useState } from "react"
import { X, Users } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

import { mockUsers, currentUser } from "@/lib/mock-data"
import type { Chat, User } from "@/types/chat"
import useRequestHook from "@/hooks/requestHook"
import api from "@/utils/api"

interface CreateGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGroupCreated: (group: Chat) => void
}

export function CreateGroupDialog({ open, onOpenChange, onGroupCreated }: CreateGroupDialogProps) {
  const [createGroup, , isCreating] = useRequestHook(api.CHAT.GROUP_CREATE, "POST", null)
  const [groupName, setGroupName] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  const availableUsers = mockUsers.filter((u) => u.id !== currentUser.id)

  const handleUserToggle = (user: User, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, user])
    } else {
      setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id))
    }
  }

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedUsers.length === 0) return

     createGroup({
          name: groupName.trim(),
          participants: selectedUsers.map((u) => u.email),
        })

    //   if (result?.success && result.group) {
    //     onGroupCreated(result.group)
    //     setGroupName("")
    //     setSelectedUsers([])
    //     onOpenChange(false)
    //   }
    // } catch (error) {
    //   console.error("Failed to create group:", error)
    // }
  }

  const handleClose = () => {
    setGroupName("")
    setSelectedUsers([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Create Group Chat
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="groupName">Group Name</Label>
            <Input
              id="groupName"
              placeholder="Enter group name..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              maxLength={50}
            />
            <p className="text-xs text-muted-foreground mt-1">{groupName.length}/50</p>
          </div>

          <div>
            <Label>Select Members ({selectedUsers.length} selected)</Label>
            <ScrollArea className="h-48 border rounded-md p-2 mt-2">
              <div className="space-y-2">
                {availableUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-3 p-2 rounded hover:bg-accent">
                    <Checkbox
                      id={user.id}
                      checked={selectedUsers.some((u) => u.id === user.id)}
                      onCheckedChange={(checked) => handleUserToggle(user, checked as boolean)}
                    />
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {selectedUsers.length > 0 && (
            <div>
              <Label>Selected Members</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-1 bg-secondary rounded-full px-3 py-1">
                    <Avatar className="w-4 h-4">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{user.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleUserToggle(user, false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleClose} disabled={isCreating}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateGroup}
              disabled={!groupName.trim() || selectedUsers.length === 0 || isCreating}
            >
              {isCreating ? "Creating..." : "Create Group"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
