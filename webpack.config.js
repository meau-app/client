const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const webpack = require('webpack');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.plugins = [
    ...config.plugins,
    new webpack.DefinePlugin({
      process: {env: {}},
    }),
  ];
  return config;
};