# EasyROAD - Carpooling Mobile App

## Overview

EasyROAD is a React Native carpooling mobile application built with Expo, featuring a modern TypeScript backend with email/password authentication. The app connects drivers with passengers to make travel more accessible, affordable, and sustainable.

## Technology Stack

### Frontend
- **Framework**: Expo (~54.0.20) with React Native (0.81.5)
- **Routing**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **UI Components**: Custom components with bottom sheets (@gorhom/bottom-sheet)
- **Navigation**: React Navigation with bottom tabs
- **Language**: TypeScript
- **State Management**: AsyncStorage for local data persistence

### Backend
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with access and refresh tokens
- **Security**: Helmet, CORS, express-mongo-sanitize, rate limiting
- **Validation**: express-validator with custom validators
- **Logging**: Winston logger
- **Development**: ts-node-dev for hot reloading

## Authentication System

The app uses email/password authentication instead of phone-based OTP:

### User Signup
- Users register with: name, email, password, confirm password
- Password must be at least 6 characters with uppercase, lowercase, and number
- JWT tokens (access + refresh) issued upon successful registration

### User Signin
- Users login with: email and password
- Tokens stored in AsyncStorage (frontend) and httpOnly cookies (backend)
- Automatic token refresh mechanism

### Phone Verification
- Phone number is optional and can be added/verified inside the app after login
- Currently not implemented but prepared in the user model

## Project Structure

```
├── src/                        # Frontend source
│   ├── app/                    # Expo Router app directory
│   │   ├── (auth)/            # Authentication screens
│   │   │   ├── signin.tsx     # Email/password signin
│   │   │   ├── signup.tsx     # Registration screen
│   │   │   └── index.tsx      # Auth redirect
│   │   ├── (tabs)/            # Tab-based navigation
│   │   │   ├── home/          # Home screen
│   │   │   ├── trips/         # Trips management
│   │   │   ├── chat/          # Chat functionality
│   │   │   └── profile/       # User profile
│   │   ├── bottom-sheets/     # Modal bottom sheets
│   │   └── common/            # Common screens
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components
│   │   └── auth/             # Auth components
│   ├── services/             # API services
│   │   └── api.ts           # Backend API client
│   └── constants/           # App constants
│
├── backend/                  # Backend API
│   ├── src/
│   │   ├── config/          # Configuration
│   │   │   ├── env.ts       # Environment variables
│   │   │   └── database.ts  # MongoDB connection
│   │   ├── interfaces/      # TypeScript interfaces
│   │   ├── models/          # Mongoose models
│   │   │   └── user.model.ts
│   │   ├── controllers/     # Request handlers
│   │   │   └── auth.controller.ts
│   │   ├── services/        # Business logic
│   │   │   └── auth.service.ts
│   │   ├── routes/          # API routes
│   │   │   └── auth.routes.ts
│   │   ├── middleware/      # Express middleware
│   │   ├── validators/      # Request validation
│   │   └── utils/          # Utility functions
│   ├── dist/               # Compiled TypeScript
│   ├── tsconfig.json       # TypeScript config
│   └── package.json
│
├── start-web.js            # Custom Expo web launcher
└── webpack.config.js       # Webpack configuration
```

## Running the App

### Development

Both frontend and backend run automatically via configured workflows:

- **Frontend**: Runs on port 5000 (configured to allow all hosts for Replit)
- **Backend**: Runs on port 3000 (localhost only)

The frontend automatically detects the Replit environment and adjusts API URLs accordingly.

### Manual Start

```bash
# Frontend
npm run web
# or
node start-web.js

# Backend
cd backend
npm run dev
```

### Building

```bash
# Frontend
npx expo export:web

# Backend
cd backend
npm run build
```

## API Endpoints

### Authentication (v1)
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login with email/password
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `POST /api/v1/auth/logout` - Logout (requires auth)
- `GET /api/v1/auth/me` - Get current user (requires auth)
- `PUT /api/v1/auth/profile` - Update profile (requires auth)

### Health Check
- `GET /health` - API health status

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3000

# Database (REQUIRED - provide your MongoDB URI)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/easyroad

# JWT Secrets (REQUIRED - change in production)
JWT_SECRET=your_secret_key_minimum_32_characters
JWT_REFRESH_SECRET=your_refresh_secret_minimum_32_characters
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Frontend URL
CLIENT_URL=http://localhost:5000
```

### Frontend
- Environment is auto-detected based on platform
- API URLs automatically configured for local/Replit environments

## Configuration

### Webpack (Frontend)
- Configured to allow all hosts for Replit proxy access
- Host set to 0.0.0.0 for accessibility

### TypeScript (Backend)
- Strict mode enabled
- ES2020 target
- CommonJS modules
- Path aliases configured (@/*)

## Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Tokens**: Separate access and refresh tokens
- **HTTP-Only Cookies**: Secure token storage
- **Rate Limiting**: 100 req/15min general, 5 req/15min for auth endpoints
- **Input Sanitization**: MongoDB injection prevention
- **Helmet**: Security headers
- **CORS**: Configured for specific origins
- **Validation**: Comprehensive input validation

## Database Schema

### User Model
- Email (required, unique, primary identifier)
- Password (hashed, required)
- Name (required)
- Phone Number (optional, can be verified in-app)
- Role (passenger/driver/both)
- Profile information (avatar, DOB, gender, bio)
- Verification status (email, phone, profile)
- Driver-specific fields (license, vehicle)
- Preferences (smoking, pets, music, chattiness)
- Statistics (trips, ratings, reviews)
- Wallet balance
- Notification settings

## Known Issues & Notes

1. **MongoDB Connection**: Backend runs without database if MongoDB URI not provided (gracefully degrades)
2. **Phone Verification**: Not yet implemented - will be added as post-authentication feature
3. **Cache Warnings**: Metro bundler cache warnings can be safely ignored
4. **Shadow Props**: Deprecated shadow* props warning (low priority, doesn't affect functionality)

## Recent Changes

### 2025-10-26: Major Authentication Redesign
- **Backend Migration to TypeScript**
  - Converted entire backend from JavaScript to TypeScript
  - Implemented modern folder structure with separation of concerns
  - Added comprehensive type safety throughout
  
- **Authentication System Overhaul**
  - Changed from phone/OTP to email/password authentication
  - Implemented JWT-based auth with access and refresh tokens
  - Created comprehensive signup/signin flows
  - Added secure password validation and hashing
  
- **Frontend Updates**
  - Created new signup screen (name, email, password, confirm password)
  - Created new signin screen (email, password)
  - Implemented API service for backend communication
  - Added AsyncStorage for token management
  
- **Environment Configuration**
  - Configured Expo webpack to allow all hosts for Replit
  - Set up proper CORS and security middleware
  - Added graceful MongoDB connection handling
  - Fixed express-mongo-sanitize middleware ordering
  
- **Workflows**
  - Configured backend workflow (port 3000, console output)
  - Configured frontend workflow (port 5000, webview output)
  - Both workflows auto-start on project load

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   cd backend && npm install
   ```

2. **Configure Environment**
   - Copy `backend/.env.example` to `backend/.env`
   - Add your MongoDB connection string to `MONGODB_URI`
   - Generate secure random strings for JWT secrets

3. **Start Development**
   - Both frontend and backend start automatically via workflows
   - Frontend: http://localhost:5000
   - Backend: http://localhost:3000

## Production Deployment

The app is configured for deployment on Replit using the autoscale deployment target:
- Frontend serves static files via Expo web build
- Backend runs on separate port
- Environment variables must be configured in Replit Secrets

## Credits

This app was created using Expo and is designed for carpooling services.
