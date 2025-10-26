import { Server } from 'socket.io';
import { AuthSocket } from '../config/socket';
import notificationService from '../services/notification.service';
import logger from '../utils/logger';
import { Types } from 'mongoose';
import { NotificationType } from '../interfaces/notification.interface';

export const setupNotificationHandlers = (io: Server) => {
  io.on('connection', (socket: AuthSocket) => {
    if (!socket.userId) return;

    socket.on('notification:mark_read', async (notificationId: string) => {
      try {
        const userId = new Types.ObjectId(socket.userId!);
        await notificationService.markAsRead(notificationId, userId);
        
        socket.emit('notification:marked_read', { notificationId });
      } catch (error) {
        logger.error(`Error marking notification as read:`, error);
        socket.emit('notification:error', { message: 'Failed to mark notification as read' });
      }
    });

    socket.on('notification:mark_all_read', async () => {
      try {
        const userId = new Types.ObjectId(socket.userId!);
        await notificationService.markAllAsRead(userId);
        
        socket.emit('notification:all_marked_read');
      } catch (error) {
        logger.error(`Error marking all notifications as read:`, error);
        socket.emit('notification:error', { message: 'Failed to mark all notifications as read' });
      }
    });
  });

  logger.info('Notification socket handlers initialized');
};

export const emitNotification = (io: Server, userId: string, notification: any) => {
  io.to(`user:${userId}`).emit('notification:new', notification);
  logger.info(`Notification sent to user ${userId}: ${notification.type}`);
};

export const createAndEmitNotification = async (
  io: Server,
  data: {
    user: Types.ObjectId;
    title: string;
    message: string;
    type: NotificationType;
    relatedTrip?: Types.ObjectId;
    relatedBooking?: Types.ObjectId;
    relatedUser?: Types.ObjectId;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
  }
) => {
  try {
    const notification = await notificationService.createNotification(data);
    emitNotification(io, data.user.toString(), notification);
    return notification;
  } catch (error) {
    logger.error(`Error creating and emitting notification:`, error);
    throw error;
  }
};
