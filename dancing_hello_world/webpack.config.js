module.exports = {
    mode: 'development',
    entry: './js/main.js',
    devServer: {
      hot: true,
      contentBase: './',
      historyApiFallback: true
    }
  };