import { Server } from 'socket.io';
import { AuthSocket } from '../config/socket';
import chatService from '../services/chat.service';
import Message from '../models/message.model';
import Conversation from '../models/conversation.model';
import logger from '../utils/logger';
import { Types } from 'mongoose';

export const setupChatHandlers = (io: Server) => {
  io.on('connection', (socket: AuthSocket) => {
    if (!socket.userId) return;

    socket.on('chat:join_conversation', async (conversationId: string) => {
      try {
        const conversation = await Conversation.findById(conversationId);
        
        if (!conversation) {
          logger.warn(`User ${socket.userId} attempted to join non-existent conversation ${conversationId}`);
          socket.emit('chat:error', { message: 'Conversation not found' });
          return;
        }

        if (!conversation.participants.some((p: any) => p.toString() === socket.userId)) {
          logger.warn(`User ${socket.userId} attempted to join unauthorized conversation ${conversationId}`);
          socket.emit('chat:error', { message: 'Not authorized to join this conversation' });
          return;
        }

        const room = `conversation:${conversationId}`;
        socket.join(room);
        logger.info(`User ${socket.userId} joined conversation ${conversationId}`);
        
        socket.emit('chat:conversation_joined', { conversationId });
      } catch (error) {
        logger.error(`Error joining conversation:`, error);
        socket.emit('chat:error', { message: 'Failed to join conversation' });
      }
    });

    socket.on('chat:leave_conversation', (conversationId: string) => {
      const room = `conversation:${conversationId}`;
      socket.leave(room);
      logger.info(`User ${socket.userId} left conversation ${conversationId}`);
    });

    socket.on('chat:send_message', async (data: {
      conversationId: string;
      content: string;
      messageType?: string;
    }) => {
      try {
        const userId = new Types.ObjectId(socket.userId!);
        
        const message = await chatService.sendMessage(
          userId,
          data.conversationId,
          data.content,
          data.messageType
        );

        const room = `conversation:${data.conversationId}`;
        io.to(room).emit('chat:new_message', message);

        const conversation = await chatService.getOrCreateConversation(
          userId,
          message.recipient._id.toString()
        );
        
        if (conversation && conversation.participants) {
          conversation.participants.forEach((participant: any) => {
            io.to(`user:${participant._id.toString()}`).emit('chat:conversation_updated', {
              conversationId: data.conversationId,
              lastMessage: message
            });
          });
        }

      } catch (error) {
        logger.error(`Error sending message:`, error);
        socket.emit('chat:error', { message: error instanceof Error && error.message.includes('not a participant') ? 'Not authorized to send messages in this conversation' : 'Failed to send message' });
      }
    });

    socket.on('chat:typing_start', (data: { conversationId: string }) => {
      const room = `conversation:${data.conversationId}`;
      socket.to(room).emit('chat:user_typing', {
        userId: socket.userId,
        conversationId: data.conversationId
      });
    });

    socket.on('chat:typing_stop', (data: { conversationId: string }) => {
      const room = `conversation:${data.conversationId}`;
      socket.to(room).emit('chat:user_stopped_typing', {
        userId: socket.userId,
        conversationId: data.conversationId
      });
    });

    socket.on('chat:message_read', async (data: {
      conversationId: string;
      messageId: string;
    }) => {
      try {
        const message = await Message.findById(data.messageId);
        if (message && message.recipient.toString() === socket.userId) {
          message.status = 'read';
          message.readAt = new Date();
          await message.save();

          const room = `conversation:${data.conversationId}`;
          io.to(room).emit('chat:message_status_updated', {
            messageId: data.messageId,
            status: 'read',
            readAt: message.readAt
          });
        }
      } catch (error) {
        logger.error(`Error marking message as read:`, error);
      }
    });

    socket.on('chat:online', () => {
      socket.broadcast.emit('chat:user_online', { userId: socket.userId });
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('chat:user_offline', { userId: socket.userId });
    });
  });

  logger.info('Chat socket handlers initialized');
};
