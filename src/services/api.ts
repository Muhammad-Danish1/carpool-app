import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getApiUrl = () => {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      return `https://${window.location.hostname.replace('-5000', '-3000')}/api/v1`;
    }
    return 'http://localhost:3000/api/v1';
  }
  return 'http://10.0.2.2:3000/api/v1';
};

const API_BASE_URL = getApiUrl();

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  data: {
    user: any;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

const createAuthHeader = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const chatAPI = {
  getConversations: async () => {
    const headers = await createAuthHeader();
    const response = await fetch(`${API_BASE_URL}/conversations`, {
      headers,
      credentials: 'include',
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch conversations');
    return result.data;
  },

  getOrCreateConversation: async (userId: string) => {
    const headers = await createAuthHeader();
    const response = await fetch(`${API_BASE_URL}/conversations`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ userId }),
      credentials: 'include',
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to get conversation');
    return result.data;
  },

  getMessages: async (conversationId: string, page: number = 1, limit: number = 50) => {
    const headers = await createAuthHeader();
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages?page=${page}&limit=${limit}`, {
      headers,
      credentials: 'include',
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch messages');
    return result.data;
  },

  sendMessage: async (conversationId: string, content: string, messageType: string = 'text') => {
    const headers = await createAuthHeader();
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ content, messageType }),
      credentials: 'include',
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to send message');
    return result.data;
  },

  markAsRead: async (conversationId: string) => {
    const headers = await createAuthHeader();
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/read`, {
      method: 'PATCH',
      headers,
      credentials: 'include',
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to mark as read');
    return result.data;
  },
};

export const notificationAPI = {
  getNotifications: async (page: number = 1, limit: number = 50) => {
    const headers = await createAuthHeader();
    const response = await fetch(`${API_BASE_URL}/notifications?page=${page}&limit=${limit}`, {
      headers,
      credentials: 'include',
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch notifications');
    return result.data;
  },

  markAsRead: async (notificationId: string) => {
    const headers = await createAuthHeader();
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
      method: 'PATCH',
      headers,
      credentials: 'include',
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to mark notification as read');
    return result.data;
  },

  markAllAsRead: async () => {
    const headers = await createAuthHeader();
    const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
      method: 'PATCH',
      headers,
      credentials: 'include',
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to mark all as read');
    return result.data;
  },
};

export const authAPI = {
  signup: async (data: SignupData): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Signup failed');
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  },

  logout: async (accessToken: string): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  getMe: async (accessToken: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });
      
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to get user');
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  },
};
