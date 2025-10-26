const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Allow all hosts for Replit proxy
  if (config.devServer) {
    config.devServer.allowedHosts = 'all';
    config.devServer.host = '0.0.0.0';
  }
  
  return config;
};
