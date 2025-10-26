import express from 'express';
import * as tripController from '../controllers/trip.controller';
import * as bookingController from '../controllers/booking.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import {
  createTripValidator,
  searchTripsValidator,
  updateTripValidator,
  tripIdValidator
} from '../validators/trip.validator';
import { createBookingValidator } from '../validators/booking.validator';

const router = express.Router();

router.post('/', protect, validate(createTripValidator), tripController.createTrip);
router.get('/', validate(searchTripsValidator), tripController.searchTrips);
router.get('/my-trips', protect, tripController.getUserTrips);
router.get('/:tripId', validate(tripIdValidator), tripController.getTripById);
router.put('/:tripId', protect, validate(updateTripValidator), tripController.updateTrip);
router.patch('/:tripId/cancel', protect, validate(tripIdValidator), tripController.cancelTrip);

router.post('/:tripId/bookings', protect, validate(createBookingValidator), bookingController.createBooking);

export default router;
