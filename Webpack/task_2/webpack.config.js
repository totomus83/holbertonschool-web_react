const path = require('path');

module.exports = {
  mode: 'production',
  entry: './js/dashboard_main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
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