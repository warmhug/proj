/* eslint max-len: 0 */
import React, { useCallback, useEffect, useReducer, useRef, useState, useContext } from 'react';
import { Button, Dropdown, Menu, message, Modal } from 'antd';
import { DownOutlined, HistoryOutlined } from '@ant-design/icons';
import { useDispatch, useHistory, Link } from 'umi';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  EditorContext, getQs, strQs, getCurrentXml, getImg, getXmlText, insertXmlToGraph, onSysAction, onSave,
} from '../common';
import OperationRelease from './OperationRelease';
import OperationSource from './OperationSource';
import OperationHelp from './OperationHelp';
import OperationCreate from './OperationCreate';
import OperationSetTemp from './OperationSetTemp';
import OperationExport from './OperationExport';
import OperationTitle from './OperationTitle';
import OperationToolbar from './OperationToolbar';
import Icon from '../../../components/Icon';
import { NAMESPACE } from '../../../models/editor';
import useOneWindow, { Events as OneWindowEvents } from '../useOneWindow';
import './Operation.less';
import '../common.less';

const getTime = () => moment(Date.now()).format('hh:mm:ss');

const adapteResolution = (xmlText, graphRef) => {
  // 正则匹配 <root width="829" height="499"> 这段字符，构造自 common.js 里的 getXmlText 函数
  if (!xmlText) {
    return true
  }
  const mArr = xmlText.match(/<root width="(\d+)"/)
  if (!mArr || mArr.length !== 2 || !mArr[1]) {
    return false
  }
  // 判断 当前图记录的 width 与当前分辨率下 width 的差
  if (Math.abs(graphRef.current.offsetWidth - mArr[1]) > 10) {
    return true
  }
}

const defaultRL = () => {};
const initVisible = {};
const initGraphInfo = { name: '未命名' };
const gReducer = (state, action) => {
  const newSt = { ...state, ...action };
  if (action.__reset) {
    return { ...initGraphInfo };
  }
  // 处理 name 为 null 的情况
  if (!newSt.name) {
    newSt.name = '未命名';
  }
  return newSt;
};

const getWindowId = (_id) => _id || getQs().id || '_id';

