import { body, query, param } from 'express-validator';

export const createTripValidator = [
  body('vehicle')
    .trim()
    .notEmpty().withMessage('Vehicle ID is required')
    .isMongoId().withMessage('Invalid vehicle ID'),
  
  body('origin.address')
    .trim()
    .notEmpty().withMessage('Origin address is required'),
  
  body('origin.coordinates.latitude')
    .notEmpty().withMessage('Origin latitude is required')
    .isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
  
  body('origin.coordinates.longitude')
    .notEmpty().withMessage('Origin longitude is required')
    .isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
  
  body('destination.address')
    .trim()
    .notEmpty().withMessage('Destination address is required'),
  
  body('destination.coordinates.latitude')
    .notEmpty().withMessage('Destination latitude is required')
    .isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
  
  body('destination.coordinates.longitude')
    .notEmpty().withMessage('Destination longitude is required')
    .isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
  
  body('departureTime')
    .notEmpty().withMessage('Departure time is required')
    .isISO8601().withMessage('Invalid date format')
    .custom((value) => {
      const departureDate = new Date(value);
      const now = new Date();
      if (departureDate <= now) {
        throw new Error('Departure time must be in the future');
      }
      return true;
    }),
  
  body('pricePerSeat')
    .notEmpty().withMessage('Price per seat is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  
  body('totalSeats')
    .notEmpty().withMessage('Total seats is required')
    .isInt({ min: 1, max: 7 }).withMessage('Total seats must be between 1 and 7'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description must not exceed 500 characters')
];

export const searchTripsValidator = [
  query('from')
    .optional()
    .trim()
    .notEmpty().withMessage('Origin cannot be empty'),
  
  query('to')
    .optional()
    .trim()
    .notEmpty().withMessage('Destination cannot be empty'),
  
  query('date')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  
  query('passengers')
    .optional()
    .isInt({ min: 1, max: 7 }).withMessage('Passengers must be between 1 and 7'),
  
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];

export const updateTripValidator = [
  param('tripId')
    .isMongoId().withMessage('Invalid trip ID'),
  
  body('departureTime')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  
  body('pricePerSeat')
    .optional()
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description must not exceed 500 characters')
];

export const tripIdValidator = [
  param('tripId')
    .isMongoId().withMessage('Invalid trip ID')
];
