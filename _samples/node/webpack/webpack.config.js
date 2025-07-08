const path = require('path');

module.exports = [
  {
    entry: './index.js',
    output: {
      filename: 'index.cjs.js',
      path: path.resolve(__dirname, 'lib'),
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  },
  {
    entry: './index.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'lib'),
      libraryTarget: 'module'
    },
    experiments: {
      outputModule: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  }
];
