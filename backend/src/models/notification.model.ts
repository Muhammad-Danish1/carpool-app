import mongoose, { Schema } from 'mongoose';
import { INotification } from '../interfaces/notification.interface';

const notificationSchema = new Schema<INotification>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  
  type: {
    type: String,
    enum: [
      'booking_confirmed',
      'booking_cancelled',
      'trip_reminder',
      'payment_received',
      'payment_failed',
      'new_message',
      'rating_received',
      'trip_updated',
      'trip_cancelled',
      'system',
      'promotion'
    ],
    required: true
  },
  
  relatedTrip: {
    type: Schema.Types.ObjectId,
    ref: 'Trip'
  },
  relatedBooking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  },
  relatedUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  
  action: String,
  actionUrl: String,
  
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  
  deliveryStatus: {
    push: {
      sent: Boolean,
      sentAt: Date,
      error: String
    },
    email: {
      sent: Boolean,
      sentAt: Date,
      error: String
    },
    sms: {
      sent: Boolean,
      sentAt: Date,
      error: String
    }
  },
  
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  metadata: Schema.Types.Mixed
}, {
  timestamps: true
});

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index(
  { readAt: 1 },
  { expireAfterSeconds: 30 * 24 * 60 * 60, partialFilterExpression: { isRead: true } }
);

notificationSchema.methods.markAsRead = async function() {
  this.isRead = true;
  this.readAt = new Date();
  await this.save();
};

export default mongoose.model<INotification>('Notification', notificationSchema);
