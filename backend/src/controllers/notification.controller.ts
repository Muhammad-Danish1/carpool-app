import { Response } from 'express';
import notificationService from '../services/notification.service';
import asyncHandler from '../utils/async-handler';
import ApiResponse from '../utils/api-response';
import { AuthRequest } from '../middleware/auth.middleware';

export const getUserNotifications = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await notificationService.getUserNotifications(req.user!._id, req.query);
  
  res.status(200).json(
    new ApiResponse(200, result, 'Notifications fetched successfully')
  );
});

export const markAsRead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const notification = await notificationService.markAsRead(req.params.notificationId, req.user!._id);
  
  res.status(200).json(
    new ApiResponse(200, notification, 'Notification marked as read')
  );
});

export const markAllAsRead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await notificationService.markAllAsRead(req.user!._id);
  
  res.status(200).json(
    new ApiResponse(200, result, 'All notifications marked as read')
  );
});
