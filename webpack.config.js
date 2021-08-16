const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const zlib = require('zlib');


module.exports = {
  entry: {
    index: './client/src/index.js',
    app: './client/src/components/App/App.jsx',
    header: './client/src/components/Header/Header.jsx',
    questions: ['./client/src/components/QA/QuestionsAndAnswers.jsx', './client/src/components/QA/AnswerModal.jsx', './client/src/components/QA/QuestionModal.jsx'],
    productOverview: './client/src/components/ProductOverview/ProductOverview.jsx',
    reviews: './client/src/components/Reviews/RatingsAndReviews.jsx',
    stars: '/client/src/components/Stars/Stars.jsx'
  },
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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.ico$/i,
        type: 'asset/resource',
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'client/public'),
    filename: '[name].bundle-[contenthash].bundle.js',
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
    }
  },
  plugins: [
    new CompressionPlugin({
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
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/client/src/template.html',
      favicon: './client/src/favicon.ico',
      inject: 'body'
    })],
};
