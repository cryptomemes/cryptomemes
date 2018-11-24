const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

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
    new webpack.DefinePlugin({
      'process.env.PUBLIC_ADDRESS': JSON.stringify(process.env.PUBLIC_ADDRESS || '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'),
      'process.env.HTTP_PROVIDER': JSON.stringify(process.env.HTTP_PROVIDER || 'http://127.0.0.1:7545'),
      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL || 'http://localhost:3000')
  }),
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
