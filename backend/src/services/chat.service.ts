import { Types } from 'mongoose';
import Conversation from '../models/conversation.model';
import Message from '../models/message.model';
import ApiError from '../utils/api-error';

const getOrCreateConversation = async (userId: Types.ObjectId, otherUserId: string) => {
  const participantIds = [userId.toString(), otherUserId].sort();
  
  let conversation = await Conversation.findOne({
    participants: { $all: participantIds, $size: 2 }
  }).populate('participants');
  
  if (!conversation) {
    conversation = await Conversation.create({
      participants: participantIds
    });
    await conversation.populate('participants');
  }
  
  return conversation;
};

const getUserConversations = async (userId: Types.ObjectId) => {
  const conversations = await Conversation.find({
    participants: userId,
    isActive: true
  })
    .populate('participants')
    .sort({ 'lastMessage.createdAt': -1 });
  
  return conversations;
};

const sendMessage = async (
  userId: Types.ObjectId,
  conversationId: string,
  content: string,
  messageType: string = 'text'
) => {
  const conversation = await Conversation.findById(conversationId);
  
  if (!conversation) {
    throw new ApiError(404, 'Conversation not found');
  }
  
  if (!conversation.participants.some((p: any) => p.toString() === userId.toString())) {
    throw new ApiError(403, 'You are not a participant in this conversation');
  }
  
  const recipientId = conversation.participants.find((p: any) => p.toString() !== userId.toString());
  
  const message = await Message.create({
    conversation: conversationId,
    sender: userId,
    recipient: recipientId,
    content,
    messageType,
    status: 'sent'
  });
  
  conversation.lastMessage = {
    content,
    sender: userId,
    createdAt: new Date()
  };
  
  await conversation.incrementUnread(recipientId as Types.ObjectId);
  await conversation.save();
  
  await message.populate('sender recipient');
  
  return message;
};

const getConversationMessages = async (userId: Types.ObjectId, conversationId: string, query: { page?: number; limit?: number }) => {
  const conversation = await Conversation.findById(conversationId);
  
  if (!conversation) {
    throw new ApiError(404, 'Conversation not found');
  }
  
  if (!conversation.participants.some((p: any) => p.toString() === userId.toString())) {
    throw new ApiError(403, 'You are not a participant in this conversation');
  }
  
  const {
    page = 1,
    limit = 50
  } = query;
  
  const skip = (page - 1) * limit;
  
  const [messages, total] = await Promise.all([
    Message.find({ conversation: conversationId, isDeleted: false })
      .populate('sender recipient')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Message.countDocuments({ conversation: conversationId, isDeleted: false })
  ]);
  
  return {
    messages: messages.reverse(),
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

const markMessagesAsRead = async (userId: Types.ObjectId, conversationId: string) => {
  const conversation = await Conversation.findById(conversationId);
  
  if (!conversation) {
    throw new ApiError(404, 'Conversation not found');
  }
  
  await Promise.all([
    Message.updateMany(
      { conversation: conversationId, recipient: userId, status: { $ne: 'read' } },
      { status: 'read', readAt: new Date() }
    ),
    conversation.markAsRead(userId)
  ]);
  
  return { message: 'Messages marked as read' };
};

export default {
  getOrCreateConversation,
  getUserConversations,
  sendMessage,
  getConversationMessages,
  markMessagesAsRead
};
