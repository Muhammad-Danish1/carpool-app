import { Types } from 'mongoose';
import Payment from '../models/payment.model';
import User from '../models/user.model';
import ApiError from '../utils/api-error';

const getWalletBalance = async (userId: Types.ObjectId) => {
  const user = await User.findById(userId).select('walletBalance');
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  
  const balance = (user as any).walletBalance || 0;
  
  return { balance, currency: 'USD' };
};

const getTransactionHistory = async (userId: Types.ObjectId, query: { page?: number; limit?: number }) => {
  const {
    page = 1,
    limit = 20
  } = query;
  
  const skip = (page - 1) * limit;
  
  const [transactions, total] = await Promise.all([
    Payment.find({ user: userId })
      .populate('booking')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Payment.countDocuments({ user: userId })
  ]);
  
  return {
    transactions,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

export default {
  getWalletBalance,
  getTransactionHistory
};
