const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


const isProd = process.env.NODE_ENV === 'production';
const API_URL = isProd
  ? 'prod_url'
  : 'dev_url'
;

const config = isProd
  ? require('./config/config.prod.js')
  : require('./config/config.dev.js')
;

console.log(`----------- ${process.env.NODE_ENV} -----------`);

module.exports = {
  entry: {
    'index': './src/index.jsx'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][hash].js'
  },

  devtool: 'source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['index'],
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'API_URL': JSON.stringify(API_URL),
      'CONFIG': JSON.stringify(config),
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              "@babel/preset-react"
            ],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
  }
};
