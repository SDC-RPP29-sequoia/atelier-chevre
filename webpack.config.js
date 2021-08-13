const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const zlib = require('zlib');


module.exports = {
  plugins: [new MiniCSSExtractPlugin({
    filename: 'styles.css'
  }), new CompressionPlugin({
    filename: '[path][base].br',
    algorithm: 'brotliCompress',
    test: /\.(jsx|js|css|html|svg)$/,
    compressionOptions: {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      },
    },
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
  })],
  entry: path.resolve(__dirname, '/client/src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'client/public'),
    filename: 'bundle.js',
  },
};