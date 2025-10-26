import mongoose from 'mongoose';
import logger from '../utils/logger';
import env from './env';

const connectDB = async (): Promise<void> => {
  if (!env.MONGODB_URI) {
    logger.warn('MongoDB URI not configured. Database features will be unavailable.');
    return;
  }
  
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    
    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB connection error: ${err}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });
    
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    });
    
  } catch (error) {
    logger.error(`Database connection error: ${(error as Error).message}`);
    logger.warn('Continuing without database connection. Some features will be unavailable.');
  }
};

export default connectDB;
