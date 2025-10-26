const express = require('express');
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { validateRequest } = require('../middleware/validation.middleware');
const {
  requestOTPValidator,
  verifyOTPValidator,
  refreshTokenValidator,
  updateProfileValidator
} = require('../validators/auth.validator');

const router = express.Router();

// Public routes
router.post('/request-otp', requestOTPValidator, validateRequest, authController.requestOTP);
router.post('/verify-otp', verifyOTPValidator, validateRequest, authController.verifyOTP);
router.post('/refresh-token', refreshTokenValidator, validateRequest, authController.refreshToken);

// Protected routes
router.post('/logout', authenticate, authController.logout);
router.post('/logout-all', authenticate, authController.logoutAll);
router.get('/me', authenticate, authController.getMe);
router.put('/profile', authenticate, updateProfileValidator, validateRequest, authController.updateProfile);

module.exports = router;
