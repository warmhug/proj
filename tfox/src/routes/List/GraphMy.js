import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Input } from 'antd';
import { NAMESPACE } from '../../models/editor';
import ListWrap from './ListWrap';
import ListContent from './ListContent';

export default () => {
  const dispatch = useDispatch();
  const { instanceData, tempData } = useSelector((state) => state[NAMESPACE]);
  const loadings = useSelector((state) => state.loading.effects);
  const temploading = loadings[`${NAMESPACE}/getTemplateList`];
  const loading = loadings[`${NAMESPACE}/getInstanceList`];
  const [srhVal, setSrhVal] = useState('')

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getTemplateList`,
    });
    dispatch({
      type: `${NAMESPACE}/getInstanceList`,
    })
  }, [dispatch])

  const onSearch = (value, pageIndex) => {
    dispatch({
      type: `${NAMESPACE}/getInstanceList`,
      payload: { name: value, pageIndex },
    });
  };

  // const onDel = ({ id }) => {}

  return (
    <ListWrap>
      <div className="srh">
        <Input.Search
          allowClear
          placeholder="搜索我的架构图"
          value={srhVal}
          onSearch={val => onSearch(val, 1)}
          onChange={(e) => setSrhVal(e.target.value)}
        />
      </div>
      <ListContent
        dataSource={instanceData}
        loading={loading}
        btn={{ text: '选择编辑', urlKey: 'id', icon: true }}
        loadMore={pageIndex => onSearch(srhVal, pageIndex)}
      />
      <div className="subtitle">我的模板</div>
      <ListContent
        gType="template"
        dataSource={tempData}
        loading={temploading}
        btn={{ text: '使用模板', urlKey: 'cloneFromId' }}
        loadMore={pageIndex => dispatch({
          type: `${NAMESPACE}/getTemplateList`,
          payload: { pageIndex },
        })}
      />
    </ListWrap>
  );
};
