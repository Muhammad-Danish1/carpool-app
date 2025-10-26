import { createServer } from 'http';
import app from './app';
import connectDB from './config/database';
import logger from './utils/logger';
import env from './config/env';
import { initializeSocket } from './config/socket';
import { setIO } from './socket';

connectDB();

const httpServer = createServer(app);

const io = initializeSocket(httpServer);
setIO(io);

const server = httpServer.listen(env.PORT, 'localhost', () => {
  logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  console.log(`🚀 Server is running on http://localhost:${env.PORT}`);
  console.log(`📚 API Documentation: http://localhost:${env.PORT}/api/v1`);
  console.log(`🔌 Socket.IO server ready`);
});

process.on('unhandledRejection', (err: Error) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

export default server;
