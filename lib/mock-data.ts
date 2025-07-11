import type { User, Chat, Message } from "@/types/chat"

export const mockUsers: User[] = [
  {
    id: "1",
    email: "yesveersingh139@gmail.com",
    name: "Yesveer Singh",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
  },
  {
    id: "2",
    email: "shivambhairav@gmail.com",
    name: "Shivam Bhairav",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
  },
  {
    id: "3",
    email: "kumararvindra7691@gmail.com",
    name: "Kumar Arvindra",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
  },
]

export const mockChats: Chat[] = [
  {
    id: "6838a2001734873c79990b88",
    name: "Team Group",
    type: "group",
    participants: mockUsers,
    lastActivity: new Date(),
    unreadCount: 2,
    lastMessage: {
      id: "1",
      content: "How are you? guys are you there",
      senderId: "1",
      senderEmail: "yesveersingh139@gmail.com",
      senderName: "Yesveer Singh",
      chatId: "6838a2001734873c79990b88",
      timestamp: new Date(),
      type: "text",
    },
  },
  {
    id: "6838a3fe1734873c79990bc0",
    type: "direct",
    participants: [mockUsers[0], mockUsers[1]],
    lastActivity: new Date(Date.now() - 3600000),
    unreadCount: 0,
    lastMessage: {
      id: "2",
      content: "Hi there! how are you",
      senderId: "2",
      senderEmail: "shivambhairav@gmail.com",
      senderName: "Shivam Bhairav",
      chatId: "6838a3fe1734873c79990bc0",
      timestamp: new Date(Date.now() - 3600000),
      type: "text",
    },
  },
]

export const mockMessages: Record<string, Message[]> = {
  "6838a2001734873c79990b88": [
    {
      id: "1",
      content: "Welcome to the team group!",
      senderId: "1",
      senderEmail: "yesveersingh139@gmail.com",
      senderName: "Yesveer Singh",
      chatId: "6838a2001734873c79990b88",
      timestamp: new Date(Date.now() - 7200000),
      type: "text",
    },
    {
      id: "2",
      content: "Thanks for adding me!",
      senderId: "3",
      senderEmail: "kumararvindra7691@gmail.com",
      senderName: "Kumar Arvindra",
      chatId: "6838a2001734873c79990b88",
      timestamp: new Date(Date.now() - 3600000),
      type: "text",
    },
    {
      id: "3",
      content: "How are you? guys are you there",
      senderId: "1",
      senderEmail: "yesveersingh139@gmail.com",
      senderName: "Yesveer Singh",
      chatId: "6838a2001734873c79990b88",
      timestamp: new Date(),
      type: "text",
    },
  ],
  "6838a3fe1734873c79990bc0": [
    {
      id: "4",
      content: "Hi there! how are you",
      senderId: "2",
      senderEmail: "shivambhairav@gmail.com",
      senderName: "Shivam Bhairav",
      chatId: "6838a3fe1734873c79990bc0",
      timestamp: new Date(Date.now() - 3600000),
      type: "text",
    },
    {
      id: "5",
      content: "I'm doing great! How about you?",
      senderId: "1",
      senderEmail: "yesveersingh139@gmail.com",
      senderName: "Yesveer Singh",
      chatId: "6838a3fe1734873c79990bc0",
      timestamp: new Date(Date.now() - 3000000),
      type: "text",
    },
  ],
}

// Current user simulation
export const currentUser = mockUsers[0]
