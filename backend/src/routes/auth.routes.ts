import express from 'express';
import * as authController from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import {
  signupValidator,
  loginValidator,
  refreshTokenValidator,
  updateProfileValidator
} from '../validators/auth.validator';

const router = express.Router();

router.post('/signup', validate(signupValidator), authController.signup);
router.post('/login', validate(loginValidator), authController.login);
router.post('/refresh-token', validate(refreshTokenValidator), authController.refreshToken);

router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);
router.put('/profile', protect, validate(updateProfileValidator), authController.updateProfile);

export default router;
