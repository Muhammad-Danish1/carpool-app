import { Response } from 'express';
import walletService from '../services/wallet.service';
import asyncHandler from '../utils/async-handler';
import ApiResponse from '../utils/api-response';
import { AuthRequest } from '../middleware/auth.middleware';

export const getWalletBalance = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await walletService.getWalletBalance(req.user!._id);
  
  res.status(200).json(
    new ApiResponse(200, result, 'Wallet balance fetched successfully')
  );
});

export const getTransactionHistory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await walletService.getTransactionHistory(req.user!._id, req.query);
  
  res.status(200).json(
    new ApiResponse(200, result, 'Transaction history fetched successfully')
  );
});
