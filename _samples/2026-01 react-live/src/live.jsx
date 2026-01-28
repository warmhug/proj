import React from 'react';
// console.log('log React: ', React);

import { LiveError, LivePreview, LiveProvider, LiveEditor } from 'react-live';
import { omit } from 'lodash';

import { Icon, Button, Modal } from 'antd';
import * as AntdComps from 'antd';
// console.log('log AntdComps: ', AntdComps);

import codes, { codeDemos } from './codes';

const scope = {
  React,
  ...AntdComps,
  ...omit(AntdComps, ['default']),
  Icon,
};

// https://github.com/FormidableLabs/react-live

export default function Live() {
  let code = codes[1];
  // code = codeDemos[4];

  let containerStyle = {
    width: 700, height: 500, margin: 20, border: '1px solid gray',
    overflowX: 'hidden',
    overflowY: 'scroll',
    // 当子元素是 position fixed 定位,
    // 父元素设置 transform , 则 fixed 子元素 就不再相对于 viewport，而是相对于这个祖先容器。
    // 否则 fixed 子元素, 不受父元素 overflow hidden 影响.
    transform: 'translateZ(0)',
    // transform: 'scale(1)',
  };
  // containerStyle = {};

  return (
    <LiveProvider code={code} scope={scope}>
      <div style={containerStyle}>
        <LivePreview className="aaa" />
        <LiveError />
      </div>
      <LiveEditor />
    </LiveProvider>
  )
}
