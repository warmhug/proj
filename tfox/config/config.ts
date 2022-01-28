import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    FOO: 'bar',
  },
  base: '/',
  alias: {
    '@': '../src'
  },
  hash: false,
  history: { type: 'hash' },
  locale: {
    "default": 'zh-CN',
    antd: true
  },
  devServer: {
    // https: true
  },
  targets: {
    ie: 11
  },
  dynamicImport: {
    // loading: '@xxx/umi-loading'
  },
  externals: {
    'moment/locale/zh-cn': 'moment'
  },
  // qiankun: {
  //   slave: {}
  // },
  // mountElementId: 'root-slave',
  dynamicPublicPath: {},
  routes: [{
    path: '/',
    component: '@/layouts/index',
    // redirect: '/home',
    routes: [
      { path: '/editor', component: '@/routes/Editor' },
      { path: '/editor1', component: '@/routes/Editor/index1' },
      { path: '/graph', component: '@/routes/List/Graph' },
      { path: '/mygraph', component: '@/routes/List/GraphMy' },
      { path: '/maintain', component: '@/routes/Maintain' },
      { path: '/preview', component: '@/routes/Preview' },
      { path: '/home', component: '@/routes/Home' },
      { path: '/', component: '@/routes/Home' },
    ],
  }],
  chainWebpack(config, { env, webpack, createCSSRule }) {
    console.log('env===', env, process.env.UMI_ENV);
    const rule = config.module.rule('xml-raw-loader');
    rule.test(/\.(xml|txt)$/);
    rule.use('xml-raw-loader').loader('raw-loader').end();
    // config.module.rules.push({ test: /\.(xml|txt)$/, use: ['raw-loader'] })
    // return;
    config.merge({
      optimization: {
        minimize: process.env.NODE_ENV === 'production' || process.env.BUILD_ENV === 'cloud',
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendors: {
              minChunks: 2,
              minSize: 30000,
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true,
              test: /[\\/]node_modules[\\/]/
            }
          }
        }
      }
    });
  },
});
