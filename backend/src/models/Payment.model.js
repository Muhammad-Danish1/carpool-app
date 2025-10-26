const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  
  // Payment details
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
  
  // Amounts
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  
  // Payment status
  status: {
    type: String,
    enum: ['pending', 'processing', 'succeeded', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  
  // Payment gateway details
  paymentGateway: {
    name: String, // stripe, paypal, etc.
    gatewayTransactionId: String,
    gatewayResponse: mongoose.Schema.Types.Mixed,
    gatewayStatus: String
  },
  
  // Card details (last 4 digits only for security)
  cardDetails: {
    last4: String,
    brand: String, // visa, mastercard, etc.
    expiryMonth: Number,
    expiryYear: Number
  },
  
  // Refund information
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
  
  // Timestamps
  attemptedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  failedAt: Date,
  
  // Error tracking
  errorMessage: String,
  errorCode: String,
  failureReason: String,
  
  // Metadata
  metadata: {
    ipAddress: String,
    userAgent: String,
    deviceInfo: mongoose.Schema.Types.Mixed
  },
  
  // Notes
  notes: String
  
}, {
  timestamps: true
});

// Indexes
paymentSchema.index({ user: 1, status: 1, createdAt: -1 });
paymentSchema.index({ booking: 1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ status: 1, createdAt: -1 });

// Generate unique transaction ID
paymentSchema.pre('save', async function(next) {
  if (this.isNew && !this.transactionId) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 9).toUpperCase();
    this.transactionId = `TXN-${timestamp}-${random}`;
  }
  next();
});

// Method to mark payment as succeeded
paymentSchema.methods.markAsSucceeded = async function(gatewayDetails) {
  this.status = 'succeeded';
  this.completedAt = new Date();
  if (gatewayDetails) {
    this.paymentGateway.gatewayTransactionId = gatewayDetails.id;
    this.paymentGateway.gatewayResponse = gatewayDetails;
    this.paymentGateway.gatewayStatus = gatewayDetails.status;
  }
  await this.save();
};

// Method to mark payment as failed
paymentSchema.methods.markAsFailed = async function(reason, errorCode) {
  this.status = 'failed';
  this.failedAt = new Date();
  this.failureReason = reason;
  this.errorCode = errorCode;
  await this.save();
};

// Method to process refund
paymentSchema.methods.processRefund = async function(amount, reason) {
  this.refund = {
    amount: amount || this.amount,
    reason,
    status: 'pending',
    processedAt: new Date()
  };
  this.status = 'refunded';
  await this.save();
};

module.exports = mongoose.model('Payment', paymentSchema);
