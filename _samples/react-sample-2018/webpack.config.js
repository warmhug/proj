const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const LessThemePlugin = require('webpack-less-theme-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const postcssOpts = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins: () => [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    // pxtorem({ rootValue: 100, propWhiteList: [] })
  ],
};

module.exports = {
  devtool: 'source-map', // or 'inline-source-map'
  devServer: {
    disableHostCheck: true
  },

  // entry: {
  //   home: './home.js',
  //   about: './about.js',
  // },
  // entry: () => './demo',
  entry: './src/index.js',  // 默认

  output: {
    // path: path.join(__dirname, '/dist'),
    // filename: '[name].js',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },

  resolve: {
    // modules 要搞清楚怎么配？
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    extensions: ['.web.js', '.jsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            ["transform-runtime", { polyfill: false }],
            ["import", [
              { "style": "css", "libraryName": "antd" },
              // { "style": true, "libraryName": "@alipay/afui" },
              { "style": "css", "libraryName": "antd-mobile" }
            ]]
          ]
        }
      },
      { test: /\.(jpg|png)$/, loader: "url-loader?limit=8192" }, //把不大于8kb的图片打包处理成Base64
      { test: /\.(svg)$/i, loader: 'svg-sprite-loader', include: [
        require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
        // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 自己私人的 svg 存放目录
      ]},
      // { test: /\.css$/, loader: 'style!css' }, // 把css处理成内联style，动态插入到页面
      // { test: /\.less$/, loader: 'style!css!less' }, // loader 处理顺序：先less 后css 最后style
      // less-loader requires less as peer dependency
      {
        test: /\.less$/i, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader', { loader: 'postcss-loader', options: postcssOpts }, 'less-loader'
          ]
        })
      },
      {
        test: /\.css$/i, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader', { loader: 'postcss-loader', options: postcssOpts }
          ]
        })
      }
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.optimize.CommonsChunkPlugin({
      // minChunks: 2,
      name: 'shared',
      filename: 'shared.js'
    }),
    new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
    new LessThemePlugin({ theme: './red.less' }),
    new HtmlWebpackPlugin({
      template: './src/index.html', // 指定模板文件
    }),
  ]
}
