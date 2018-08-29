const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/env']
          }
        }
      }
    ]
  },
  target: 'node',
  output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: 'build/'
  },
  
  plugins: [
    new Dotenv()
  ]
};