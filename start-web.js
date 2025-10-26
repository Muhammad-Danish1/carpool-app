#!/usr/bin/env node

const { spawn } = require('child_process');

const env = {
  ...process.env,
  PORT: '5000',
  REACT_NATIVE_PACKAGER_HOSTNAME: '0.0.0.0',
  EXPO_DEVTOOLS_LISTEN_ADDRESS: '0.0.0.0',
  WDS_SOCKET_HOST: '0.0.0.0',
  WDS_SOCKET_PORT: '5000',
  EXPO_USE_STATIC: 'enabled',
};

const expo = spawn('npx', ['expo', 'start', '--web', '--port', '5000'], {
  env,
  stdio: 'inherit',
  shell: true,
});

expo.on('exit', (code) => {
  process.exit(code);
});

process.on('SIGINT', () => {
  expo.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  expo.kill('SIGTERM');
  process.exit(0);
});
