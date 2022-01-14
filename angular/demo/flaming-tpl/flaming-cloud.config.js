module.exports = {

  // server
  server: {
    port: 8000
  },

  // 默认代理的服务器地址
  proxies: {
    core: 'http://xxx'
  },

  // 通用脚本地址
  staticScripts: [
    'static/vendor/**/*.js'
  ],

  // 业务脚本地址
  appScripts: [
    'router.js',
    'layouts/**/*.js',
    'bundles/**/*.js',
    'facade/**/*.js',
    'common/**/*.js'
  ],

  // 样式文件地址
  appStyles: [
    'bundles/**/*.css',
    'bundles/**/*.less',
    'static/css/**/*.css',
    'static/css/**/*.less'
  ],

  // 需要部署到 webroot 的文件列表
  targets: [
    'index.html',
    'dist/**/*',
    'bundles/**/*',
    'layouts/**/*',
    'common/**/*',
    '404.html',
    '403.html'
  ],

  // 部署目录
  webroot: '../htdocs/htdocs'

};
