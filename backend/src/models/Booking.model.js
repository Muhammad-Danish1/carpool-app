const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Booking details
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
  
  // Pricing
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
  
  // Payment
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  
  // Pickup/Dropoff
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
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'],
    default: 'pending'
  },
  confirmationCode: String,
  qrCode: String, // QR code for ticket validation
  
  // Cancellation
  cancellationReason: String,
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cancelledAt: Date,
  refundAmount: Number,
  refundStatus: {
    type: String,
    enum: ['none', 'pending', 'processed', 'failed']
  },
  
  // Special requests
  specialRequests: String,
  luggageCount: {
    type: Number,
    default: 1
  },
  
  // Ratings and reviews
  isRated: {
    type: Boolean,
    default: false
  },
  rating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating'
  },
  
  // Timestamps
  confirmedAt: Date,
  completedAt: Date
  
}, {
  timestamps: true
});

// Indexes
bookingSchema.index({ passenger: 1, status: 1, createdAt: -1 });
bookingSchema.index({ trip: 1, status: 1 });
bookingSchema.index({ driver: 1, status: 1 });
bookingSchema.index({ bookingNumber: 1 });

// Generate unique booking number before saving
bookingSchema.pre('save', async function(next) {
  if (this.isNew && !this.bookingNumber) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    this.bookingNumber = `BK-${timestamp}-${random}`;
  }
  next();
});

// Generate confirmation code
bookingSchema.methods.generateConfirmationCode = function() {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  this.confirmationCode = code;
  return code;
};

// Check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  if (this.status === 'completed' || this.status === 'cancelled') {
    return false;
  }
  
  // Add any time-based logic here
  return true;
};

// Calculate refund amount based on cancellation policy
bookingSchema.methods.calculateRefund = function(trip) {
  if (this.status !== 'confirmed' && this.status !== 'pending') {
    return 0;
  }
  
  const now = new Date();
  const departureTime = new Date(trip.departureTime);
  const hoursUntilDeparture = (departureTime - now) / (1000 * 60 * 60);
  
  let refundPercentage = 0;
  
  if (hoursUntilDeparture > 24) {
    refundPercentage = 100; // Full refund
  } else if (hoursUntilDeparture > 12) {
    refundPercentage = 75;
  } else if (hoursUntilDeparture > 6) {
    refundPercentage = 50;
  } else if (hoursUntilDeparture > 2) {
    refundPercentage = 25;
  }
  // No refund if less than 2 hours
  
  return (this.finalAmount * refundPercentage) / 100;
};

module.exports = mongoose.model('Booking', bookingSchema);
