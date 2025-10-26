const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    default: () => uuidv4()
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deviceInfo: {
    deviceId: String,
    deviceName: String,
    platform: String
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  },
  isRevoked: {
    type: Boolean,
    default: false
  },
  revokedAt: Date,
  lastUsedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Auto-delete expired tokens
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Index for quick user lookup
refreshTokenSchema.index({ user: 1, isRevoked: 1 });

// Method to revoke token
refreshTokenSchema.methods.revoke = async function() {
  this.isRevoked = true;
  this.revokedAt = new Date();
  await this.save();
};

// Static method to revoke all user tokens
refreshTokenSchema.statics.revokeAllUserTokens = async function(userId) {
  await this.updateMany(
    { user: userId, isRevoked: false },
    { $set: { isRevoked: true, revokedAt: new Date() } }
  );
};

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
