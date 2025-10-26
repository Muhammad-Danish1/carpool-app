import { io, Socket } from 'socket.io-client';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getSocketUrl = () => {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      return `https://${window.location.hostname.replace('-5000', '-3000')}`;
    }
    return 'http://localhost:3000';
  }
  return 'http://10.0.2.2:3000';
};

const SOCKET_URL = getSocketUrl();

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  async connect(): Promise<Socket> {
    if (this.socket?.connected) {
      return this.socket;
    }

    try {
      const token = await AsyncStorage.getItem('accessToken');
      
      if (!token) {
        throw new Error('No access token found');
      }

      this.socket = io(SOCKET_URL, {
        auth: { token },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: this.maxReconnectAttempts,
      });

      this.setupEventListeners();

      return this.socket;
    } catch (error) {
      console.error('Socket connection error:', error);
      throw error;
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
      this.reconnectAttempts = 0;
      this.socket?.emit('chat:online');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
        this.disconnect();
      }
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  emit(event: string, data?: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn('Socket not connected, cannot emit event:', event);
    }
  }

  on(event: string, callback: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback?: (...args: any[]) => void) {
    if (this.socket) {
      if (callback) {
        this.socket.off(event, callback);
      } else {
        this.socket.off(event);
      }
    }
  }

  joinConversation(conversationId: string) {
    this.emit('chat:join_conversation', conversationId);
  }

  leaveConversation(conversationId: string) {
    this.emit('chat:leave_conversation', conversationId);
  }

  sendMessage(conversationId: string, content: string, messageType: string = 'text') {
    this.emit('chat:send_message', { conversationId, content, messageType });
  }

  sendTypingStart(conversationId: string) {
    this.emit('chat:typing_start', { conversationId });
  }

  sendTypingStop(conversationId: string) {
    this.emit('chat:typing_stop', { conversationId });
  }

  markMessageAsRead(conversationId: string, messageId: string) {
    this.emit('chat:message_read', { conversationId, messageId });
  }

  markNotificationAsRead(notificationId: string) {
    this.emit('notification:mark_read', notificationId);
  }

  markAllNotificationsAsRead() {
    this.emit('notification:mark_all_read');
  }
}

export default new SocketService();
