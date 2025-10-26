import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { verifyAccessToken } from '../utils/token.service';
import logger from '../utils/logger';
import env from './env';

export interface AuthSocket extends Socket {
  userId?: string;
  userEmail?: string;
  userRole?: string;
}

export const initializeSocket = (httpServer: HttpServer): Server => {
  const io = new Server(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      credentials: true,
      methods: ['GET', 'POST']
    },
    path: '/socket.io/',
    transports: ['websocket', 'polling']
  });

  io.use((socket: AuthSocket, next) => {
    try {
      const token = socket.handshake.auth.token || 
                    socket.handshake.query.token ||
                    socket.handshake.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return next(new Error('Authentication token missing'));
      }

      const decoded = verifyAccessToken(token as string);
      
      socket.userId = decoded.id;
      socket.userEmail = decoded.email;
      socket.userRole = decoded.role;

      logger.info(`Socket authenticated for user: ${decoded.email}`);
      next();
    } catch (error) {
      logger.error(`Socket authentication failed: ${(error as Error).message}`);
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket: AuthSocket) => {
    logger.info(`User connected: ${socket.userId} (Socket ID: ${socket.id})`);

    socket.join(`user:${socket.userId}`);

    socket.on('disconnect', (reason) => {
      logger.info(`User disconnected: ${socket.userId}, Reason: ${reason}`);
    });

    socket.on('error', (error) => {
      logger.error(`Socket error for user ${socket.userId}:`, error);
    });
  });

  logger.info('Socket.IO server initialized');
  
  import('../socket/chat.handler').then(({ setupChatHandlers }) => {
    setupChatHandlers(io);
  });
  
  import('../socket/notification.handler').then(({ setupNotificationHandlers }) => {
    setupNotificationHandlers(io);
  });
  
  return io;
};

export default initializeSocket;
