import { Document, Types } from 'mongoose';

export interface ILocation {
  address: string;
  city?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface IWaypoint {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  order: number;
}

export interface ISeat {
  seatNumber: number;
  status: 'available' | 'booked' | 'reserved';
  passenger?: Types.ObjectId;
  booking?: Types.ObjectId;
}

export interface ITripPreferences {
  instantBooking: boolean;
  allowPets: boolean;
  allowSmoking: boolean;
  maxTwoInBack: boolean;
  luggageSize: 'small' | 'medium' | 'large';
}

export interface IAmenities {
  airConditioning?: boolean;
  wifi?: boolean;
  charger?: boolean;
  music?: boolean;
}

export interface IRecurrencePattern {
  frequency: 'daily' | 'weekly' | 'monthly';
  daysOfWeek?: number[];
  endDate?: Date;
}

export interface ITripStats {
  totalEarnings: number;
  totalPassengers: number;
  averageRating: number;
}

export interface ITrip extends Document {
  driver: Types.ObjectId;
  vehicle: Types.ObjectId;
  origin: ILocation;
  destination: ILocation;
  waypoints?: IWaypoint[];
  departureTime: Date;
  estimatedArrivalTime?: Date;
  estimatedDuration?: number;
  pricePerSeat: number;
  currency: string;
  totalSeats: number;
  availableSeats: number;
  seats: ISeat[];
  distance?: number;
  description?: string;
  preferences: ITripPreferences;
  amenities: IAmenities;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  cancellationReason?: string;
  cancelledBy?: Types.ObjectId;
  cancelledAt?: Date;
  actualDepartureTime?: Date;
  actualArrivalTime?: Date;
  isRecurring: boolean;
  recurrencePattern?: IRecurrencePattern;
  stats: ITripStats;
  createdAt: Date;
  updatedAt: Date;
  bookSeat(seatNumber: number, passengerId: Types.ObjectId, bookingId: Types.ObjectId): Promise<void>;
  cancelSeat(seatNumber: number): Promise<void>;
  canBeCancelled(): boolean;
}
