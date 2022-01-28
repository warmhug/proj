import { Spin } from 'antd';
import React from 'react';
import './index.less';

export default ({ tip }) => {
  return (
    <div className="global-loading"><Spin tip={`${tip}`} /></div>
  )
}
