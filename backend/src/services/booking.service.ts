import mongoose, { Types } from 'mongoose';
import Booking from '../models/booking.model';
import Trip from '../models/trip.model';
import ApiError from '../utils/api-error';

interface CreateBookingData {
  numberOfSeats: number;
  seats: Array<{
    seatNumber: number;
    passengerName?: string;
    passengerPhone?: string;
  }>;
  paymentMethod: 'card' | 'wallet' | 'cash' | 'bank_transfer';
  pickupLocation?: any;
  dropoffLocation?: any;
  specialRequests?: string;
  luggageCount?: number;
}

const createBooking = async (userId: Types.ObjectId, tripId: string, data: CreateBookingData) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const trip = await Trip.findOne({ _id: tripId, status: 'scheduled' }).session(session);
    
    if (!trip) {
      throw new ApiError(404, 'Trip not found or not available for booking');
    }
    
    if (trip.driver.toString() === userId.toString()) {
      throw new ApiError(400, 'You cannot book your own trip');
    }
    
    if (trip.availableSeats < data.numberOfSeats) {
      throw new ApiError(400, `Only ${trip.availableSeats} seats available`);
    }
    
    const seatNumbers = data.seats.map(s => s.seatNumber);
    const uniqueSeats = new Set(seatNumbers);
    
    if (uniqueSeats.size !== seatNumbers.length) {
      throw new ApiError(400, 'Duplicate seat numbers');
    }
    
    for (const seatNum of seatNumbers) {
      const seat = trip.seats.find((s: any) => s.seatNumber === seatNum);
      if (!seat || seat.status !== 'available') {
        throw new ApiError(400, `Seat ${seatNum} is not available`);
      }
    }
    
    const totalAmount = trip.pricePerSeat * data.numberOfSeats;
    const serviceFee = totalAmount * 0.05;
    const taxes = totalAmount * 0.02;
    const finalAmount = totalAmount + serviceFee + taxes;
    
    const booking = new Booking({
      trip: tripId,
      passenger: userId,
      driver: trip.driver,
      seats: data.seats,
      numberOfSeats: data.numberOfSeats,
      pricePerSeat: trip.pricePerSeat,
      totalAmount,
      serviceFee,
      taxes,
      discount: 0,
      finalAmount,
      currency: trip.currency,
      paymentMethod: data.paymentMethod,
      paymentStatus: 'pending',
      pickupLocation: data.pickupLocation,
      dropoffLocation: data.dropoffLocation,
      specialRequests: data.specialRequests,
      luggageCount: data.luggageCount || 1,
      status: 'pending'
    });
    
    await booking.save({ session });
    
    for (const seatData of data.seats) {
      await trip.bookSeat(seatData.seatNumber, userId, booking._id as Types.ObjectId);
    }
    
    if (data.paymentMethod === 'wallet' || data.paymentMethod === 'cash') {
      booking.paymentStatus = 'paid';
      booking.status = 'confirmed';
      booking.confirmedAt = new Date();
      booking.generateConfirmationCode();
      await booking.save({ session });
    }
    
    await session.commitTransaction();
    
    await booking.populate('trip passenger driver');
    
    return booking;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getUserBookings = async (userId: Types.ObjectId, query: { status?: string; page?: number; limit?: number }) => {
  const {
    status,
    page = 1,
    limit = 20
  } = query;
  
  const filter: any = { passenger: userId };
  
  if (status) {
    filter.status = status;
  }
  
  const skip = (page - 1) * limit;
  
  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .populate('trip passenger driver')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Booking.countDocuments(filter)
  ]);
  
  return {
    bookings,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

const getBookingById = async (bookingId: string, userId: Types.ObjectId) => {
  const booking = await Booking.findById(bookingId)
    .populate('trip passenger driver payment');
  
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }
  
  if (booking.passenger.toString() !== userId.toString() && booking.driver.toString() !== userId.toString()) {
    throw new ApiError(403, 'You do not have permission to view this booking');
  }
  
  return booking;
};

const updateBookingStatus = async (bookingId: string, userId: Types.ObjectId, status: string) => {
  const booking = await Booking.findById(bookingId).populate('trip');
  
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }
  
  if (booking.driver.toString() !== userId.toString()) {
    throw new ApiError(403, 'Only the driver can update booking status');
  }
  
  booking.status = status as any;
  
  if (status === 'confirmed') {
    booking.confirmedAt = new Date();
  } else if (status === 'completed') {
    booking.completedAt = new Date();
  }
  
  await booking.save();
  await booking.populate('trip passenger driver');
  
  return booking;
};

const cancelBooking = async (bookingId: string, userId: Types.ObjectId, reason?: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const booking = await Booking.findById(bookingId).populate('trip').session(session);
    
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }
    
    if (booking.passenger.toString() !== userId.toString()) {
      throw new ApiError(403, 'You can only cancel your own bookings');
    }
    
    if (!booking.canBeCancelled()) {
      throw new ApiError(400, 'Booking cannot be cancelled');
    }
    
    const trip = await Trip.findById(booking.trip).session(session);
    
    if (!trip) {
      throw new ApiError(404, 'Trip not found');
    }
    
    for (const seat of booking.seats) {
      await trip.cancelSeat(seat.seatNumber);
    }
    
    const refundAmount = booking.calculateRefund(trip);
    
    booking.status = 'cancelled';
    booking.cancellationReason = reason;
    booking.cancelledBy = userId;
    booking.cancelledAt = new Date();
    booking.refundAmount = refundAmount;
    booking.refundStatus = refundAmount > 0 ? 'pending' : 'none';
    
    await booking.save({ session });
    
    await session.commitTransaction();
    
    await booking.populate('trip passenger driver');
    
    return booking;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export default {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking
};
