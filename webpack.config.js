var webpack = require('webpack')
var path = require('path')
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

module.exports = {
  entry: {
    'trouter': __dirname + '/src/Router.js',
    'trouter.min': __dirname + '/src/Router.js'
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'trouter',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|\.spec\.js$)/
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      minimize: true,
      include: /\.min\.js$/,
      exclude: /node_modules/
    })
  ],
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  }
}
