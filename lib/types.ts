import { Message } from 'ai'

export interface Vote {
  id: string
  messageId: string
  type: 'up' | 'down'
  createdAt: Date
}

export interface Chat {
  id: string
  title: string
  createdAt: Date
  visibility: 'public' | 'private'
  userId: string
}

export interface Document {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  userId: string
  visibility: 'public' | 'private'
}

export interface Suggestion {
  id: string
  documentId: string
  content: string
  description: string
  from: number
  to: number
  createdAt: Date
}

export interface ChatMessage extends Message {
  chatId: string
}
