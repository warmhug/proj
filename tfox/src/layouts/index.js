import React, { useEffect } from 'react'
import { Badge } from 'antd';
import { useDispatch, useHistory, useSelector } from 'umi';
import GlobalLoading from '@/components/Loading';
import { NAMESPACE } from '@/models/app';
import { hideNav } from '@/utils';
import Header from './Header';
import './index.less';

const intlObj = {
  'ui.menu.editor': '编辑器',
  'ui.menu.editor1': '编辑器',
  'ui.menu.maintain': '数据维护',
  'ui.menu.graph': '架构图范例库',
  'ui.menu.mygraph': '我的架构图',
  'ui.menu.preview': '查看',
};
const leftMenus = [{
  label: (
    <Badge count="beta" className="logo-tit" offset={[20, -14]}>
      架构设计器
    </Badge>
  ),
  key: '/',
  link: '/',
}];
const rightMenus = [
  { label: '架构图范例库', key: '/graph', link: '/graph' },
  { label: '我的架构图', key: '/mygraph', link: '/mygraph' },
];

export default ({ children }) => {
  const his = useHistory();

  const dispatch = useDispatch();
  const { dayuInfo } = useSelector(state => state[NAMESPACE]);

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getUserInfo`,
    })
  }, [dispatch]);

  useEffect(() => {
    const pageName = his.location.pathname.replace('/', '');
    document.title = intlObj[`ui.menu.${pageName}`] || '架构图设计器';
  }, [his.location.pathname]);

  return (
    <>
      {!hideNav ? (
        <Header
          history={his}
          rightMenus={rightMenus}
          leftMenus={leftMenus}
        />
      ) : null}
      <div className="dtmp-layout">
        {dayuInfo.accountId ? children : (
          <GlobalLoading tip={'正在获取用户信息...'} />
        )}
      </div>
    </>
  )
}
