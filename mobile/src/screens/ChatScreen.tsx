// Chat Screen - Individual Conversation

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ChatMessage } from '../types';

interface ChatScreenProps {
  navigation: any;
  route: any;
}

export default function ChatScreen({ navigation, route }: ChatScreenProps) {
  const { chat } = route.params;
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      chatId: chat.id,
      content: 'Hey! Welcome to BitChat',
      senderId: 'other',
      timestamp: new Date(),
      isOwn: false,
      encrypted: true,
    },
    {
      id: '2',
      chatId: chat.id,
      content: 'Thanks! This is pretty cool',
      senderId: 'me',
      timestamp: new Date(),
      isOwn: true,
      encrypted: true,
    },
  ]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: chat.name });
  }, []);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        chatId: chat.id,
        content: inputText,
        senderId: 'me',
        timestamp: new Date(),
        isOwn: true,
        encrypted: true,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // TODO: Send to backend via API
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View
      style={[
        styles.messageBubble,
        item.isOwn ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.content}</Text>
      <View style={styles.messageFooter}>
        <Text style={styles.messageTime}>
          {item.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        {item.encrypted && (
          <Text style={styles.encryptedIcon}>🔒</Text>
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
        inverted={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3a86ff',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2d2d2d',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  messageTime: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  encryptedIcon: {
    fontSize: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#2d2d2d',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3a86ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
