import mongoose, { Schema } from 'mongoose';
import { IBooking } from '../interfaces/booking.interface';

const bookingSchema = new Schema<IBooking>({
  trip: {
    type: Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  passenger: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  bookingNumber: {
    type: String,
    unique: true,
    required: true
  },
  seats: [{
    seatNumber: {
      type: Number,
      required: true
    },
    passengerName: String,
    passengerPhone: String
  }],
  numberOfSeats: {
    type: Number,
    required: true,
    min: 1
  },
  
  pricePerSeat: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  serviceFee: {
    type: Number,
    default: 0
  },
  taxes: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  finalAmount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'partially_paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'wallet', 'cash', 'bank_transfer'],
    default: 'card'
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  },
  
  pickupLocation: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    notes: String
  },
  dropoffLocation: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    notes: String
  },
  
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'],
    default: 'pending'
  },
  confirmationCode: String,
  qrCode: String,
  
  cancellationReason: String,
  cancelledBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  cancelledAt: Date,
  refundAmount: Number,
  refundStatus: {
    type: String,
    enum: ['none', 'pending', 'processed', 'failed']
  },
  
  specialRequests: String,
  luggageCount: {
    type: Number,
    default: 1
  },
  
  isRated: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Schema.Types.ObjectId,
    ref: 'Rating'
  },
  
  confirmedAt: Date,
  completedAt: Date
}, {
  timestamps: true
});

bookingSchema.index({ passenger: 1, status: 1, createdAt: -1 });
bookingSchema.index({ trip: 1, status: 1 });
bookingSchema.index({ driver: 1, status: 1 });
bookingSchema.index({ bookingNumber: 1 });

bookingSchema.pre('save', async function(next) {
  if (this.isNew && !this.bookingNumber) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    this.bookingNumber = `BK-${timestamp}-${random}`;
  }
  next();
});

bookingSchema.methods.generateConfirmationCode = function() {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  this.confirmationCode = code;
  return code;
};

bookingSchema.methods.canBeCancelled = function() {
  if (this.status === 'completed' || this.status === 'cancelled') {
    return false;
  }
  
  return true;
};

bookingSchema.methods.calculateRefund = function(trip: any) {
  if (this.status !== 'confirmed' && this.status !== 'pending') {
    return 0;
  }
  
  const now = new Date();
  const departureTime = new Date(trip.departureTime);
  const hoursUntilDeparture = (departureTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  let refundPercentage = 0;
  
  if (hoursUntilDeparture > 24) {
    refundPercentage = 100;
  } else if (hoursUntilDeparture > 12) {
    refundPercentage = 75;
  } else if (hoursUntilDeparture > 6) {
    refundPercentage = 50;
  } else if (hoursUntilDeparture > 2) {
    refundPercentage = 25;
  }
  
  return (this.finalAmount * refundPercentage) / 100;
};

export default mongoose.model<IBooking>('Booking', bookingSchema);
