const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // },
  module: { // 模块配置
    rules: [
      {
        test: /\.jsx?$/, // 使用正则来匹配js或jsx文件
        exclude: /node_modules/, // 排除node_modules目录
        use: {
          loader: 'babel-loader', // Babel加载器
          options: {
            // plugins: [
            //   // ["transform-runtime", { polyfill: false }],
            // 如果配置按需加载, 这样代码会不起作用 import * as AntdComps from 'antd';
            //   ["import", { "style": "css", "libraryName": "antd" }]
            // ],
            presets: ['@babel/preset-react'] // 预设使用React
          }
        }
      },
      {
        test: /\.css$/, // 匹配CSS文件
        use: ['style-loader', 'css-loader'] // CSS加载器
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // 匹配图片文件
        use: ['file-loader'] // 文件加载器
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html' // HTML模板文件路径
    })
  ],
  devServer: { // 开发服务器配置
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true
  },
  resolve: {
    extensions: ['.js', '.jsx'] // 自动解析确定的扩展
  }
};
