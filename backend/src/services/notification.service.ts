import { Types } from 'mongoose';
import Notification from '../models/notification.model';
import { NotificationType } from '../interfaces/notification.interface';
import ApiError from '../utils/api-error';

const createNotification = async (data: {
  user: Types.ObjectId;
  title: string;
  message: string;
  type: NotificationType;
  relatedTrip?: Types.ObjectId;
  relatedBooking?: Types.ObjectId;
  relatedUser?: Types.ObjectId;
  action?: string;
  actionUrl?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}) => {
  const notification = await Notification.create(data);
  return notification;
};

const getUserNotifications = async (userId: Types.ObjectId, query: { page?: number; limit?: number }) => {
  const {
    page = 1,
    limit = 50
  } = query;
  
  const skip = (page - 1) * limit;
  
  const [notifications, total, unreadCount] = await Promise.all([
    Notification.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('relatedUser relatedTrip relatedBooking'),
    Notification.countDocuments({ user: userId }),
    Notification.countDocuments({ user: userId, isRead: false })
  ]);
  
  return {
    notifications,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    },
    unreadCount
  };
};

const markAsRead = async (notificationId: string, userId: Types.ObjectId) => {
  const notification = await Notification.findOne({ _id: notificationId, user: userId });
  
  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }
  
  if (!notification.isRead) {
    await notification.markAsRead();
  }
  
  return notification;
};

const markAllAsRead = async (userId: Types.ObjectId) => {
  await Notification.updateMany(
    { user: userId, isRead: false },
    { isRead: true, readAt: new Date() }
  );
  
  return { message: 'All notifications marked as read' };
};

export default {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead
};
