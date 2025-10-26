const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  make: {
    type: String,
    required: [true, 'Vehicle make is required'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Vehicle model is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Vehicle year is required'],
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  licensePlate: {
    type: String,
    required: [true, 'License plate is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  category: {
    type: String,
    enum: ['economy', 'comfort', 'premium'],
    default: 'economy'
  },
  seats: {
    type: Number,
    required: true,
    min: 2,
    max: 8,
    default: 4
  },
  photos: [String],
  
  // Features
  amenities: {
    airConditioning: {
      type: Boolean,
      default: false
    },
    wifi: {
      type: Boolean,
      default: false
    },
    usbCharger: {
      type: Boolean,
      default: false
    },
    audioSystem: {
      type: Boolean,
      default: false
    }
  },
  
  // Insurance
  insuranceInfo: {
    policyNumber: String,
    provider: String,
    expiryDate: Date,
    verified: {
      type: Boolean,
      default: false
    }
  },
  
  // Registration
  registrationInfo: {
    number: String,
    expiryDate: Date,
    verified: {
      type: Boolean,
      default: false
    }
  },
  
  // Verification
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verificationNotes: String,
  verifiedAt: Date,
  
  isActive: {
    type: Boolean,
    default: true
  }
  
}, {
  timestamps: true
});

// Index for owner lookup
vehicleSchema.index({ owner: 1, isActive: 1 });

module.exports = mongoose.model('Vehicle', vehicleSchema);
