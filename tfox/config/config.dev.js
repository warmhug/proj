var config = {
  fastRefresh: {},
  nodeModulesTransform: {
    type: 'none'
  },
  runtimeImport: {
    base: 'https:///gw.alipayobjects.com/os/lib/',
    js: {
      react: {
        moduleName: 'React',
        url: '??react/16.13.0/umd/react.development.js,react-dom/16.13.1/umd/react-dom.development.js'
      },
      'react-dom': {
        moduleName: 'ReactDOM',
        url: '??react/16.13.0/umd/react.development.js,react-dom/16.13.1/umd/react-dom.development.js'
      },
      moment: {
        moduleName: 'moment',
        url: '??moment/2.29.1/moment.js,moment/2.29.1/locale/zh-cn.js'
      },
      lodash: {
        moduleName: '_',
        url: '??lodash/4.17.20/lodash.js'
      },
      'lodash-es': {
        moduleName: '_',
        url: '??lodash/4.17.20/lodash.js'
      },
      '@antv/data-set': {
        moduleName: 'DataSet',
        url: '??antv/data-set/0.11.8/build/data-set.jsh'
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
        url: '??video-react/0.14.1/dist/video-react.full.js'
      }
    },
    css: {
      'video-react/dist/video-react.css': '??video-react/0.14.1/dist/video-react.css'
    }
  }
};
export default config;
