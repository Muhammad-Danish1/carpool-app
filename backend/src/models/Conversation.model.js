const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  
  // Related trip or booking
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip'
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  
  // Last message info
  lastMessage: {
    content: String,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: Date
  },
  
  // Unread counts for each participant
  unreadCounts: {
    type: Map,
    of: Number,
    default: new Map()
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Archive status for each participant
  archivedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
  
}, {
  timestamps: true
});

// Indexes
conversationSchema.index({ participants: 1 });
conversationSchema.index({ trip: 1 });
conversationSchema.index({ booking: 1 });
conversationSchema.index({ 'lastMessage.createdAt': -1 });

// Ensure only 2 participants
conversationSchema.pre('save', function(next) {
  if (this.participants.length !== 2) {
    next(new Error('Conversation must have exactly 2 participants'));
  }
  next();
});

// Method to increment unread count
conversationSchema.methods.incrementUnread = async function(userId) {
  const currentCount = this.unreadCounts.get(userId.toString()) || 0;
  this.unreadCounts.set(userId.toString(), currentCount + 1);
  await this.save();
};

// Method to mark as read
conversationSchema.methods.markAsRead = async function(userId) {
  this.unreadCounts.set(userId.toString(), 0);
  await this.save();
};

module.exports = mongoose.model('Conversation', conversationSchema);
