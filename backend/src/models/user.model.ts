import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/user.interface';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  phoneNumber: {
    type: String,
    trim: true,
    sparse: true,
    match: [/^\+?[\d\s\-()]+$/, 'Invalid phone number format']
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
  
  vehicleInfo: {
    type: Schema.Types.ObjectId,
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
  
  savedLocations: [{
    label: String,
    address: String,
    latitude: Number,
    longitude: Number
  }],
  
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
  
  walletBalance: {
    type: Number,
    default: 0,
    min: 0
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  isSuspended: {
    type: Boolean,
    default: false
  },
  suspensionReason: String,
  
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
  deviceTokens: [String]
  
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.incrementTripCount = async function(role: 'driver' | 'passenger'): Promise<void> {
  if (role === 'driver') {
    this.stats.totalTripsAsDriver += 1;
  } else {
    this.stats.totalTripsAsPassenger += 1;
  }
  await this.save();
};

userSchema.methods.updateRating = async function(newRating: number): Promise<void> {
  const totalRatings = this.stats.totalReviews;
  const currentAverage = this.stats.averageRating;
  
  this.stats.totalReviews += 1;
  this.stats.averageRating = ((currentAverage * totalRatings) + newRating) / this.stats.totalReviews;
  
  await this.save();
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
