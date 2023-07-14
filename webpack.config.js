const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },

  plugins: [
    new HTMLWebpackPlugin({
      title: 'Development',
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.ttf$/i,
        type: 'asset/resource',
      },
    ],
  },
  // COME BACK TO THIS IF NEEDED
  devServer: {
    // static: {
    //   directory: path.resolve(__dirname, 'dist'),
    //   publicPath: '/build'
    // },
    compress: true,
    port: 8080,
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
};
