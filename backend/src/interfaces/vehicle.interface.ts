import { Document, Types } from 'mongoose';

export interface IVehicleAmenities {
  airConditioning: boolean;
  wifi: boolean;
  usbCharger: boolean;
  audioSystem: boolean;
}

export interface IInsuranceInfo {
  policyNumber?: string;
  provider?: string;
  expiryDate?: Date;
  verified: boolean;
}

export interface IRegistrationInfo {
  number?: string;
  expiryDate?: Date;
  verified: boolean;
}

export interface IVehicle extends Omit<Document, 'model'> {
  owner: Types.ObjectId;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  category: 'economy' | 'comfort' | 'premium';
  seats: number;
  photos: string[];
  amenities: IVehicleAmenities;
  insuranceInfo?: IInsuranceInfo;
  registrationInfo?: IRegistrationInfo;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verificationNotes?: string;
  verifiedAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
