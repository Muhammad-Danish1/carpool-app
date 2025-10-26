const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    enum: ['registration', 'login', 'phone_change', 'password_reset'],
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  },
  verified: {
    type: Boolean,
    default: false
  },
  attempts: {
    type: Number,
    default: 0,
    max: 5
  }
}, {
  timestamps: true
});

// Auto-delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Method to verify OTP
otpSchema.methods.verify = async function(providedOTP) {
  if (this.expiresAt < new Date()) {
    throw new Error('OTP has expired');
  }
  
  if (this.attempts >= 5) {
    throw new Error('Maximum attempts exceeded');
  }
  
  this.attempts += 1;
  
  if (this.otp === providedOTP) {
    this.verified = true;
    await this.save();
    return true;
  }
  
  await this.save();
  return false;
};

module.exports = mongoose.model('OTP', otpSchema);
