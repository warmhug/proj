/* eslint max-len: 0 */
import React, { useEffect } from 'react';
import { useDispatch, useHistory, Link } from 'umi';
import { Button, Dropdown, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { NAMESPACE } from '../../models/editor';
import { hideNav } from '../../utils';
import './ListWrap.less';

const pageNames = {
  '/graph': '架构图范例库',
  '/mygraph': '我的架构图',
}

export default ({ children }) => {
  const dispatch = useDispatch();
  const his = useHistory();

  useEffect(() => {
    return () => {
      // console.log('rrrrr');
      dispatch({ type: `${NAMESPACE}/reset` })
    }
  }, [dispatch])

  const overlay = (
    <Menu><Menu.Item><Link to="/editor1">自由架构图(测试)</Link></Menu.Item></Menu>
  );

  return (
    <div className="glist">
      <div className="glist-header">
        <div className="glist-header-title">
          {hideNav ? Object.keys(pageNames).map(pn => (
            <Link
              key={pn}
              className={his.location.pathname === pn ? 'sel' : ''}
              to={pn}
            >
              {pageNames[pn]}
            </Link>
          )) : pageNames[his.location.pathname]}
        </div>
        {/* <Link to="/editor"><Button type="primary" icon={<PlusOutlined />}>新建架构图</Button></Link> */}
        <Dropdown overlay={overlay} placement="bottomLeft" arrow>
          <Link to="/editor"><Button type="primary" icon={<PlusOutlined />}>标准架构图</Button></Link>
        </Dropdown>
      </div>
      <div className="glist-main">{children}</div>
    </div>
  )
}

// ListWrap.propTypes = {
//   children: PropTypes.node,
// };
