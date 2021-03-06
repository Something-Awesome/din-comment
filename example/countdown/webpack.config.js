const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: __dirname + '/client',
  entry: './index.js',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'env']
      },
      "plugins": ["react-hot-loader/babel"]
    }, ],
  },
  output: {
    path: __dirname + '/public',
    filename: 'app.js',
  }
};