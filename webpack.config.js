var path = require('path');

module.exports = {
  cache: true,
  entry: {
    app: './client/app.jsx'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js(x|)?$/,
        loader: 'babel-loader?stage=1'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
