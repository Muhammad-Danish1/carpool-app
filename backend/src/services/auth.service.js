const User = require('../models/User.model');
const ApiError = require('../utils/ApiError');
const { createOTP, verifyOTP, sendOTPViaSMS } = require('../utils/otpService');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens
} = require('../utils/tokenService');
const logger = require('../utils/logger');

class AuthService {
  // Request OTP for phone verification
  async requestOTP(phoneNumber, purpose = 'login') {
    try {
      // Create OTP
      const { otpCode, expiresAt } = await createOTP(phoneNumber, purpose);
      
      // Send OTP via SMS
      await sendOTPViaSMS(phoneNumber, otpCode);
      
      logger.info(`OTP requested for ${phoneNumber}`);
      
      return {
        message: 'OTP sent successfully',
        expiresAt,
        // In development, return OTP for testing
        ...(process.env.NODE_ENV === 'development' && { otp: otpCode })
      };
    } catch (error) {
      logger.error(`Failed to request OTP: ${error.message}`);
      throw new ApiError(500, 'Failed to send OTP');
    }
  }
  
  // Verify OTP and login/register user
  async verifyOTPAndAuthenticate(phoneNumber, otpCode, deviceInfo = {}) {
    try {
      // Verify OTP
      const isValid = await verifyOTP(phoneNumber, otpCode, 'login');
      
      if (!isValid) {
        throw new ApiError(401, 'Invalid OTP');
      }
      
      // Find or create user
      let user = await User.findOne({ phoneNumber });
      let isNewUser = false;
      
      if (!user) {
        user = await User.create({
          phoneNumber,
          isPhoneVerified: true,
          role: 'passenger'
        });
        isNewUser = true;
        logger.info(`New user registered: ${phoneNumber}`);
      } else {
        user.isPhoneVerified = true;
        user.lastLogin = new Date();
        await user.save();
        logger.info(`User logged in: ${phoneNumber}`);
      }
      
      // Generate tokens
      const accessToken = generateAccessToken(user._id, user.role);
      const refreshToken = await generateRefreshToken(user._id, deviceInfo);
      
      return {
        user: {
          id: user._id,
          phoneNumber: user.phoneNumber,
          name: user.name,
          email: user.email,
          role: user.role,
          isPhoneVerified: user.isPhoneVerified,
          isProfileVerified: user.isProfileVerified,
          avatar: user.avatar
        },
        accessToken,
        refreshToken,
        isNewUser
      };
    } catch (error) {
      logger.error(`Authentication failed: ${error.message}`);
      throw error;
    }
  }
  
  // Refresh access token
  async refreshAccessToken(refreshTokenString) {
    try {
      // Verify refresh token
      const refreshToken = await verifyRefreshToken(refreshTokenString);
      
      if (!refreshToken || !refreshToken.user) {
        throw new ApiError(401, 'Invalid refresh token');
      }
      
      const user = refreshToken.user;
      
      // Generate new access token
      const newAccessToken = generateAccessToken(user._id, user.role);
      
      logger.info(`Access token refreshed for user: ${user._id}`);
      
      return {
        accessToken: newAccessToken
      };
    } catch (error) {
      logger.error(`Token refresh failed: ${error.message}`);
      throw new ApiError(401, 'Failed to refresh token');
    }
  }
  
  // Logout user
  async logout(refreshTokenString) {
    try {
      if (refreshTokenString) {
        await revokeRefreshToken(refreshTokenString);
      }
      
      logger.info('User logged out');
      
      return { message: 'Logged out successfully' };
    } catch (error) {
      logger.error(`Logout failed: ${error.message}`);
      throw new ApiError(500, 'Logout failed');
    }
  }
  
  // Logout from all devices
  async logoutAll(userId) {
    try {
      await revokeAllUserTokens(userId);
      
      logger.info(`User logged out from all devices: ${userId}`);
      
      return { message: 'Logged out from all devices' };
    } catch (error) {
      logger.error(`Logout all failed: ${error.message}`);
      throw new ApiError(500, 'Logout failed');
    }
  }
  
  // Get current user
  async getCurrentUser(userId) {
    try {
      const user = await User.findById(userId).select('-password');
      
      if (!user) {
        throw new ApiError(404, 'User not found');
      }
      
      return user;
    } catch (error) {
      logger.error(`Get current user failed: ${error.message}`);
      throw error;
    }
  }
  
  // Update user profile
  async updateProfile(userId, updateData) {
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        throw new ApiError(404, 'User not found');
      }
      
      // Update allowed fields
      const allowedFields = ['name', 'email', 'dateOfBirth', 'gender', 'bio'];
      allowedFields.forEach(field => {
        if (updateData[field] !== undefined) {
          user[field] = updateData[field];
        }
      });
      
      await user.save();
      
      logger.info(`Profile updated for user: ${userId}`);
      
      return user;
    } catch (error) {
      logger.error(`Profile update failed: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new AuthService();
