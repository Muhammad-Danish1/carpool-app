const { body } = require('express-validator');

const requestOTPValidator = [
  body('phoneNumber')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\+?[\d\s\-()]+$/).withMessage('Invalid phone number format'),
  
  body('purpose')
    .optional()
    .isIn(['registration', 'login', 'phone_change', 'password_reset'])
    .withMessage('Invalid purpose')
];

const verifyOTPValidator = [
  body('phoneNumber')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\+?[\d\s\-()]+$/).withMessage('Invalid phone number format'),
  
  body('otp')
    .trim()
    .notEmpty().withMessage('OTP is required')
    .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  
  body('purpose')
    .optional()
    .isIn(['registration', 'login', 'phone_change', 'password_reset'])
    .withMessage('Invalid purpose')
];

const refreshTokenValidator = [
  body('refreshToken')
    .trim()
    .notEmpty().withMessage('Refresh token is required')
];

const updateProfileValidator = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Invalid email format'),
  
  body('dateOfBirth')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Bio must not exceed 500 characters')
];

module.exports = {
  requestOTPValidator,
  verifyOTPValidator,
  refreshTokenValidator,
  updateProfileValidator
};
