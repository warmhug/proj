import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { useDispatch } from 'umi';
import { NAMESPACE } from '../../models/editor';
import GraphList from '../../components/GraphList';

export default (props) => {
  const dispatch = useDispatch();
  const [delId, setDelId] = useState(null);
  const [openId, setOpenId] = useState(null);

  const onDel = ({ id }, gType) => {
    Modal.confirm({
      title: '确认删除吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: `${NAMESPACE}/delGraph`,
          payload: { id },
          path: gType,
          callback: (success) => {
            if (success) {
              message.success('删除成功');
              setDelId(id)
            }
          },
        });
      },
      onCancel: () => setDelId(null),
    });
  }

  const onOpen = (item, gType) => {
    const { id, open } = item;
    dispatch({
      type: `${NAMESPACE}/openGraph`,
      payload: { id, open: !open, gType },
      callback: (res) => {
        const txt = !open ? '公开' : '不公开';
        res ? message.success(`${txt}成功`) : message.error(`${txt}失败`);
        res ? setOpenId(id) : setOpenId(null);
      },
    });
  };

  // const loadMore = (item) => {
  // }

  return (
    <GraphList
      {...props}
      delId={delId}
      openId={openId}
      onDel={onDel}
      onOpen={onOpen}
      // loadMore={loadMore}
    />
  );
};

// ListContent.propTypes = {
//   graphType: PropTypes.string,
// };
