import express from 'express';
import * as ratingController from '../controllers/rating.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/bookings/:bookingId/rating', protect, ratingController.createRating);
router.get('/users/:userId/ratings', ratingController.getUserRatings);

export default router;
