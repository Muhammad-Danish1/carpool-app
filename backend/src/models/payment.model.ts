import mongoose, { Schema } from 'mongoose';
import { IPayment } from '../interfaces/payment.interface';

const paymentSchema = new Schema<IPayment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  },
  
  transactionId: {
    type: String,
    unique: true,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'wallet', 'cash', 'bank_transfer', 'stripe', 'paypal'],
    required: true
  },
  
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  
  status: {
    type: String,
    enum: ['pending', 'processing', 'succeeded', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  
  paymentGateway: {
    name: String,
    gatewayTransactionId: String,
    gatewayResponse: Schema.Types.Mixed,
    gatewayStatus: String
  },
  
  cardDetails: {
    last4: String,
    brand: String,
    expiryMonth: Number,
    expiryYear: Number
  },
  
  refund: {
    amount: Number,
    reason: String,
    status: {
      type: String,
      enum: ['pending', 'processing', 'succeeded', 'failed']
    },
    transactionId: String,
    processedAt: Date
  },
  
  attemptedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  failedAt: Date,
  
  errorMessage: String,
  errorCode: String,
  failureReason: String,
  
  metadata: {
    ipAddress: String,
    userAgent: String,
    deviceInfo: Schema.Types.Mixed
  },
  
  notes: String
}, {
  timestamps: true
});

paymentSchema.index({ user: 1, status: 1, createdAt: -1 });
paymentSchema.index({ booking: 1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ status: 1, createdAt: -1 });

paymentSchema.pre('save', async function(next) {
  if (this.isNew && !this.transactionId) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 9).toUpperCase();
    this.transactionId = `TXN-${timestamp}-${random}`;
  }
  next();
});

paymentSchema.methods.markAsSucceeded = async function(gatewayDetails?: any) {
  this.status = 'succeeded';
  this.completedAt = new Date();
  if (gatewayDetails) {
    if (!this.paymentGateway) {
      this.paymentGateway = {};
    }
    this.paymentGateway.gatewayTransactionId = gatewayDetails.id;
    this.paymentGateway.gatewayResponse = gatewayDetails;
    this.paymentGateway.gatewayStatus = gatewayDetails.status;
  }
  await this.save();
};

paymentSchema.methods.markAsFailed = async function(reason: string, errorCode?: string) {
  this.status = 'failed';
  this.failedAt = new Date();
  this.failureReason = reason;
  this.errorCode = errorCode;
  await this.save();
};

paymentSchema.methods.processRefund = async function(amount?: number, reason?: string) {
  this.refund = {
    amount: amount || this.amount,
    reason,
    status: 'pending',
    processedAt: new Date()
  };
  this.status = 'refunded';
  await this.save();
};

export default mongoose.model<IPayment>('Payment', paymentSchema);
