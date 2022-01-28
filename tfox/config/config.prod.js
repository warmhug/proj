var config = {
  publicPath: './',
  runtimeImport: {
    base: 'https:///gw.alipayobjects.com/os/lib/',
    js: {
      react: {
        moduleName: 'React',
        url: '??react/16.13.0/umd/react.production.min.js,react-dom/16.13.1/umd/react-dom.production.min.js'
      },
      'react-dom': {
        moduleName: 'ReactDOM',
        url: '??react/16.13.0/umd/react.production.min.js,react-dom/16.13.1/umd/react-dom.production.min.js'
      },
      moment: {
        moduleName: 'moment',
        url: '??moment/2.29.1/min/moment.min.js,moment/2.29.1/locale/zh-cn.js'
      },
      lodash: {
        moduleName: '_',
        url: '??lodash/4.17.20/lodash.min.js'
      },
      'lodash-es': {
        moduleName: '_',
        url: '??lodash/4.17.20/lodash.min.js'
      },
      '@antv/data-set': {
        moduleName: 'DataSet',
        url: '??antv/data-set/0.11.8/dist/data-set.js'
      },
      '@antv/g2': {
        moduleName: 'G2',
        url: '??antv/g2/4.1.11/dist/g2.min.js'
      },
      '@antv/l7': {
        moduleName: 'L7',
        url: '??antv/l7/2.3.7/dist/l7.js'
      },
      'video-react': {
        moduleName: 'window["video-react"]',
        url: '??video-react/0.14.1/dist/video-react.full.min.js'
      }
    },
    css: {
      'video-react/dist/video-react.css': '??video-react/0.14.1/dist/video-react.css'
    }
  }
};
export default config;
