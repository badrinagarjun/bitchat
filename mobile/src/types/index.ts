// TypeScript types and interfaces

export interface User {
  id: string;
  username: string;
  publicKeyHash: string;
}

export interface Chat {
  id: string;
  name: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  content: string;
  senderId: string;
  timestamp: Date;
  isOwn: boolean;
  encrypted?: boolean;
}

export interface Mailbox {
  id: string;
  public_key_hash: string;
  created_at: string;
  expires_at: string;
}
