import jwt from 'jsonwebtoken';
import env from '../config/env';

export interface TokenPayload {
  id: string;
  email: string;
  role?: string;
  type: 'access' | 'refresh';
}

export const generateAccessToken = (userId: string, email: string, role: string = 'user'): string => {
  return jwt.sign(
    {
      id: userId,
      email,
      role,
      type: 'access'
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_ACCESS_EXPIRY,
      issuer: 'easyroad-api',
      audience: 'easyroad-users'
    } as any
  );
};

export const generateRefreshToken = (userId: string, email: string): string => {
  return jwt.sign(
    {
      id: userId,
      email,
      type: 'refresh'
    },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.JWT_REFRESH_EXPIRY,
      issuer: 'easyroad-api',
      audience: 'easyroad-users'
    } as any
  );
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: 'easyroad-api',
      audience: 'easyroad-users'
    }) as TokenPayload;
    
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET, {
      algorithms: ['HS256'],
      issuer: 'easyroad-api',
      audience: 'easyroad-users'
    }) as TokenPayload;
    
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};
