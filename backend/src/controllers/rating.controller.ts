import { Response } from 'express';
import ratingService from '../services/rating.service';
import asyncHandler from '../utils/async-handler';
import ApiResponse from '../utils/api-response';
import { AuthRequest } from '../middleware/auth.middleware';

export const createRating = asyncHandler(async (req: AuthRequest, res: Response) => {
  const rating = await ratingService.createRating(req.user!._id, req.params.bookingId, req.body);
  
  res.status(201).json(
    new ApiResponse(201, rating, 'Rating created successfully')
  );
});

export const getUserRatings = asyncHandler(async (req: AuthRequest, res: Response) => {
  const type = req.query.type as 'received' | 'given' || 'received';
  const result = await ratingService.getUserRatings(req.params.userId, type);
  
  res.status(200).json(
    new ApiResponse(200, result, 'Ratings fetched successfully')
  );
});
