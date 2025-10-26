const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true,
    match: [/^\+?[\d\s\-()]+$/, 'Invalid phone number format']
  },
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  password: {
    type: String,
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['passenger', 'driver', 'both'],
    default: 'passenger'
  },
  avatar: String,
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  bio: String,
  
  // Verification
  isPhoneVerified: {
    type: Boolean,
    default: false
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isProfileVerified: {
    type: Boolean,
    default: false
  },
  verificationDocuments: [{
    type: {
      type: String,
      enum: ['identity', 'driving_license', 'selfie']
    },
    url: String,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Driver specific fields
  vehicleInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  driverLicense: {
    number: String,
    expiryDate: Date,
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    }
  },
  
  // Preferences
  preferences: {
    smoking: {
      type: String,
      enum: ['yes', 'no', 'outside'],
      default: 'no'
    },
    pets: {
      type: String,
      enum: ['yes', 'no'],
      default: 'no'
    },
    music: {
      type: String,
      enum: ['yes', 'no'],
      default: 'yes'
    },
    chattiness: {
      type: String,
      enum: ['quiet', 'moderate', 'chatty'],
      default: 'moderate'
    }
  },
  
  // Saved locations
  savedLocations: [{
    label: String,
    address: String,
    latitude: Number,
    longitude: Number
  }],
  
  // Statistics
  stats: {
    totalTripsAsDriver: {
      type: Number,
      default: 0
    },
    totalTripsAsPassenger: {
      type: Number,
      default: 0
    },
    totalDistance: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  
  // Wallet
  walletBalance: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  isSuspended: {
    type: Boolean,
    default: false
  },
  suspensionReason: String,
  
  // Notifications
  notificationSettings: {
    email: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: true
    },
    push: {
      type: Boolean,
      default: true
    }
  },
  
  lastLogin: Date,
  deviceTokens: [String] // For push notifications
  
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Increment trip count
userSchema.methods.incrementTripCount = async function(role) {
  if (role === 'driver') {
    this.stats.totalTripsAsDriver += 1;
  } else {
    this.stats.totalTripsAsPassenger += 1;
  }
  await this.save();
};

// Update average rating
userSchema.methods.updateRating = async function(newRating) {
  const totalRatings = this.stats.totalReviews;
  const currentAverage = this.stats.averageRating;
  
  this.stats.totalReviews += 1;
  this.stats.averageRating = ((currentAverage * totalRatings) + newRating) / this.stats.totalReviews;
  
  await this.save();
};

module.exports = mongoose.model('User', userSchema);
