const path = require('path');

module.exports = {
  entry: './src/js/polyfills.js',
  output: {
    filename: 'polyfills.js',
    path: path.resolve(__dirname, 'lib/js'),
  },
};
