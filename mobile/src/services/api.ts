// API Service - Connect to Django Backend

import axios from 'axios';

// Update these URLs to match your backend
const DJANGO_API_URL = 'http://localhost:8000/api';
const FLASK_API_URL = 'http://localhost:5001';

// For Android emulator, use: http://10.0.2.2:8000/api
// For iOS simulator, use: http://localhost:8000/api
// For real device, use your computer's IP: http://192.168.x.x:8000/api

const api = axios.create({
  baseURL: DJANGO_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const gatewayApi = axios.create({
  baseURL: FLASK_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Mailbox {
  id: string;
  public_key_hash: string;
  created_at: string;
  expires_at: string;
}

export interface Message {
  id: string;
  encrypted_content: string;
  recipient_mailbox: string;
  created_at: string;
  expires_at: string;
}

// Mailbox API
export const createMailbox = async (publicKeyHash: string): Promise<Mailbox> => {
  const response = await api.post('/mailbox/create/', {
    public_key_hash: publicKeyHash,
  });
  return response.data;
};

// Message API
export const sendMessage = async (
  encryptedContent: string,
  recipientMailbox: string
): Promise<{ id: string }> => {
  const response = await api.post('/messages/send/', {
    encrypted_content: encryptedContent,
    recipient_mailbox: recipientMailbox,
  });
  return response.data;
};

export const receiveMessages = async (mailboxId: string): Promise<Message[]> => {
  const response = await api.get(`/messages/receive/${mailboxId}/`);
  return response.data;
};

// Gateway API
export const relayMessage = async (
  recipientId: string,
  encryptedPayload: string
): Promise<{ status: string; message_id: string }> => {
  const response = await gatewayApi.post('/relay/send', {
    recipient_id: recipientId,
    encrypted_payload: encryptedPayload,
  });
  return response.data;
};

export const receiveRelayedMessages = async (
  recipientId: string
): Promise<{ messages: any[] }> => {
  const response = await gatewayApi.get(`/relay/receive/${recipientId}`);
  return response.data;
};

export const checkGatewayHealth = async (): Promise<{ status: string }> => {
  const response = await gatewayApi.get('/health');
  return response.data;
};

export default api;
