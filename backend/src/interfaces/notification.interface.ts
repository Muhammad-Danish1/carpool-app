import { Document, Types } from 'mongoose';

export type NotificationType = 
  | 'booking_confirmed'
  | 'booking_cancelled'
  | 'trip_reminder'
  | 'payment_received'
  | 'payment_failed'
  | 'new_message'
  | 'rating_received'
  | 'trip_updated'
  | 'trip_cancelled'
  | 'system'
  | 'promotion';

export interface IDeliveryStatus {
  push?: {
    sent: boolean;
    sentAt?: Date;
    error?: string;
  };
  email?: {
    sent: boolean;
    sentAt?: Date;
    error?: string;
  };
  sms?: {
    sent: boolean;
    sentAt?: Date;
    error?: string;
  };
}

export interface INotification extends Document {
  user: Types.ObjectId;
  title: string;
  message: string;
  type: NotificationType;
  relatedTrip?: Types.ObjectId;
  relatedBooking?: Types.ObjectId;
  relatedUser?: Types.ObjectId;
  action?: string;
  actionUrl?: string;
  isRead: boolean;
  readAt?: Date;
  deliveryStatus?: IDeliveryStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  markAsRead(): Promise<void>;
}
