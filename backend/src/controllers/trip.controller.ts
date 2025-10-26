import { Response } from 'express';
import tripService from '../services/trip.service';
import asyncHandler from '../utils/async-handler';
import ApiResponse from '../utils/api-response';
import { AuthRequest } from '../middleware/auth.middleware';

export const createTrip = asyncHandler(async (req: AuthRequest, res: Response) => {
  const trip = await tripService.createTrip(req.user!._id, req.body);
  
  res.status(201).json(
    new ApiResponse(201, trip, 'Trip created successfully')
  );
});

export const searchTrips = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await tripService.searchTrips(req.query);
  
  res.status(200).json(
    new ApiResponse(200, result, 'Trips fetched successfully')
  );
});

export const getTripById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const trip = await tripService.getTripById(req.params.tripId);
  
  res.status(200).json(
    new ApiResponse(200, trip, 'Trip fetched successfully')
  );
});

export const getUserTrips = asyncHandler(async (req: AuthRequest, res: Response) => {
  const role = req.query.role as 'driver' | 'passenger' || 'driver';
  const trips = await tripService.getUserTrips(req.user!._id, role);
  
  res.status(200).json(
    new ApiResponse(200, trips, 'User trips fetched successfully')
  );
});

export const updateTrip = asyncHandler(async (req: AuthRequest, res: Response) => {
  const trip = await tripService.updateTrip(req.params.tripId, req.user!._id, req.body);
  
  res.status(200).json(
    new ApiResponse(200, trip, 'Trip updated successfully')
  );
});

export const cancelTrip = asyncHandler(async (req: AuthRequest, res: Response) => {
  const trip = await tripService.cancelTrip(req.params.tripId, req.user!._id, req.body.reason);
  
  res.status(200).json(
    new ApiResponse(200, trip, 'Trip cancelled successfully')
  );
});
