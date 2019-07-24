const path = require('path');

module.exports = {
  entry: './src/renderer.js',
  output: {
    filename: 'js/renderer.js',
    path: path.resolve(__dirname, 'public')
  }
};