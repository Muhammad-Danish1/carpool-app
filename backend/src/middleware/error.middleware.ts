import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import ApiError from '../utils/api-error';

interface AuthRequest extends Request {
  user?: any;
}

export const errorHandler = (err: any, req: AuthRequest, res: Response, _next: NextFunction): void => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;
  
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userId: req.user?._id
  });
  
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ApiError(404, message);
  }
  
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const message = `${field} already exists`;
    error = new ApiError(400, message);
  }
  
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val: any) => val.message);
    error = new ApiError(400, 'Validation Error', messages);
  }
  
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError(401, 'Invalid token');
  }
  
  if (err.name === 'TokenExpiredError') {
    error = new ApiError(401, 'Token expired');
  }
  
  res.status(error.statusCode).json({
    success: false,
    message: error.message || 'Server Error',
    errors: error.errors,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  const error = new ApiError(404, `Route not found - ${req.originalUrl}`);
  next(error);
};
