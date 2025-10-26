# EasyROAD - Carpooling Mobile App

## Overview

EasyROAD is a React Native carpooling mobile application built with Expo. The app connects drivers with passengers to make travel more accessible, affordable, and sustainable. It aims to reduce traffic congestion and environmental impact while fostering a community of trusted travelers.

## Technology Stack

- **Framework**: Expo (~54.0.20) with React Native (0.81.5)
- **Routing**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **UI Components**: Custom components with bottom sheets (@gorhom/bottom-sheet)
- **Navigation**: React Navigation with bottom tabs
- **Language**: TypeScript

## Project Structure

```
src/
├── app/                      # Expo Router app directory
│   ├── (tabs)/              # Tab-based navigation screens
│   │   ├── home/           # Home screen
│   │   ├── trips/          # Trips management
│   │   ├── chat/           # Chat functionality
│   │   └── profile/        # User profile
│   ├── bottom-sheets/      # Modal bottom sheets
│   ├── common/             # Common screens (settings, profile, etc.)
│   ├── _layout.tsx         # Root layout
│   ├── index.tsx           # Splash screen
│   └── global.css          # Global Tailwind styles
├── components/             # Reusable components
│   ├── ui/                # UI components (buttons, inputs, etc.)
│   └── auth/              # Authentication components
├── constants/             # App constants (colors, etc.)
├── data/                  # Data files
└── hooks/                # Custom React hooks

assets/                   # Static assets
start-web.js             # Custom web server start script
```

## Running the App

### Development

The app runs automatically via the configured workflow. The web version is served on port 5000.

To manually start the development server:
```bash
npm run web
```

Or using the custom start script:
```bash
node start-web.js
```

### Building

To create a production build:
```bash
npx expo export:web
```

## Key Features

- **User Authentication**: Phone number verification
- **Trip Planning**: Search and book rides
- **Trip Management**: View active and completed trips
- **Rating System**: Rate drivers and passengers
- **Chat**: Communication between users
- **Profile Management**: Edit user profiles and preferences
- **Payment Methods**: Manage payment options

## Configuration

### Environment Variables

The app uses the following environment variables for Replit deployment:

- `REACT_NATIVE_PACKAGER_HOSTNAME`: Set to `0.0.0.0` to bind to all interfaces
- `EXPO_DEVTOOLS_LISTEN_ADDRESS`: Set to `0.0.0.0` for dev tools
- `PORT`: Web server port (5000)

### Web Configuration

The app is configured to run on web using Metro bundler with the following settings:
- Port: 5000
- Host: 0.0.0.0 (allows Replit proxy access)
- Bundler: Metro (configured in `app.json`)
- Output: Static (for production builds)

## Known Issues & Warnings

1. **"Premature close" errors**: These appear in the Metro bundler logs but don't prevent the app from functioning. They're related to Metro's SSR rendering and can be safely ignored in development.

2. **Deprecated style props**: The app uses some deprecated shadow* style props that should be migrated to boxShadow. This is a low-priority issue that doesn't affect functionality.

3. **Invalid icon warning**: The app references "arrowright" which is not a valid icon name for the "anticon" family. This should be updated to a valid icon name.

## Development Notes

- The app uses React 19.1.0 and React Native 0.81.5
- Expo Router provides file-based routing similar to Next.js
- NativeWind enables Tailwind CSS usage in React Native components
- The app includes experimental features: typed routes and React Compiler

## Deployment

The app is configured for deployment on Replit using the autoscale deployment target. The deployment configuration automatically runs the web server on port 5000.

To publish the app, click the "Deploy" button in Replit.

## Recent Changes

- **2025-10-26**: Initial Replit setup
  - Configured Expo web server to bind to 0.0.0.0
  - Created custom start script (start-web.js)
  - Fixed missing default export in trip-rating.tsx
  - Updated .gitignore to exclude Replit config files
  - Configured workflow for automatic server startup
  - Set up deployment configuration

## Credits

This app was created using Expo and is designed for carpooling services.
