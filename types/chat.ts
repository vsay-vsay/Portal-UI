export interface User {
    id: string
    email: string
    name: string
    avatar?: string
    isOnline?: boolean
  }
  
  export interface Message {
    id: string
    content: string
    senderId: string
    senderEmail: string
    senderName: string
    chatId: string
    timestamp: Date
    type: 'text' | 'image' | 'file'
  }
  
  export interface Chat {
    id: string
    name?: string
    type: 'direct' | 'group'
    participants: User[]
    lastMessage?: Message
    lastActivity: Date
    unreadCount?: number
  }
  
  export interface Group extends Chat {
    type: 'group'
    name: string
    createdBy: string
    createdAt: Date
  }
  
  export interface DirectChat extends Chat {
    type: 'direct'
  }
  