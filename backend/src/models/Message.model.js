const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Message content
  content: {
    type: String,
    required: true,
    trim: true
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'location', 'booking', 'system'],
    default: 'text'
  },
  
  // Additional data for different message types
  attachments: [{
    type: {
      type: String,
      enum: ['image', 'file']
    },
    url: String,
    filename: String,
    size: Number
  }],
  
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  
  bookingReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  
  // Message status
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  },
  deliveredAt: Date,
  readAt: Date,
  
  // Soft delete
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
  
}, {
  timestamps: true
});

// Indexes
messageSchema.index({ conversation: 1, createdAt: -1 });
messageSchema.index({ sender: 1, recipient: 1 });
messageSchema.index({ status: 1 });

module.exports = mongoose.model('Message', messageSchema);
