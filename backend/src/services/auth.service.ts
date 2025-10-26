import User from '../models/user.model';
import ApiError from '../utils/api-error';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/token.service';
import logger from '../utils/logger';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UpdateProfileData {
  name?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  bio?: string;
  avatar?: string;
}

class AuthService {
  async signup(data: SignupData) {
    try {
      const { name, email, password } = data;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new ApiError(400, 'Email already registered');
      }

      const user = await User.create({
        name,
        email,
        password,
        role: 'passenger',
        isEmailVerified: false
      });

      const accessToken = generateAccessToken(String(user._id), user.email, user.role);
      const refreshToken = generateRefreshToken(String(user._id), user.email);

      logger.info(`New user registered: ${email}`);

      return {
        user: {
          id: String(user._id),
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified,
          isProfileVerified: user.isProfileVerified,
          avatar: user.avatar
        },
        accessToken,
        refreshToken
      };
    } catch (error) {
      logger.error(`Signup failed: ${(error as Error).message}`);
      throw error;
    }
  }

  async login(data: LoginData) {
    try {
      const { email, password } = data;

      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw new ApiError(401, 'Invalid email or password');
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid email or password');
      }

      user.lastLogin = new Date();
      await user.save();

      const accessToken = generateAccessToken(String(user._id), user.email, user.role);
      const refreshToken = generateRefreshToken(String(user._id), user.email);

      logger.info(`User logged in: ${email}`);

      return {
        user: {
          id: String(user._id),
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified,
          isProfileVerified: user.isProfileVerified,
          avatar: user.avatar
        },
        accessToken,
        refreshToken
      };
    } catch (error) {
      logger.error(`Login failed: ${(error as Error).message}`);
      throw error;
    }
  }

  async refreshAccessToken(refreshTokenString: string) {
    try {
      const decoded = verifyRefreshToken(refreshTokenString);

      const user = await User.findById(decoded.id);
      if (!user) {
        throw new ApiError(401, 'User not found');
      }

      const newAccessToken = generateAccessToken(String(user._id), user.email, user.role);

      logger.info(`Access token refreshed for user: ${String(user._id)}`);

      return {
        accessToken: newAccessToken
      };
    } catch (error) {
      logger.error(`Token refresh failed: ${(error as Error).message}`);
      throw new ApiError(401, 'Failed to refresh token');
    }
  }

  async getCurrentUser(userId: string) {
    try {
      const user = await User.findById(userId).select('-password');

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      return user;
    } catch (error) {
      logger.error(`Get current user failed: ${(error as Error).message}`);
      throw error;
    }
  }

  async updateProfile(userId: string, updateData: UpdateProfileData) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      const allowedFields: (keyof UpdateProfileData)[] = ['name', 'phoneNumber', 'dateOfBirth', 'gender', 'bio', 'avatar'];
      allowedFields.forEach(field => {
        if (updateData[field] !== undefined) {
          (user as any)[field] = updateData[field];
        }
      });

      await user.save();

      logger.info(`Profile updated for user: ${userId}`);

      return user;
    } catch (error) {
      logger.error(`Profile update failed: ${(error as Error).message}`);
      throw error;
    }
  }
}

export default new AuthService();
