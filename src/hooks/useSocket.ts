import { useEffect, useState } from 'react';
import socketService from '../services/socket';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connect = async () => {
      try {
        await socketService.connect();
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect socket:', error);
        setIsConnected(false);
      }
    };

    connect();

    const checkConnection = setInterval(() => {
      setIsConnected(socketService.isConnected());
    }, 3000);

    return () => {
      clearInterval(checkConnection);
    };
  }, []);

  return {
    isConnected,
    socket: socketService,
  };
};

export const useChatSocket = (conversationId: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!isConnected || !conversationId) return;

    socket.joinConversation(conversationId);

    const handleNewMessage = (message: any) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleMessageStatusUpdated = (data: { messageId: string; status: string; readAt?: Date }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === data.messageId
            ? { ...msg, status: data.status, readAt: data.readAt }
            : msg
        )
      );
    };

    const handleUserTyping = () => {
      setIsTyping(true);
    };

    const handleUserStoppedTyping = () => {
      setIsTyping(false);
    };

    socket.on('chat:new_message', handleNewMessage);
    socket.on('chat:message_status_updated', handleMessageStatusUpdated);
    socket.on('chat:user_typing', handleUserTyping);
    socket.on('chat:user_stopped_typing', handleUserStoppedTyping);

    return () => {
      socket.leaveConversation(conversationId);
      socket.off('chat:new_message', handleNewMessage);
      socket.off('chat:message_status_updated', handleMessageStatusUpdated);
      socket.off('chat:user_typing', handleUserTyping);
      socket.off('chat:user_stopped_typing', handleUserStoppedTyping);
    };
  }, [isConnected, conversationId]);

  const sendMessage = (content: string, messageType: string = 'text') => {
    if (isConnected) {
      socket.sendMessage(conversationId, content, messageType);
    }
  };

  const startTyping = () => {
    if (isConnected) {
      socket.sendTypingStart(conversationId);
    }
  };

  const stopTyping = () => {
    if (isConnected) {
      socket.sendTypingStop(conversationId);
    }
  };

  return {
    messages,
    isTyping,
    sendMessage,
    startTyping,
    stopTyping,
    isConnected,
  };
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!isConnected) return;

    const handleNewNotification = (notification: any) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    const handleNotificationMarkedRead = ({ notificationId }: { notificationId: string }) => {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    };

    const handleAllMarkedRead = () => {
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true }))
      );
      setUnreadCount(0);
    };

    socket.on('notification:new', handleNewNotification);
    socket.on('notification:marked_read', handleNotificationMarkedRead);
    socket.on('notification:all_marked_read', handleAllMarkedRead);

    return () => {
      socket.off('notification:new', handleNewNotification);
      socket.off('notification:marked_read', handleNotificationMarkedRead);
      socket.off('notification:all_marked_read', handleAllMarkedRead);
    };
  }, [isConnected]);

  const markAsRead = (notificationId: string) => {
    if (isConnected) {
      socket.markNotificationAsRead(notificationId);
    }
  };

  const markAllAsRead = () => {
    if (isConnected) {
      socket.markAllNotificationsAsRead();
    }
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    isConnected,
  };
};
