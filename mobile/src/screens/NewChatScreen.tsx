// New Chat Screen - Start a new conversation

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { createMailbox } from '../services/api';

interface NewChatScreenProps {
  navigation: any;
}

export default function NewChatScreen({ navigation }: NewChatScreenProps) {
  const [recipientId, setRecipientId] = useState('');
  const [loading, setLoading] = useState(false);

  const startChat = async () => {
    if (!recipientId.trim()) {
      Alert.alert('Error', 'Please enter a recipient ID');
      return;
    }

    setLoading(true);
    try {
      // Create a mailbox for this chat
      const mailbox = await createMailbox(`chat_${Date.now()}`);
      
      Alert.alert('Success', 'Chat created! Mailbox ID: ' + mailbox.id);
      navigation.goBack();
    } catch (error) {
      console.error('Error creating chat:', error);
      Alert.alert('Error', 'Failed to create chat. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Start New Chat</Text>
        <Text style={styles.subtitle}>
          Enter a recipient ID or scan a QR code
        </Text>

        <TextInput
          style={styles.input}
          value={recipientId}
          onChangeText={setRecipientId}
          placeholder="Enter recipient ID or mailbox ID"
          placeholderTextColor="#888"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={startChat}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating...' : 'Start Chat'}
          </Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>🔒 Privacy First</Text>
          <Text style={styles.infoText}>
            All messages are end-to-end encrypted. BitChat uses anonymous
            mailbox IDs, no phone numbers or emails required.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => Alert.alert('Coming Soon', 'QR code scanning')}
        >
          <Text style={styles.scanButtonText}>📷 Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3a86ff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
  },
  scanButton: {
    marginTop: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3a86ff',
    borderRadius: 12,
  },
  scanButtonText: {
    color: '#3a86ff',
    fontSize: 16,
    fontWeight: '600',
  },
});
