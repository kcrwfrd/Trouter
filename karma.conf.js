module.exports = function(config) {
  config.set({
    basePath: './',
    files: [
      { pattern: 'src/**/*.spec.js', watched: false }
    ],
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      module: {
        preLoaders: [
          {
            test: /\.spec\.js$/,
            include: /src/,
            exclude: /(bower_components|node_modules)/,
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
            },
          },
        ],
        loaders: [
          { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  })
}
