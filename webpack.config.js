const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: './lib'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'lib'),
    library: 'kontris',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Kontris',
      template: path.resolve(__dirname, './index.html'),
      inject: 'head'
    }),
    new CopyWebpackPlugin({
      patterns: ['./vendor/'],
      options: {}
    }),
    new WriteFilePlugin()
  ]
};
