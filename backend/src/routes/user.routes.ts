import express from 'express';
import * as userController from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/:userId', userController.getUserProfile);
router.put('/profile', protect, userController.updateUserProfile);
router.post('/vehicles', protect, userController.addVehicle);
router.put('/vehicles/:vehicleId', protect, userController.updateVehicle);
router.delete('/vehicles/:vehicleId', protect, userController.deleteVehicle);

export default router;
