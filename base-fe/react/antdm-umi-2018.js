
// antd-mobile@2 模版
// head 标签
// 不需要设置 meta name="viewport" content=""
// 高清方案脚本 https://os.alipayobjects.com/rmsportal/lvEQQbNgHsIxVfXLkmuX.js
// body 标签
// /dist/shared.js
// /dist/file_name.js
// https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js
if ('addEventListener' in document) {
  window.addEventListener('load', function() {
    FastClick.attach(document.body);
  }, false);
}

import React from 'react';
// import js and css modularly, parsed by babel-plugin-antd
import { Button } from 'antd-mobile';
// import pc antd
import { Button as ButtonPc } from 'antd';
// import 'antd/lib/button/style/index.css';
// import ButtonPc from 'antd/lib/button';
export default class Antd extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={(e) => console.log('mobile', e) }>Start</Button> <br />
        <ButtonPc onClick={(e) => console.log(e)}>Start</ButtonPc>
      </div>
    );
  }
}


// umi.js config
export default {
  // appType 标记为 h5, 就会官方植入 hd, fastclick 等移动研发相关解决方案;
  appType: 'h5 | console',
  // deployMode: 'assets | custom',
  deployMode: {
    mode: 'online',
  },
  favicon: false,
  title: '标题',
  targets: {
    ios: 8,
    android: 4,
    chrome: 33,
  },
  // 是否关掉 cssModule;
  disableCSSModules: true,
  deer: {
    // 埋点位
    spma: 'a1153',
  },
  // 异常搜集
  clue: { pid: '12345' },
  dynamicImport: {
    webpackChunkName: false,
    loadingComponent: '../src/component/Loading',
  },
  theme: {
    // 'brand-primary': '#108ee9',
  },
  locale: {
    enable: true,
  }
  // 去除默认加上的 .html 后缀
  exportStatic: null,
  // 解决对于 node_modules 有 es6 会在 build 报错
  es5ImcompatibleVersions: true,
  // Android 4 里 Set Promise 未定义错误
  // 如果是 assets 应用，没有用到 bigfish 构建出来的 HTML, script 配置无效，需手动修改后端 html 文件添加
  script: [
    'https://a.alipayobjects.com/g/component/??es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js',
  ],
  proxy: {
    dev: {
      'eworkcard/api/': {
        target: 'http://xx.alipay.net',
      },
    },
    test: {},
    pre: {},
  }
  routes: [{
    path: '/',
    indexRoute: {
      title: 'ww',
      spmb: 'b9903',
      component: 'index',
    },
    component: '../layout',
    routes: [
      {
        path: 'index',
        spmb: 'b9903',
        component: 'index',
      },
      {
        path: 'guide',
        spmb: 'b9901',
        title: 'xx',
        component: 'guide',
      },
    ],
  }],
}

// umi.js / bigfish.js model
// from 2018-2019 云游 @pofeng
import axios from 'axios';
import { Action } from 'redux';
type ModelState = {
  params: object;
};
type SetStateAction = Action & { payload: Partial<ModelState> };

function setState(payload: Partial<ModelState>) {
  const action: SetStateAction = { type: 'setState', payload };
  return action;
}
const getInitialState = (): ModelState => {
  return {
    architecture: [],
  };
};
const namespace = 'xxx';
export default {
  namespace,
  state: getInitialState(),
  reducers: {
    setState(state: ModelState, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetchData(_, effectMap: EffectsCommandMap) {
      const { call, put, fork, select } = effectMap;
      yield fork(() => fetch_deploymentUnitWhiteList(_, effectMap));
      try {
        const modelState: ModelState = yield select(state => state[namespace]);
        const rsp: IServiceResponse = yield call(() => axios.get(`/api/envs/${envId}`));
        yield put(setState({ architecture: rsp.data.data }));
      } catch (e) {
        yield put(setState({ architecture: getInitialState().architecture }));
      }
    },
  },
};

// umi.js / bigfish.js  page
import React, { PureComponent } from '@alipay/bigfish/react';
import { Divider, Icon, Layout, Menu } from '@alipay/bigfish/antd';
import { List, WingBlank, Button, Flex } from '@alipay/bigfish/antd-mobile';
import { connect } from '@alipay/bigfish/sdk';
import history from '@alipay/bigfish/sdk/history';
import { Link } from '@alipay/bigfish/sdk/router';
import { formatMessage } from '@alipay/bigfish/locale';
import { replace, map, indexOf } from "@alipay/bigfish/util/lodash";
import qs from '@alipay/bigfish/util/query-string';
'@alipay/bigfish/eslint'
'@alipay/bigfish/stylelint'
@connect(({ page, guide }) => ({ page, guide }))
@NavWrapper
export default class App extends PureComponent {
  componentDidMount() {
  }
  goBack = (ev) => {}
  render() {}
}
