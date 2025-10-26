import { Response } from 'express';
import authService from '../services/auth.service';
import asyncHandler from '../utils/async-handler';
import ApiResponse from '../utils/api-response';
import { AuthRequest } from '../middleware/auth.middleware';

export const signup = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, email, password } = req.body;

  const result = await authService.signup({ name, email, password });

  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000
  });

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(201).json(
    new ApiResponse(201, result, 'Registration successful')
  );
});

export const login = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.login({ email, password });

  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000
  });

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(200).json(
    new ApiResponse(200, result, 'Login successful')
  );
});

export const refreshToken = asyncHandler(async (req: AuthRequest, res: Response) => {
  const refreshTokenString = req.body.refreshToken || req.cookies.refreshToken;

  if (!refreshTokenString) {
    res.status(401).json(
      new ApiResponse(401, null, 'Refresh token not provided')
    );
    return;
  }

  const result = await authService.refreshAccessToken(refreshTokenString);

  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000
  });

  res.status(200).json(
    new ApiResponse(200, result, 'Token refreshed successfully')
  );
});

export const logout = asyncHandler(async (_req: AuthRequest, res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(200).json(
    new ApiResponse(200, null, 'Logged out successfully')
  );
});

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json(
      new ApiResponse(401, null, 'Not authenticated')
    );
    return;
  }

  const user = await authService.getCurrentUser(req.user._id);

  res.status(200).json(
    new ApiResponse(200, user, 'User retrieved successfully')
  );
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json(
      new ApiResponse(401, null, 'Not authenticated')
    );
    return;
  }

  const user = await authService.updateProfile(req.user._id, req.body);

  res.status(200).json(
    new ApiResponse(200, user, 'Profile updated successfully')
  );
});
