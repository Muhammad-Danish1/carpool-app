const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshToken.model');

// Generate access token
const generateAccessToken = (userId, role) => {
  return jwt.sign(
    {
      id: userId,
      role: role,
      type: 'access'
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m',
      issuer: 'easyroad-api',
      audience: 'easyroad-users'
    }
  );
};

// Generate refresh token
const generateRefreshToken = async (userId, deviceInfo = {}) => {
  const refreshToken = await RefreshToken.create({
    user: userId,
    deviceInfo,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  });
  
  return refreshToken.token;
};

// Verify access token
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: 'easyroad-api',
      audience: 'easyroad-users'
    });
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Verify refresh token
const verifyRefreshToken = async (token) => {
  const refreshToken = await RefreshToken.findOne({
    token,
    isRevoked: false
  }).populate('user');
  
  if (!refreshToken) {
    throw new Error('Invalid refresh token');
  }
  
  if (refreshToken.expiresAt < new Date()) {
    await refreshToken.revoke();
    throw new Error('Refresh token expired');
  }
  
  // Update last used timestamp
  refreshToken.lastUsedAt = new Date();
  await refreshToken.save();
  
  return refreshToken;
};

// Revoke refresh token
const revokeRefreshToken = async (token) => {
  const refreshToken = await RefreshToken.findOne({ token });
  
  if (refreshToken) {
    await refreshToken.revoke();
  }
};

// Revoke all user tokens (useful for logout from all devices)
const revokeAllUserTokens = async (userId) => {
  await RefreshToken.revokeAllUserTokens(userId);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens
};
