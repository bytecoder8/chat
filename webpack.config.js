const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')


module.exports = (env = {}) => {
  return {
    mode: env.production ? 'production' : 'development',
    entry: {
      index: './src/index.js'
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build')
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/i,
          exclude: /node_modules/i,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.html$/i,
          use: [{
            loader: 'html-loader'
          }]
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      minimize: !!env.production,
      minimizer: [ new TerserWebpackPlugin() ]
    },
    devtool: 'cheap-eval-source-map',
    devServer: {
      port: process.env.PORT || 3000
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html'
      }),
      new CleanWebpackPlugin()
    ]
  }
}
