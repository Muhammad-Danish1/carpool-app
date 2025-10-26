import mongoose, { Schema, Types } from 'mongoose';
import { IConversation } from '../interfaces/conversation.interface';

const conversationSchema = new Schema<IConversation>({
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  
  trip: {
    type: Schema.Types.ObjectId,
    ref: 'Trip'
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  },
  
  lastMessage: {
    content: String,
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: Date
  },
  
  unreadCounts: {
    type: Map,
    of: Number,
    default: new Map()
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  archivedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

conversationSchema.index({ participants: 1 });
conversationSchema.index({ trip: 1 });
conversationSchema.index({ booking: 1 });
conversationSchema.index({ 'lastMessage.createdAt': -1 });

conversationSchema.pre('save', function(next) {
  if (this.participants.length !== 2) {
    next(new Error('Conversation must have exactly 2 participants'));
  }
  next();
});

conversationSchema.methods.incrementUnread = async function(userId: Types.ObjectId) {
  const currentCount = this.unreadCounts.get(userId.toString()) || 0;
  this.unreadCounts.set(userId.toString(), currentCount + 1);
  await this.save();
};

conversationSchema.methods.markAsRead = async function(userId: Types.ObjectId) {
  this.unreadCounts.set(userId.toString(), 0);
  await this.save();
};

export default mongoose.model<IConversation>('Conversation', conversationSchema);
