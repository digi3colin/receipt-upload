const path = require('path');
const entry = require('./entry.config');

module.exports = {
  mode: 'production',
  entry,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../../public/media/js/dist'),
  },
  module: {
    rules: [
      {
        test: /\.(m?js)|tsx|ts|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-runtime'
            ],
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
};