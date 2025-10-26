import mongoose, { Schema, Types } from 'mongoose';
import { ITrip } from '../interfaces/trip.interface';

const tripSchema = new Schema<ITrip>({
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  
  origin: {
    address: {
      type: String,
      required: true
    },
    city: String,
    coordinates: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    }
  },
  destination: {
    address: {
      type: String,
      required: true
    },
    city: String,
    coordinates: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    }
  },
  waypoints: [{
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    order: Number
  }],
  
  departureTime: {
    type: Date,
    required: true
  },
  estimatedArrivalTime: Date,
  estimatedDuration: Number,
  
  pricePerSeat: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  
  totalSeats: {
    type: Number,
    required: true,
    min: 1,
    max: 7
  },
  availableSeats: {
    type: Number,
    required: true
  },
  seats: [{
    seatNumber: Number,
    status: {
      type: String,
      enum: ['available', 'booked', 'reserved'],
      default: 'available'
    },
    passenger: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'Booking'
    }
  }],
  
  distance: Number,
  description: String,
  
  preferences: {
    instantBooking: {
      type: Boolean,
      default: false
    },
    allowPets: {
      type: Boolean,
      default: false
    },
    allowSmoking: {
      type: Boolean,
      default: false
    },
    maxTwoInBack: {
      type: Boolean,
      default: false
    },
    luggageSize: {
      type: String,
      enum: ['small', 'medium', 'large'],
      default: 'medium'
    }
  },
  
  amenities: {
    airConditioning: Boolean,
    wifi: Boolean,
    charger: Boolean,
    music: Boolean
  },
  
  status: {
    type: String,
    enum: ['scheduled', 'in_progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  cancellationReason: String,
  cancelledBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  cancelledAt: Date,
  
  actualDepartureTime: Date,
  actualArrivalTime: Date,
  
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurrencePattern: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly']
    },
    daysOfWeek: [Number],
    endDate: Date
  },
  
  stats: {
    totalEarnings: {
      type: Number,
      default: 0
    },
    totalPassengers: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

tripSchema.index({ driver: 1, status: 1 });
tripSchema.index({ 'origin.city': 1, 'destination.city': 1, departureTime: 1 });
tripSchema.index({ departureTime: 1, status: 1 });
tripSchema.index({ status: 1, availableSeats: 1 });

tripSchema.pre('save', function(next) {
  if (this.isNew && (!this.seats || this.seats.length === 0)) {
    this.seats = Array.from({ length: this.totalSeats }, (_, i) => ({
      seatNumber: i + 1,
      status: 'available'
    }));
    this.availableSeats = this.totalSeats;
  }
  next();
});

tripSchema.methods.bookSeat = async function(seatNumber: number, passengerId: Types.ObjectId, bookingId: Types.ObjectId) {
  const seat = this.seats.find((s: any) => s.seatNumber === seatNumber);
  
  if (!seat || seat.status !== 'available') {
    throw new Error('Seat not available');
  }
  
  seat.status = 'booked';
  seat.passenger = passengerId;
  seat.booking = bookingId;
  this.availableSeats -= 1;
  this.stats.totalPassengers += 1;
  
  await this.save();
};

tripSchema.methods.cancelSeat = async function(seatNumber: number) {
  const seat = this.seats.find((s: any) => s.seatNumber === seatNumber);
  
  if (!seat || seat.status === 'available') {
    throw new Error('Seat is not booked');
  }
  
  seat.status = 'available';
  seat.passenger = undefined;
  seat.booking = undefined;
  this.availableSeats += 1;
  this.stats.totalPassengers -= 1;
  
  await this.save();
};

tripSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const departureTime = new Date(this.departureTime);
  const hoursUntilDeparture = (departureTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  return hoursUntilDeparture > 2;
};

export default mongoose.model<ITrip>('Trip', tripSchema);
