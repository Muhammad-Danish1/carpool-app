import { Response } from 'express';
import userService from '../services/user.service';
import asyncHandler from '../utils/async-handler';
import ApiResponse from '../utils/api-response';
import { AuthRequest } from '../middleware/auth.middleware';

export const getUserProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await userService.getUserProfile(req.params.userId);
  
  res.status(200).json(
    new ApiResponse(200, result, 'User profile fetched successfully')
  );
});

export const updateUserProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await userService.updateUserProfile(req.user!._id, req.body);
  
  res.status(200).json(
    new ApiResponse(200, user, 'Profile updated successfully')
  );
});

export const addVehicle = asyncHandler(async (req: AuthRequest, res: Response) => {
  const vehicle = await userService.addVehicle(req.user!._id, req.body);
  
  res.status(201).json(
    new ApiResponse(201, vehicle, 'Vehicle added successfully')
  );
});

export const updateVehicle = asyncHandler(async (req: AuthRequest, res: Response) => {
  const vehicle = await userService.updateVehicle(req.user!._id, req.params.vehicleId, req.body);
  
  res.status(200).json(
    new ApiResponse(200, vehicle, 'Vehicle updated successfully')
  );
});

export const deleteVehicle = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await userService.deleteVehicle(req.user!._id, req.params.vehicleId);
  
  res.status(200).json(
    new ApiResponse(200, result, 'Vehicle deleted successfully')
  );
});
