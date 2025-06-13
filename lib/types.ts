export type Priority = "low" | "medium" | "high" | "urgent"

export type Attachment = {
  id: string
  name: string
  type: string
}

export type Author = {
  name: string
  avatar: string
  role: string
}

export type Reactions = {
  likes: number
  comments: number
}

export type Announcement = {
  id: string
  title: string
  content: string
  author: Author
  timestamp: string
  priority: Priority
  category: string
  targetAudience: string[]
  attachments?: Attachment[]
  reactions: Reactions
  isPinned: boolean
  expiryDate?: string
  updatedAt?: string
}
