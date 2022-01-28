/* eslint max-len: 0 */
import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { useHistory, useDispatch, useSelector } from 'umi';
import { Radio, Modal, message } from 'antd';
import { NAMESPACE } from '../../../models/editor';
import GraphList from '../../../components/GraphList';
import { EditorContext, getQs, getImg } from '../common';

const { Group: RadioGroup } = Radio;

export default (props) => {
  const editorRef = useRef(null);
  editorRef.current = useContext(EditorContext);
  const dispatch = useDispatch();
  const { openTempData, tempData } = useSelector((state) => state[NAMESPACE]);
  const loadings = useSelector((state) => state.loading.effects);
  const temploading = loadings[`${NAMESPACE}/getTemplateList`];

  const { visible, onVisible, graphInfo, graphRef, typeKey, onCreate, submitInstance } = props;
  const [tabKey, setTabKey] = useState('my');
  // visible 状态统一由 外部 控制，避免混乱
  // const [buildVisible, setBuildVisible] = useState(visible);
  const history = useHistory();
  const getTemplateList = useCallback((obj = {}, isOpen) => {
    dispatch({
      type: `${NAMESPACE}/getTemplateList`,
      payload: { pageIndex: 1, ...obj },
      isOpen,
    });
  }, [dispatch]);

  useEffect(() => {
    if (visible) {
      getTemplateList({}, tabKey === 'official');
    }
  }, [visible, getTemplateList, tabKey]);

  const newGraph = useCallback((gData, type = 'template') => submitInstance((succ) => {
    const { xml, id: cloneFromId, xmlText, typeKey: curTypeKey } = gData;
    if (!succ) {
      message.error('当前图形未提交成功');
      return;
    }
    // 跳转到新页面建复杂图
    if (typeKey !== curTypeKey && curTypeKey === 'freedom') {
      onVisible(false);
      const baseName = location.hostname === 'tfox.dayu.work' ? '' : '/tfox';
      window.open(`${location.origin}${baseName}/editor1?cloneFromId=${cloneFromId}&type=${type}`);
      return;
    }
    const typeMap = { template: 'templateId', instance: 'instanceId' };
    const idPara = cloneFromId ? { [typeMap[type]]: cloneFromId } : {};
    // 模板选择，新增
    const _xml = xml || editorRef.current?._cleanXml;
    getImg(editorRef.current?.graph, graphRef, (fileString) => dispatch({
      type: `${NAMESPACE}/insertInstance`,
      payload: { xml: _xml, fileString, typeKey, ...idPara },
      callback: (success, data) => {
        if (!success) {
          message.error('新建失败');
          return
        }
        onCreate({ ...data, xml: _xml, xmlText });
      },
    }));
  }), [typeKey, graphRef, dispatch, submitInstance]);

  useEffect(() => {
    const { id, cloneFromId, type } = getQs()
    if (graphInfo.id) {
      return;
    }
    // 编辑图形
    if (id && !cloneFromId) {
      dispatch({
        type: `${NAMESPACE}/getGraphDetail`,
        payload: { id },
        callback: (success, data) => {
          if (success && data) {
            if (!data.own) {
              // dispatch(routerRedux.replace(`/preview?id=${data.id}&type=instance`));
              history.replace(`/preview?id=${data.id}&type=instance`);
              return;
            }
            // 兼容 从大禹点进来的 editor 的老连接，跳转到 editor1
            if (data.typeKey === 'freedom' && !location.pathname.includes('/editor1')) {
              // console.log(111111111)
              const newPath = location.pathname.replace('/tfox', '').replace('/editor', '/editor1');
              // dispatch(routerRedux.replace(newPath + location.search));
              history.replace(newPath + location.search);
              return;
            }
            onCreate(data, true);
          } else {
            Modal.error({
              title: '当前 id 不正确',
              okText: '去我的架构图',
              onOk: () => history.replace('/mygraph'),
            });
          }
        },
      })
    }
    // 克隆/从模板 新建
    if (!id && cloneFromId) {
      dispatch({
        type: `${NAMESPACE}/getGraphDetail`,
        path: type,
        payload: { id: cloneFromId },
        callback: (success, { xml, xmlText }) => {
          if (success) {
            newGraph({ xml, id: cloneFromId, xmlText }, type)
          }
        },
      })
    }
  }, [graphInfo.id, dispatch, newGraph])

  const commonProp = {
    showMore: false,
    loading: temploading,
    onClickCard: (gData) => newGraph(gData),
  }
  const tempTabs = [
    {
      value: 'my',
      label: '我的模板',
      prop: {
        ...commonProp,
        dataSource: tempData,
        loadMore: pageIndex => getTemplateList({ pageIndex }),
      },
    },
    {
      value: 'official',
      label: '官方推荐',
      prop: {
        ...commonProp,
        dataSource: openTempData,
        loadMore: pageIndex => getTemplateList({ pageIndex }, true),
      },
    },
  ]

  return (
    <Modal
      className="template-list"
      title="从模版新建"
      visible={visible}
      onCancel={() => onVisible(false)}
      closable={false}
      footer={false}
      destroyOnClose
      okText="确认"
      cancelText="取消"
      keyboard={false}
      width={750}
    >
      <div className="ttype">
        <RadioGroup
          options={tempTabs}
          optionType="button"
          size="small"
          value={tabKey}
          onChange={(e) => setTabKey(e.target.value)}
        />
      </div>
      <GraphList {...tempTabs.filter(ii => ii.value === tabKey)[0].prop} />
    </Modal>
  )
}

// OperationSource.propTypes = {
//   graphRef: PropTypes.objectOf(PropTypes.any),
//   graphInfo: PropTypes.objectOf(PropTypes.any),
//   visible: PropTypes.bool,
//   onVisible: PropTypes.func,
//   typeKey: PropTypes.string,
//   onCreate: PropTypes.func,
//   submitInstance: PropTypes.func,
// }

