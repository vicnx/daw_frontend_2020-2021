module.exports = {
    mode: 'development',
    entry: './js/main.js',
    devServer: {
      hot: true,
      contentBase: './',
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    }
  };
