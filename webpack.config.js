const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

let config;

if (process.env.NODE_ENV === 'production') {
  config = require('./config/config.prod.js')
} else {
  config = require('./config/config.dev.js')
}


console.log(`----------- ${process.env.NODE_ENV} -----------`);

module.exports = {
  mode: 'none',
  entry: {
    'index': './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][hash].js'
  },

  devtool: 'source-map',

  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(config)
    }),
  ],

  optimization: {
    minimize: false
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
