import { Types } from 'mongoose';
import Trip from '../models/trip.model';
import Vehicle from '../models/vehicle.model';
import ApiError from '../utils/api-error';

interface CreateTripData {
  vehicle: string;
  origin: {
    address: string;
    city?: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  destination: {
    address: string;
    city?: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  departureTime: Date;
  estimatedArrivalTime?: Date;
  estimatedDuration?: number;
  pricePerSeat: number;
  currency?: string;
  totalSeats: number;
  distance?: number;
  description?: string;
  preferences?: any;
  amenities?: any;
}

interface SearchTripsQuery {
  from?: string;
  to?: string;
  date?: string;
  passengers?: number;
  page?: number;
  limit?: number;
}

const createTrip = async (userId: Types.ObjectId, data: CreateTripData) => {
  const vehicle = await Vehicle.findOne({ _id: data.vehicle, owner: userId, isActive: true });
  
  if (!vehicle) {
    throw new ApiError(404, 'Vehicle not found or not owned by user');
  }
  
  if (vehicle.verificationStatus !== 'verified') {
    throw new ApiError(400, 'Vehicle must be verified before creating a trip');
  }
  
  const trip = await Trip.create({
    driver: userId,
    vehicle: data.vehicle,
    origin: data.origin,
    destination: data.destination,
    departureTime: data.departureTime,
    estimatedArrivalTime: data.estimatedArrivalTime,
    estimatedDuration: data.estimatedDuration,
    pricePerSeat: data.pricePerSeat,
    currency: data.currency || 'USD',
    totalSeats: data.totalSeats,
    availableSeats: data.totalSeats,
    distance: data.distance,
    description: data.description,
    preferences: data.preferences || {},
    amenities: data.amenities || {},
    status: 'scheduled'
  });
  
  await trip.populate('driver vehicle');
  
  return trip;
};

const searchTrips = async (query: SearchTripsQuery) => {
  const {
    from,
    to,
    date,
    passengers = 1,
    page = 1,
    limit = 20
  } = query;
  
  const filter: any = {
    status: 'scheduled',
    availableSeats: { $gte: passengers },
    departureTime: { $gte: new Date() }
  };
  
  if (from) {
    filter.$or = [
      { 'origin.address': { $regex: from, $options: 'i' } },
      { 'origin.city': { $regex: from, $options: 'i' } }
    ];
  }
  
  if (to) {
    const destinationFilter = {
      $or: [
        { 'destination.address': { $regex: to, $options: 'i' } },
        { 'destination.city': { $regex: to, $options: 'i' } }
      ]
    };
    
    if (filter.$or) {
      filter.$and = [{ $or: filter.$or }, destinationFilter];
      delete filter.$or;
    } else {
      filter.$or = destinationFilter.$or;
    }
  }
  
  if (date) {
    const searchDate = new Date(date);
    const nextDay = new Date(searchDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    filter.departureTime = {
      $gte: searchDate,
      $lt: nextDay
    };
  }
  
  const skip = (page - 1) * limit;
  
  const [trips, total] = await Promise.all([
    Trip.find(filter)
      .populate('driver vehicle')
      .sort({ departureTime: 1 })
      .skip(skip)
      .limit(limit),
    Trip.countDocuments(filter)
  ]);
  
  return {
    trips,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

const getTripById = async (tripId: string) => {
  const trip = await Trip.findById(tripId)
    .populate('driver vehicle');
  
  if (!trip) {
    throw new ApiError(404, 'Trip not found');
  }
  
  return trip;
};

const getUserTrips = async (userId: Types.ObjectId, role: 'driver' | 'passenger' = 'driver') => {
  const filter: any = role === 'driver' ? { driver: userId } : { 'seats.passenger': userId };
  
  const trips = await Trip.find(filter)
    .populate('driver vehicle')
    .sort({ departureTime: -1 });
  
  return trips;
};

const updateTrip = async (tripId: string, userId: Types.ObjectId, updates: Partial<CreateTripData>) => {
  const trip = await Trip.findOne({ _id: tripId, driver: userId });
  
  if (!trip) {
    throw new ApiError(404, 'Trip not found or not owned by user');
  }
  
  if (trip.status !== 'scheduled') {
    throw new ApiError(400, 'Can only update scheduled trips');
  }
  
  if (trip.stats.totalPassengers > 0) {
    throw new ApiError(400, 'Cannot update trip with existing bookings');
  }
  
  Object.assign(trip, updates);
  await trip.save();
  await trip.populate('driver vehicle');
  
  return trip;
};

const cancelTrip = async (tripId: string, userId: Types.ObjectId, reason?: string) => {
  const trip = await Trip.findOne({ _id: tripId, driver: userId });
  
  if (!trip) {
    throw new ApiError(404, 'Trip not found or not owned by user');
  }
  
  if (!trip.canBeCancelled()) {
    throw new ApiError(400, 'Trip cannot be cancelled (less than 2 hours before departure)');
  }
  
  if (trip.status === 'cancelled') {
    throw new ApiError(400, 'Trip is already cancelled');
  }
  
  trip.status = 'cancelled';
  trip.cancellationReason = reason;
  trip.cancelledBy = userId;
  trip.cancelledAt = new Date();
  
  await trip.save();
  await trip.populate('driver vehicle');
  
  return trip;
};

export default {
  createTrip,
  searchTrips,
  getTripById,
  getUserTrips,
  updateTrip,
  cancelTrip
};
