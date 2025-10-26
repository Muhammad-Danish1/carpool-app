import { Response } from 'express';
import chatService from '../services/chat.service';
import asyncHandler from '../utils/async-handler';
import ApiResponse from '../utils/api-response';
import { AuthRequest } from '../middleware/auth.middleware';

export const getOrCreateConversation = asyncHandler(async (req: AuthRequest, res: Response) => {
  const conversation = await chatService.getOrCreateConversation(req.user!._id, req.body.userId);
  
  res.status(200).json(
    new ApiResponse(200, conversation, 'Conversation fetched successfully')
  );
});

export const getUserConversations = asyncHandler(async (req: AuthRequest, res: Response) => {
  const conversations = await chatService.getUserConversations(req.user!._id);
  
  res.status(200).json(
    new ApiResponse(200, conversations, 'Conversations fetched successfully')
  );
});

export const sendMessage = asyncHandler(async (req: AuthRequest, res: Response) => {
  const message = await chatService.sendMessage(
    req.user!._id,
    req.params.conversationId,
    req.body.content,
    req.body.messageType
  );
  
  res.status(201).json(
    new ApiResponse(201, message, 'Message sent successfully')
  );
});

export const getConversationMessages = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await chatService.getConversationMessages(req.user!._id, req.params.conversationId, req.query);
  
  res.status(200).json(
    new ApiResponse(200, result, 'Messages fetched successfully')
  );
});

export const markMessagesAsRead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await chatService.markMessagesAsRead(req.user!._id, req.params.conversationId);
  
  res.status(200).json(
    new ApiResponse(200, result, 'Messages marked as read')
  );
});
