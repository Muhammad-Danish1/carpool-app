const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  
  // Route information
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
  
  // Timing
  departureTime: {
    type: Date,
    required: true
  },
  estimatedArrivalTime: Date,
  estimatedDuration: Number, // in minutes
  
  // Pricing
  pricePerSeat: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  
  // Seats
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    }
  }],
  
  // Trip details
  distance: Number, // in km
  description: String,
  
  // Preferences
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
  
  // Amenities
  amenities: {
    airConditioning: Boolean,
    wifi: Boolean,
    charger: Boolean,
    music: Boolean
  },
  
  // Status
  status: {
    type: String,
    enum: ['scheduled', 'in_progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  cancellationReason: String,
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cancelledAt: Date,
  
  // Timestamps
  actualDepartureTime: Date,
  actualArrivalTime: Date,
  
  // Recurring trip
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurrencePattern: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly']
    },
    daysOfWeek: [Number], // 0-6, Sunday-Saturday
    endDate: Date
  },
  
  // Statistics
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

// Indexes for efficient queries
tripSchema.index({ driver: 1, status: 1 });
tripSchema.index({ 'origin.city': 1, 'destination.city': 1, departureTime: 1 });
tripSchema.index({ departureTime: 1, status: 1 });
tripSchema.index({ status: 1, availableSeats: 1 });

// Initialize seats when trip is created
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

// Method to book a seat
tripSchema.methods.bookSeat = async function(seatNumber, passengerId, bookingId) {
  const seat = this.seats.find(s => s.seatNumber === seatNumber);
  
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

// Method to cancel a seat booking
tripSchema.methods.cancelSeat = async function(seatNumber) {
  const seat = this.seats.find(s => s.seatNumber === seatNumber);
  
  if (!seat || seat.status === 'available') {
    throw new Error('Seat is not booked');
  }
  
  seat.status = 'available';
  seat.passenger = null;
  seat.booking = null;
  this.availableSeats += 1;
  this.stats.totalPassengers -= 1;
  
  await this.save();
};

// Check if trip can be cancelled
tripSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const departureTime = new Date(this.departureTime);
  const hoursUntilDeparture = (departureTime - now) / (1000 * 60 * 60);
  
  return hoursUntilDeparture > 2; // Can cancel if more than 2 hours before departure
};

module.exports = mongoose.model('Trip', tripSchema);
