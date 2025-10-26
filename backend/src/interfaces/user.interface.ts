import { Document } from 'mongoose';

export interface IVerificationDocument {
  type: 'identity' | 'driving_license' | 'selfie';
  url: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: Date;
}

export interface IDriverLicense {
  number?: string;
  expiryDate?: Date;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface IPreferences {
  smoking: 'yes' | 'no' | 'outside';
  pets: 'yes' | 'no';
  music: 'yes' | 'no';
  chattiness: 'quiet' | 'moderate' | 'chatty';
}

export interface ISavedLocation {
  label: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface IStats {
  totalTripsAsDriver: number;
  totalTripsAsPassenger: number;
  totalDistance: number;
  averageRating: number;
  totalReviews: number;
}

export interface INotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: 'passenger' | 'driver' | 'both';
  avatar?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  bio?: string;
  
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  isProfileVerified: boolean;
  verificationDocuments: IVerificationDocument[];
  
  vehicleInfo?: any;
  driverLicense?: IDriverLicense;
  
  preferences: IPreferences;
  savedLocations: ISavedLocation[];
  stats: IStats;
  walletBalance: number;
  
  isActive: boolean;
  isSuspended: boolean;
  suspensionReason?: string;
  
  notificationSettings: INotificationSettings;
  
  lastLogin?: Date;
  deviceTokens: string[];
  
  createdAt: Date;
  updatedAt: Date;
  
  comparePassword(candidatePassword: string): Promise<boolean>;
  incrementTripCount(role: 'driver' | 'passenger'): Promise<void>;
  updateRating(newRating: number): Promise<void>;
}
