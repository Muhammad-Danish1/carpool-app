const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Notification content
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  
  // Type
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
  
  // Related entities
  relatedTrip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip'
  },
  relatedBooking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  relatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Deep link/action
  action: {
    type: String
  },
  actionUrl: String,
  
  // Status
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  
  // Delivery status
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
  
  // Priority
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Metadata
  metadata: mongoose.Schema.Types.Mixed
  
}, {
  timestamps: true
});

// Indexes
notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ createdAt: -1 });

// Auto-delete old read notifications after 30 days
notificationSchema.index(
  { readAt: 1 },
  { expireAfterSeconds: 30 * 24 * 60 * 60, partialFilterExpression: { isRead: true } }
);

// Method to mark as read
notificationSchema.methods.markAsRead = async function() {
  this.isRead = true;
  this.readAt = new Date();
  await this.save();
};

module.exports = mongoose.model('Notification', notificationSchema);