export default ({ oData, graphRef, resetLayout = defaultRL, typeKey = 'fast' }) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { newXml, scaleNum } = oData;

  const [graphInfo, setGraphInfo] = useReducer(gReducer, initGraphInfo);
  const [visible, setVisible] = useReducer((state, action) => ({ ...state, ...action }), initVisible);
  const { send } = useOneWindow({ key: getWindowId(graphInfo.id) });

  const [saveState, setSaveState] = useState('未保存');
  const submitFnRef = useRef();
  const nameRef = useRef(null);
  nameRef.current = graphInfo.name;
  const editorRef = useRef(null);
  editorRef.current = useContext(EditorContext);

  useEffect(() => {
    const sendInfo = () => {
      send(OneWindowEvents.changed, { id: getWindowId(graphInfo.id) })
    }
    window.addEventListener('click', sendInfo);
    return () => {
      window.removeEventListener('click', sendInfo);
    }
  }, [])

  useEffect(() => {
    // console.log('cccc', editorRef.current, submitFnRef.current);
    if (editorRef.current && submitFnRef.current) {
      onSave(editorRef.current, submitFnRef.current);
    }
  }, [editorRef.current, submitFnRef.current])

  useEffect(() => {
    setGraphInfo({ xml: newXml });
  }, [newXml])

  const onCreate = useCallback((data, isEdit) => {
    insertXmlToGraph(data.xml, editorRef.current.graph.getModel());
    // 根据分辨率适配布局
    typeKey === 'fast' && adapteResolution(data.xmlText, graphRef) && resetLayout();
    if (!isEdit) {
      setSaveState(`${getTime()} 新建成功`)
    }
    setGraphInfo(data);
    // 保存一份到 store 里，供其他组件使用（实时修改未保存）
    dispatch({
      type: `${NAMESPACE}/updateState`, payload: { graphInfo: data },
    });
  }, [typeKey, graphRef, resetLayout])

  const submitInstance = useCallback((callback = () => { }, noMsg) => {
    // console.log('gggg', graphInfo.id);
    if (graphInfo.id) {
      getImg(editorRef.current.graph, graphRef, (fileString) => {
        return dispatch({
          type: `${NAMESPACE}/submitInstance`,
          payload: {
            id: graphInfo.id,
            xml: getCurrentXml(editorRef.current),
            name: nameRef.current,
            xmlText: getXmlText(editorRef.current.graph, nameRef.current),
            fileString,
          },
          callback: (res) => {
            const { success, message: msg } = res;
            setSaveState(`${getTime()} 保存 ${success ? '成功' : '失败'}`);
            if (success) {
              !noMsg && message.success('已成功保存');
            } else {
              message.error(msg);
            }
            callback(success);
          },
        });
      });
    } else {
      (typeof callback === 'function') && callback(true);
    }
  }, [graphInfo.id, nameRef, graphRef, dispatch]);

  // 离开页面前，做保存
  submitFnRef.current = submitInstance
  useEffect(() => {
    window.addEventListener('beforeunload', submitFnRef.current);
    // window.onbeforeunload = () => '确认关闭页面吗？';
    return () => {
      setGraphInfo({ __reset: true });
      submitFnRef.current(() => {
        dispatch({ type: `${NAMESPACE}/reset` });
      }, true);
      window.removeEventListener('beforeunload', submitFnRef.current);
    };
  }, [dispatch, submitFnRef])

  useEffect(() => {
    // location.search = `?${qs.stringify(qsObj)}` // 不停刷新
    // path 可能为 editor 或 editor1
    if (graphInfo.id) {
      const path = location.pathname.split('/').filter((item) => item);
      const qsObj = getQs() || {};
      delete qsObj.cloneFromId;
      delete qsObj.type;
      const newUrl = `/${path[path.length - 1]}?${strQs({ ...qsObj, id: graphInfo.id })}`;
      // dispatch(history.replace(newUrl));
      history.replace(newUrl);
      setVisible({ build: false });
    }
  }, [graphInfo.id, dispatch]);

  useEffect(() => {
    if (graphInfo.xml && graphInfo.id) {
      // 注意 newXml 在 新建图形 时先为旧值，随后因为 onGraphChange 触发变为新值
      // console.log('changed graph', graphInfo.xml, graphInfo.id);
      getImg(editorRef.current.graph, graphRef, fileString => dispatch({
        type: `${NAMESPACE}/updateInstance`,
        payload: { id: graphInfo.id, xml: graphInfo.xml, fileString },
        callback: (success) => {
          setSaveState(`${getTime()} 编辑 ${success ? '成功' : '失败'}`)
        },
      }));
      // 如果图形有内容、才关联项目，避免在项目里有空白图形
      const { dayuProjId } = getQs();
      graphInfo.xml !== editorRef.current._cleanXml && dayuProjId && dispatch({
        type: `${NAMESPACE}/instanceRelate`,
        payload: { instanceId: graphInfo.id, projectRelateDTOs: [{ projectId: dayuProjId }] },
        callback: () => { },
      });
    }
  }, [graphInfo.xml, graphInfo.id, graphRef, dispatch])

  useEffect(() => {
    const { id, cloneFromId } = getQs()
    if (id === undefined && !cloneFromId && !visible.build) {
      // 新建图形弹窗
      setVisible({ build: true });
    }
  }, [visible]);

  const menus = [
    { title: '新建', type: 'build' },
    { title: '设置模版', type: 'temp' },
    { title: '源码', type: 'source' },
  ]
  const menuF = (
    <Menu>
      {menus.map(mu => (
        <Menu.Item
          key={mu.type}
          onClick={() => setVisible({ [mu.type]: true })}
        >
          {mu.title}
        </Menu.Item>
      ))}
    </Menu>
  );

  const share = () => {
    const newPath = location.pathname.replace(/(editor|editor1)$/g, 'preview');
    const qsObj = getQs() || {};
    const viewLink = `${location.origin}${newPath}?${strQs({ ...qsObj, type: 'instance' })}`;
    Modal.info({
      title: '分享链接',
      okText: '好了',
      content: (
        <>
          <a href={viewLink} target="_blank" rel="noreferrer">{viewLink}</a> &nbsp;
          <CopyToClipboard text={viewLink} onCopy={() => message.success('链接复制成功')}>
            <Button type="primary" size="small">复制链接</Button>
          </CopyToClipboard>
        </>
      ),
    })
  }

  return (
    <div className="navigation">
      <div className="header">
        <div className="top">
          <div className="tleft">
            <OperationTitle
              graphInfo={graphInfo}
              onChange={name => setGraphInfo({ name })}
            />
          </div>
          <div className="tright">
            <Link to="/graph">架构图范例库</Link>
            <Link to="/mygraph">我的架构图</Link>
          </div>
        </div>
        <div className="menu">
          <div className="left">
            <Dropdown overlay={menuF} placement="bottomCenter">
              <div className="ant-dropdown-div">文件<DownOutlined /></div>
            </Dropdown>
            {/* <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>撤回</Menu.Item>
                  <Menu.Item>重做</Menu.Item>
                </Menu>
              }
              placement="bottomCenter"
            >
              <div className="ant-dropdown-div">编辑<DownOutlined /></div>
            </Dropdown> */}
            <Dropdown overlay={OperationHelp(typeKey)} placement="bottomCenter">
              <div className="ant-dropdown-div">帮助<DownOutlined /></div>
            </Dropdown>
            <div className="save-state">{saveState}</div>
            {/* <div id="logopt" className="logopt" /> */}
          </div>
          <div className="right">
            <Button className="button" type="text" size="small" onClick={() => share()}>
              <Icon className="icon" type="icon_fenxiang" size="xs" /> 分享
            </Button>
            <Button className="button" type="text" size="small" onClick={() => onSysAction(editorRef.current, 'show', newXml)}>
              <Icon className="icon" type="yulan" size="small" /> 预览
            </Button>
            <Button className="button bt80" size="small" onClick={() => submitInstance()}>
              <Icon className="icon" type="baocun" size="small" /> 保存
            </Button>
            <OperationRelease graphInfo={graphInfo} submitInstance={submitInstance} />
            <OperationExport graphInfo={graphInfo} typeKey={typeKey} onExport={submitInstance} />
          </div>
        </div>
        <OperationCreate
          visible={visible.build}
          onVisible={(vi) => setVisible({ build: vi })}
          graphInfo={graphInfo}
          graphRef={graphRef}
          typeKey={typeKey}
          onCreate={onCreate}
          submitInstance={submitInstance}
        />
        <OperationSetTemp
          visible={visible.temp}
          onVisible={(vi) => setVisible({ temp: vi })}
          graphInfo={graphInfo}
          graphRef={graphRef}
          typeKey={typeKey}
        />
        <OperationSource
          visible={visible.source}
          onVisible={(vi) => setVisible({ source: vi })}
        />
      </div>
      <div className="toolbar">
        <OperationToolbar prop={{ typeKey, scaleNum, resetLayout }} />
        <div
          className="toolbar-history"
          onClick={() => Modal.info({
            title: '历史版本建设中',
            content: '现在可联系开发者 然则/萤月、帮助恢复历史保存记录',
          })}
        >
          <HistoryOutlined />
        </div>
      </div>
    </div>
  );
};

// Operation.propTypes = {
//   oData: PropTypes.objectOf(PropTypes.any),
//   graphRef: PropTypes.objectOf(PropTypes.any),
//   typeKey: PropTypes.string,
//   resetLayout: PropTypes.func,
// };

