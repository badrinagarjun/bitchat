// Type definitions for BitChat - Pure Mesh Architecture

export interface ChatMessage {
  id: string;
  chatId: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  encrypted?: boolean;
  deviceId?: string;
}

export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  deviceId: string;
  isConnected?: boolean;
}

export interface BluetoothDevice {
  id: string;
  name: string;
  rssi?: number;
  isConnected: boolean;
}

export interface Contact {
  deviceId: string;
  name: string;
  publicKey?: string;
  addedAt: string;
}

export interface MeshMessage {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  encrypted: boolean;
  hops?: number;
}
