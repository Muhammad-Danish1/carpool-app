import { Document, Types } from 'mongoose';

export interface IBookingSeat {
  seatNumber: number;
  passengerName?: string;
  passengerPhone?: string;
}

export interface IBookingLocation {
  address?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  notes?: string;
}

export interface IBooking extends Document {
  trip: Types.ObjectId;
  passenger: Types.ObjectId;
  driver: Types.ObjectId;
  bookingNumber: string;
  seats: IBookingSeat[];
  numberOfSeats: number;
  pricePerSeat: number;
  totalAmount: number;
  serviceFee: number;
  taxes: number;
  discount: number;
  finalAmount: number;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'partially_paid' | 'refunded' | 'failed';
  paymentMethod: 'card' | 'wallet' | 'cash' | 'bank_transfer';
  payment?: Types.ObjectId;
  pickupLocation?: IBookingLocation;
  dropoffLocation?: IBookingLocation;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  confirmationCode?: string;
  qrCode?: string;
  cancellationReason?: string;
  cancelledBy?: Types.ObjectId;
  cancelledAt?: Date;
  refundAmount?: number;
  refundStatus?: 'none' | 'pending' | 'processed' | 'failed';
  specialRequests?: string;
  luggageCount: number;
  isRated: boolean;
  rating?: Types.ObjectId;
  confirmedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  generateConfirmationCode(): string;
  canBeCancelled(): boolean;
  calculateRefund(trip: any): number;
}
