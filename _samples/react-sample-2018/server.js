/*eslint-disable no-console */
const path = require('path')
var express = require('express')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpack = require('webpack')
var WebpackConfig = require('./webpack.config')

// entry 添加 babel-polyfill 支持
// WebpackConfig.entry = ['babel-polyfill', './src/index.js'];

var app = express()

// 将 Webpack 打包后的文件路径设置为静态文件目录
app.use(express.static(__dirname + '/dist'))
// 添加根路径路由
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: WebpackConfig.output.publicPath,
  stats: {
    colors: true
  }
}));

// app.get('/aa', function(req, res) {
//   res.send('aaa');
// });

app.listen(8000, function () {
  console.log('Server listening on http://localhost:8000, Ctrl+C to stop')
});
