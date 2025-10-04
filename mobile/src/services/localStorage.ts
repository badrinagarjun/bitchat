// Local Storage Service - Replaces backend database
// All data stored locally on device

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatMessage, Chat } from '../types';

const STORAGE_KEYS = {
  MESSAGES: '@bitchat_messages',
  CHATS: '@bitchat_chats',
  CONTACTS: '@bitchat_contacts',
  USER_ID: '@bitchat_user_id',
  PUBLIC_KEY: '@bitchat_public_key',
  PRIVATE_KEY: '@bitchat_private_key',
};

class LocalStorageService {
  // Save messages
  async saveMessage(message: ChatMessage): Promise<void> {
    try {
      const messages = await this.getAllMessages();
      messages.push(message);
      await AsyncStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  }

  // Get all messages
  async getAllMessages(): Promise<ChatMessage[]> {
    try {
      const messagesJson = await AsyncStorage.getItem(STORAGE_KEYS.MESSAGES);
      return messagesJson ? JSON.parse(messagesJson) : [];
    } catch (error) {
      console.error('Failed to get messages:', error);
      return [];
    }
  }

  // Get messages for a specific chat
  async getMessagesForChat(chatId: string): Promise<ChatMessage[]> {
    try {
      const allMessages = await this.getAllMessages();
      return allMessages.filter(msg => msg.chatId === chatId);
    } catch (error) {
      console.error('Failed to get chat messages:', error);
      return [];
    }
  }

  // Delete message
  async deleteMessage(messageId: string): Promise<void> {
    try {
      const messages = await this.getAllMessages();
      const filtered = messages.filter(msg => msg.id !== messageId);
      await AsyncStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  }

  // Save chat
  async saveChat(chat: Chat): Promise<void> {
    try {
      const chats = await this.getAllChats();
      const index = chats.findIndex(c => c.id === chat.id);
      
      if (index >= 0) {
        chats[index] = chat;
      } else {
        chats.push(chat);
      }
      
      await AsyncStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
    } catch (error) {
      console.error('Failed to save chat:', error);
    }
  }

  // Get all chats
  async getAllChats(): Promise<Chat[]> {
    try {
      const chatsJson = await AsyncStorage.getItem(STORAGE_KEYS.CHATS);
      return chatsJson ? JSON.parse(chatsJson) : [];
    } catch (error) {
      console.error('Failed to get chats:', error);
      return [];
    }
  }

  // Delete chat
  async deleteChat(chatId: string): Promise<void> {
    try {
      // Delete chat
      const chats = await this.getAllChats();
      const filtered = chats.filter(chat => chat.id !== chatId);
      await AsyncStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(filtered));

      // Delete associated messages
      const messages = await this.getAllMessages();
      const filteredMessages = messages.filter(msg => msg.chatId !== chatId);
      await AsyncStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(filteredMessages));
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  }

  // Save contact
  async saveContact(deviceId: string, name: string, publicKey?: string): Promise<void> {
    try {
      const contacts = await this.getContacts();
      contacts[deviceId] = { name, publicKey, addedAt: new Date().toISOString() };
      await AsyncStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
    } catch (error) {
      console.error('Failed to save contact:', error);
    }
  }

  // Get contacts
  async getContacts(): Promise<Record<string, any>> {
    try {
      const contactsJson = await AsyncStorage.getItem(STORAGE_KEYS.CONTACTS);
      return contactsJson ? JSON.parse(contactsJson) : {};
    } catch (error) {
      console.error('Failed to get contacts:', error);
      return {};
    }
  }

  // Delete contact
  async deleteContact(deviceId: string): Promise<void> {
    try {
      const contacts = await this.getContacts();
      delete contacts[deviceId];
      await AsyncStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  }

  // Get or generate user ID
  async getUserId(): Promise<string> {
    try {
      let userId = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
      
      if (!userId) {
        // Generate anonymous ID
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, userId);
      }
      
      return userId;
    } catch (error) {
      console.error('Failed to get user ID:', error);
      return `user_${Date.now()}`;
    }
  }

  // Save encryption keys (for future)
  async saveKeys(publicKey: string, privateKey: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PUBLIC_KEY, publicKey);
      await AsyncStorage.setItem(STORAGE_KEYS.PRIVATE_KEY, privateKey);
    } catch (error) {
      console.error('Failed to save keys:', error);
    }
  }

  // Get public key
  async getPublicKey(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.PUBLIC_KEY);
    } catch (error) {
      console.error('Failed to get public key:', error);
      return null;
    }
  }

  // Get private key
  async getPrivateKey(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.PRIVATE_KEY);
    } catch (error) {
      console.error('Failed to get private key:', error);
      return null;
    }
  }

  // Clear all data (for debugging)
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.MESSAGES,
        STORAGE_KEYS.CHATS,
        STORAGE_KEYS.CONTACTS,
      ]);
      console.log('All data cleared');
    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  }

  // Get storage stats
  async getStorageStats(): Promise<{
    messages: number;
    chats: number;
    contacts: number;
  }> {
    try {
      const messages = await this.getAllMessages();
      const chats = await this.getAllChats();
      const contacts = await this.getContacts();

      return {
        messages: messages.length,
        chats: chats.length,
        contacts: Object.keys(contacts).length,
      };
    } catch (error) {
      console.error('Failed to get stats:', error);
      return { messages: 0, chats: 0, contacts: 0 };
    }
  }
}

// Singleton instance
export const localStorage = new LocalStorageService();

export default LocalStorageService;
