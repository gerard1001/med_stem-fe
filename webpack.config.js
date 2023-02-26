const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

dotenv.config();

const envKeys = {
  'process.env.DEPLOY_PRIME_URL': JSON.stringify(process.env.DEPLOY_PRIME_URL),
  'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL)
};

module.exports = {
  target: 'web',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/',
    environment: {
      module: true,
      dynamicImport: true
    }
  },
  devtool: 'eval-source-map',
  mode: process.env.NODE_ENV || 'development',
  resolve: { extensions: ['*', '.js', '.jsx'] },
  devServer: {
    port: process.env.PORT || '3000',
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    open: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({ template: 'public/index.html' }),
    new webpack.DefinePlugin(envKeys),
    new CleanWebpackPlugin()
  ]
};
