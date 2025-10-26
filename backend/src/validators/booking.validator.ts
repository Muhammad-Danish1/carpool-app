import { body, param, query } from 'express-validator';

export const createBookingValidator = [
  param('tripId')
    .isMongoId().withMessage('Invalid trip ID'),
  
  body('numberOfSeats')
    .notEmpty().withMessage('Number of seats is required')
    .isInt({ min: 1, max: 7 }).withMessage('Number of seats must be between 1 and 7'),
  
  body('seats')
    .isArray({ min: 1 }).withMessage('Seats array is required')
    .custom((value, { req }) => {
      if (value.length !== req.body.numberOfSeats) {
        throw new Error('Seats array length must match numberOfSeats');
      }
      return true;
    }),
  
  body('seats.*.seatNumber')
    .notEmpty().withMessage('Seat number is required')
    .isInt({ min: 1 }).withMessage('Seat number must be a positive integer'),
  
  body('paymentMethod')
    .notEmpty().withMessage('Payment method is required')
    .isIn(['card', 'wallet', 'cash', 'bank_transfer']).withMessage('Invalid payment method'),
  
  body('pickupLocation.address')
    .optional()
    .trim()
    .notEmpty().withMessage('Pickup address cannot be empty'),
  
  body('dropoffLocation.address')
    .optional()
    .trim()
    .notEmpty().withMessage('Dropoff address cannot be empty')
];

export const bookingIdValidator = [
  param('bookingId')
    .isMongoId().withMessage('Invalid booking ID')
];

export const updateBookingStatusValidator = [
  param('bookingId')
    .isMongoId().withMessage('Invalid booking ID'),
  
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['confirmed', 'in_progress', 'completed', 'no_show']).withMessage('Invalid status')
];

export const cancelBookingValidator = [
  param('bookingId')
    .isMongoId().withMessage('Invalid booking ID'),
  
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Cancellation reason must not exceed 500 characters')
];

export const getBookingsValidator = [
  query('status')
    .optional()
    .isIn(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show']).withMessage('Invalid status'),
  
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];
