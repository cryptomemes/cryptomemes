const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/frontend/index.jsx',
  ],
  output: {
    path: path.join(process.cwd(), '/public/js/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.jsx?/,
        options: {
          plugins: [
            ['import', { libraryName: 'antd', style: true }],
          ],
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
          }],
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    {
      test: /\.json$/,
      use: [
        {
          loader: 'json-loader',
        }],
    },
    {
      test : /\.sol$/,
      use : [
        {
          loader : 'truffle-solidity-loader',
        }
      ]
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
        }],
    }, 
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
};
