
var webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "crypto": false, // Add more polyfills or fallbacks as needed
      "child_process": false,
      // Add other Node.js modules you need to polyfill or mock
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser', // Polyfill for the process module
    }),
  ],
};
