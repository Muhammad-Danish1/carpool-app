const authService = require('../services/auth.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

// Request OTP
exports.requestOTP = asyncHandler(async (req, res) => {
  const { phoneNumber, purpose } = req.body;
  
  const result = await authService.requestOTP(phoneNumber, purpose);
  
  res.status(200).json(
    new ApiResponse(200, result, 'OTP sent successfully')
  );
});

// Verify OTP and authenticate
exports.verifyOTP = asyncHandler(async (req, res) => {
  const { phoneNumber, otp } = req.body;
  const deviceInfo = {
    deviceId: req.headers['x-device-id'],
    deviceName: req.headers['x-device-name'],
    platform: req.headers['x-platform']
  };
  
  const result = await authService.verifyOTPAndAuthenticate(
    phoneNumber,
    otp,
    deviceInfo
  );
  
  // Set HTTP-only cookies for tokens
  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });
  
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
  
  const message = result.isNewUser 
    ? 'Registration successful' 
    : 'Login successful';
  
  res.status(200).json(
    new ApiResponse(200, result, message)
  );
});

// Refresh token
exports.refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body || req.cookies;
  
  const result = await authService.refreshAccessToken(refreshToken);
  
  // Update access token cookie
  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000
  });
  
  res.status(200).json(
    new ApiResponse(200, result, 'Token refreshed successfully')
  );
});

// Logout
exports.logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body || req.cookies;
  
  await authService.logout(refreshToken);
  
  // Clear cookies
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  
  res.status(200).json(
    new ApiResponse(200, null, 'Logged out successfully')
  );
});

// Logout from all devices
exports.logoutAll = asyncHandler(async (req, res) => {
  await authService.logoutAll(req.user._id);
  
  // Clear cookies
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  
  res.status(200).json(
    new ApiResponse(200, null, 'Logged out from all devices')
  );
});

// Get current user
exports.getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user._id);
  
  res.status(200).json(
    new ApiResponse(200, user, 'User retrieved successfully')
  );
});

// Update profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user._id, req.body);
  
  res.status(200).json(
    new ApiResponse(200, user, 'Profile updated successfully')
  );
});

module.exports = exports;
