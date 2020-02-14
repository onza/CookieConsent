const path = require('path');

module.exports = {
  entry: './src/polyfills.js',
  output: {
    filename: 'polyfills.js',
    path: path.resolve(__dirname, 'lib'),
  },
};
