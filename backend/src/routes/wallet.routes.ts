import express from 'express';
import * as walletController from '../controllers/wallet.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', protect, walletController.getWalletBalance);
router.get('/transactions', protect, walletController.getTransactionHistory);

export default router;
