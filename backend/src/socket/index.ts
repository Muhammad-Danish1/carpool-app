import { Server } from 'socket.io';

let io: Server | null = null;

export const setIO = (socketServer: Server) => {
  io = socketServer;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};

export default { setIO, getIO };
