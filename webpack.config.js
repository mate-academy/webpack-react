const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

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
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
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
