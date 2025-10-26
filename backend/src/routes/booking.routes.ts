import express from 'express';
import * as bookingController from '../controllers/booking.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import {
  bookingIdValidator,
  updateBookingStatusValidator,
  cancelBookingValidator,
  getBookingsValidator
} from '../validators/booking.validator';

const router = express.Router();

router.get('/', protect, validate(getBookingsValidator), bookingController.getUserBookings);
router.get('/:bookingId', protect, validate(bookingIdValidator), bookingController.getBookingById);
router.patch('/:bookingId/status', protect, validate(updateBookingStatusValidator), bookingController.updateBookingStatus);
router.patch('/:bookingId/cancel', protect, validate(cancelBookingValidator), bookingController.cancelBooking);

export default router;
