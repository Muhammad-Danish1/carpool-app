import { Types } from 'mongoose';
import Rating from '../models/rating.model';
import Booking from '../models/booking.model';
import User from '../models/user.model';
import ApiError from '../utils/api-error';

interface CreateRatingData {
  rating: number;
  categoryRatings?: any;
  review?: string;
  tags?: string[];
}

const createRating = async (userId: Types.ObjectId, bookingId: string, data: CreateRatingData) => {
  const booking = await Booking.findById(bookingId).populate('trip');
  
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }
  
  if (booking.passenger.toString() !== userId.toString() && booking.driver.toString() !== userId.toString()) {
    throw new ApiError(403, 'You can only rate your own bookings');
  }
  
  if (booking.status !== 'completed') {
    throw new ApiError(400, 'Can only rate completed trips');
  }
  
  if (booking.isRated) {
    throw new ApiError(400, 'Booking already rated');
  }
  
  const isDriver = booking.driver.toString() === userId.toString();
  const revieweeId = isDriver ? booking.passenger : booking.driver;
  
  const rating = await Rating.create({
    trip: booking.trip,
    booking: bookingId,
    reviewer: userId,
    reviewee: revieweeId,
    rating: data.rating,
    categoryRatings: data.categoryRatings,
    review: data.review,
    tags: data.tags,
    ratingType: isDriver ? 'passenger' : 'driver'
  });
  
  booking.isRated = true;
  booking.rating = rating._id as Types.ObjectId;
  await booking.save();
  
  const userRatings = await Rating.find({ reviewee: revieweeId, isVisible: true });
  const averageRating = userRatings.reduce((sum, r) => sum + r.rating, 0) / userRatings.length;
  
  await User.findByIdAndUpdate(revieweeId, {
    'stats.averageRating': Math.round(averageRating * 10) / 10,
    'stats.totalRatings': userRatings.length
  });
  
  await rating.populate('reviewer reviewee trip');
  
  return rating;
};

const getUserRatings = async (userId: string, type: 'received' | 'given' = 'received') => {
  const filter = type === 'received'
    ? { reviewee: userId, isVisible: true }
    : { reviewer: userId };
  
  const ratings = await Rating.find(filter)
    .populate('reviewer reviewee trip booking')
    .sort({ createdAt: -1 });
  
  const stats = type === 'received' && ratings.length > 0
    ? {
        averageRating: Math.round((ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length) * 10) / 10,
        totalRatings: ratings.length,
        distribution: {
          5: ratings.filter(r => r.rating === 5).length,
          4: ratings.filter(r => r.rating === 4).length,
          3: ratings.filter(r => r.rating === 3).length,
          2: ratings.filter(r => r.rating === 2).length,
          1: ratings.filter(r => r.rating === 1).length
        }
      }
    : null;
  
  return { ratings, stats };
};

export default {
  createRating,
  getUserRatings
};
