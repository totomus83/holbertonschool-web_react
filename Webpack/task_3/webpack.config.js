const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    header: './modules/header/header.js',
    body: './modules/body/body.js',
    footer: './modules/footer/footer.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    port: 8564,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
      test: /\.(css)$/,
      use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: 'javascript/auto',
        use: [
          { loader: 'file-loader',
            options: {
              publicPath: './',
              esModule: false,
            }
          },
          { loader: 'image-webpack-loader',
            options: {

            }
          },
        ],
      },
    ],
  },
};