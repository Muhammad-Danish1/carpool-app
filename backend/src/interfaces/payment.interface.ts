import { Document, Types } from 'mongoose';

export interface IPaymentGateway {
  name?: string;
  gatewayTransactionId?: string;
  gatewayResponse?: any;
  gatewayStatus?: string;
}

export interface ICardDetails {
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

export interface IRefund {
  amount?: number;
  reason?: string;
  status?: 'pending' | 'processing' | 'succeeded' | 'failed';
  transactionId?: string;
  processedAt?: Date;
}

export interface IPaymentMetadata {
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: any;
}

export interface IPayment extends Document {
  user: Types.ObjectId;
  booking?: Types.ObjectId;
  transactionId: string;
  paymentMethod: 'card' | 'wallet' | 'cash' | 'bank_transfer' | 'stripe' | 'paypal';
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'cancelled' | 'refunded';
  paymentGateway?: IPaymentGateway;
  cardDetails?: ICardDetails;
  refund?: IRefund;
  attemptedAt: Date;
  completedAt?: Date;
  failedAt?: Date;
  errorMessage?: string;
  errorCode?: string;
  failureReason?: string;
  metadata?: IPaymentMetadata;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  markAsSucceeded(gatewayDetails?: any): Promise<void>;
  markAsFailed(reason: string, errorCode?: string): Promise<void>;
  processRefund(amount?: number, reason?: string): Promise<void>;
}
