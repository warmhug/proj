import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { NAMESPACE } from '../../models/editor';
import ListWrap from './ListWrap'
import ListContent from './ListContent'

export default () => {
  const dispatch = useDispatch();
  const { openTempData, openInstanceData } =
    useSelector((state) => state[NAMESPACE]);
  const loadings = useSelector((state) => state.loading.effects);
  const temploading = loadings[`${NAMESPACE}/getTemplateList`];
  const loading = loadings[`${NAMESPACE}/getInstanceList`];

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getTemplateList`,
      isOpen: true,
    });
    dispatch({
      type: `${NAMESPACE}/getInstanceList`,
      isOpen: true,
    });
  }, [dispatch])

  return (
    <ListWrap>
      <div className="subtitle">推荐模板</div>
      <ListContent
        gType="template"
        dataSource={openTempData}
        loading={temploading}
        btn={{ text: '使用模板', urlKey: 'cloneFromId' }}
        loadMore={pageIndex => dispatch({
          type: `${NAMESPACE}/getTemplateList`,
          isOpen: true,
          payload: { pageIndex },
        })}
      />
      <div className="subtitle">公开的架构图</div>
      <ListContent
        dataSource={openInstanceData}
        loading={loading}
        btn={{ text: '克隆', urlKey: 'cloneFromId' }}
        loadMore={pageIndex => dispatch({
          type: `${NAMESPACE}/getInstanceList`,
          isOpen: true,
          payload: { pageIndex },
        })}
      />
    </ListWrap>
  )
}
