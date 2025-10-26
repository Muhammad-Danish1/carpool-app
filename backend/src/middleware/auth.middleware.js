const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// List of allowed algorithms (prevents algorithm confusion attacks)
const ALLOWED_ALGORITHMS = ['HS256'];

// Authenticate user from JWT token
const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  
  // Get token from Authorization header or cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }
  
  if (!token) {
    throw new ApiError(401, 'Not authorized, no token provided');
  }
  
  try {
    // Verify token with explicit algorithm check
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ALLOWED_ALGORITHMS,
      issuer: 'easyroad-api',
      audience: 'easyroad-users'
    });
    
    // Additional validation
    if (decoded.type !== 'access') {
      throw new ApiError(403, 'Invalid token type');
    }
    
    // Get user from token
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      throw new ApiError(401, 'User not found');
    }
    
    if (!user.isActive) {
      throw new ApiError(403, 'Account is deactivated');
    }
    
    if (user.isSuspended) {
      throw new ApiError(403, `Account is suspended: ${user.suspensionReason}`);
    }
    
    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new ApiError(401, 'Invalid token');
    } else if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Token expired');
    }
    throw error;
  }
});

// Authorize based on roles
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'Not authenticated');
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, `Role '${req.user.role}' is not authorized to access this route`);
    }
    
    next();
  };
};

// Check if user is verified
const requireVerification = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, 'Not authenticated');
  }
  
  if (!req.user.isPhoneVerified) {
    throw new ApiError(403, 'Phone verification required');
  }
  
  next();
});

// Check if driver is verified (for driver-only routes)
const requireDriverVerification = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, 'Not authenticated');
  }
  
  if (req.user.role !== 'driver' && req.user.role !== 'both') {
    throw new ApiError(403, 'Driver role required');
  }
  
  if (!req.user.isProfileVerified) {
    throw new ApiError(403, 'Driver profile verification required');
  }
  
  if (!req.user.driverLicense || req.user.driverLicense.verificationStatus !== 'verified') {
    throw new ApiError(403, 'Driver license verification required');
  }
  
  next();
});

module.exports = {
  authenticate,
  authorizeRoles,
  requireVerification,
  requireDriverVerification
};
