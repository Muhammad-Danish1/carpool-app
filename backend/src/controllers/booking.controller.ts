import { Response } from 'express';
import bookingService from '../services/booking.service';
import asyncHandler from '../utils/async-handler';
import ApiResponse from '../utils/api-response';
import { AuthRequest } from '../middleware/auth.middleware';

export const createBooking = asyncHandler(async (req: AuthRequest, res: Response) => {
  const booking = await bookingService.createBooking(req.user!._id, req.params.tripId, req.body);
  
  res.status(201).json(
    new ApiResponse(201, booking, 'Booking created successfully')
  );
});

export const getUserBookings = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await bookingService.getUserBookings(req.user!._id, req.query);
  
  res.status(200).json(
    new ApiResponse(200, result, 'Bookings fetched successfully')
  );
});

export const getBookingById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const booking = await bookingService.getBookingById(req.params.bookingId, req.user!._id);
  
  res.status(200).json(
    new ApiResponse(200, booking, 'Booking fetched successfully')
  );
});

export const updateBookingStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const booking = await bookingService.updateBookingStatus(req.params.bookingId, req.user!._id, req.body.status);
  
  res.status(200).json(
    new ApiResponse(200, booking, 'Booking status updated successfully')
  );
});

export const cancelBooking = asyncHandler(async (req: AuthRequest, res: Response) => {
  const booking = await bookingService.cancelBooking(req.params.bookingId, req.user!._id, req.body.reason);
  
  res.status(200).json(
    new ApiResponse(200, booking, 'Booking cancelled successfully')
  );
});
