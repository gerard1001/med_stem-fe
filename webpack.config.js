const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebPackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

dotenv.config();

function prepareBackendUrl(url) {
  if (url.endsWith('/')) {
    return url.split('').slice(0, -1).join('');
  }
  return url;
}

// HERE is where we add envs to have them shown in react
const envKeys = {
  'process.env.BACKEND_URL': prepareBackendUrl(
    JSON.stringify(process.env.BACKEND_URL)
  )
};

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/',
    environment: {
      module: true,
      dynamicImport: true
    }
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  mode: process.env.NODE_ENV || 'development',
  resolve: { extensions: ['.js', '.jsx'] },
  devServer: {
    port: process.env.PORT || '3000',
    historyApiFallback: true,
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
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({ template: 'public/index.html' }),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: './public/assets', to: 'assets' }]
    // }),
    new webpack.DefinePlugin(envKeys),
    new CleanWebpackPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
