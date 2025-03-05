import { Chat, Document, Suggestion, Vote, ChatMessage } from './types';
import { VisibilityType } from '@/components/visibility-selector';

// Mock data for development
export const mockChats: Chat[] = [{
  id: 'chat-1',
  title: 'Mock Chat',
  createdAt: new Date(),
  visibility: 'public',
  userId: 'user-1'
}];

export const mockMessages: ChatMessage[] = [{
  id: 'da31a596-70cc-49bf-bd0d-5c78298c6827',
  chatId: '603f0a97-77a5-43c6-b867-5755bf90ea18',
  content: 'Hello world',
  role: 'user',
  createdAt: new Date()
}];
export const mockDocuments: Document[] = [];
export const mockSuggestions: Suggestion[] = [];
export const mockVotes: Vote[] = [];

// Mock functions to replace database queries
export async function getChatById(id: string): Promise<Chat | null> {
  return mockChats.find(chat => chat.id === id) || null;
}

export async function getMessagesByChatId(chatId: string) {
  return [];
}

export async function getDocumentById(id: string): Promise<Document | null> {
  return mockDocuments.find(doc => doc.id === id) || null;
}

export async function saveDocument(document: Document): Promise<Document> {
  const index = mockDocuments.findIndex(doc => doc.id === document.id);
  if (index !== -1) {
    mockDocuments[index] = document;
  } else {
    mockDocuments.push(document);
  }
  return document;
}

export async function saveSuggestions({ suggestions }: { suggestions: Suggestion[] }): Promise<void> {
  suggestions.forEach(suggestion => {
    const index = mockSuggestions.findIndex(s => s.id === suggestion.id);
    if (index !== -1) {
      mockSuggestions[index] = suggestion;
    } else {
      mockSuggestions.push(suggestion);
    }
  });
}

export async function getSuggestionsByDocumentId({ documentId }: { documentId: string }): Promise<Suggestion[]> {
  return mockSuggestions.filter(suggestion => suggestion.documentId === documentId);
}

export async function saveVote(vote: Vote): Promise<void> {
  const index = mockVotes.findIndex(v => v.id === vote.id);
  if (index !== -1) {
    mockVotes[index] = vote;
  } else {
    mockVotes.push(vote);
  }
}

export async function getVotesByMessageId(messageId: string): Promise<Vote[]> {
  return mockVotes.filter(vote => vote.messageId === messageId);
}

export async function deleteMessagesByChatIdAfterTimestamp({ chatId, timestamp }: { chatId: string; timestamp: Date }): Promise<void> {
  // In mock data, we don't actually delete anything
  return Promise.resolve();
}

// In your mock file (e.g., lib/mock-data.ts)
export async function getMessageById(id: string): Promise<ChatMessage | null> {
  const message = mockMessages.find(m => m.id === id);
  return message || null;
}

export async function updateChatVisiblityById({ chatId, visibility }: { chatId: string; visibility: VisibilityType }): Promise<void> {
  const chat = mockChats.find(c => c.id === chatId);
  if (chat) {
    chat.visibility = visibility;
  }
  return Promise.resolve();
}
export { Chat };

