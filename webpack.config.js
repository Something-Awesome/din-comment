const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: __dirname + '/client',
  entry: './index.js',
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'env']
      },
    }, ],
  },
  output: {
    path: __dirname + '/public',
    filename: 'app.js',
  }
};

// module.exports = {
//   entry: __dirname + '/client/src/index.jsx',
//   module: {
//     rules: [
//       {
//         test: [/\.jsx$/],
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['env', 'react'],
//         }
//       }
//     ]
//   },
//    output: {
//     filename: 'bundle.js',
//     path: __dirname + '/client/dist'
//   }
// };