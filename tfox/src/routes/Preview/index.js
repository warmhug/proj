import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, Link } from 'umi';
import { message, Spin, Button } from 'antd';
import moment from 'moment'
import { createEditor, getQs, insertXmlToGraph } from '../Editor/common.js'
import { NAMESPACE } from '../../models/editor'
import { hideNav } from '../../utils'
import './index.less';


export default () => {
  const dispatch = useDispatch();
  const graphRef = useRef(null)
  const editorRef = useRef(null);
  const [gDetail, setGDetail] = useState({})
  const [projInfo, setProjInfo] = useState({})

  const loadings = useSelector((state) => state.loading.effects);

  const graphDetailLoading = loadings[`${NAMESPACE}/getGraphDetail`];
  const { name, modifierName, gmtModified, description, totalPv } = gDetail
  const { businessProjectName, projectName } = projInfo

  useEffect(() => {
    editorRef.current = createEditor(graphRef.current)
    editorRef.current.graph.setCellsMovable(false)
    editorRef.current.graph.setCellsResizable(false)
    editorRef.current.graph.setCellsDeletable(false)
    editorRef.current.graph.setCellsEditable(false)
  }, [])

  useEffect(() => {
    // TODO tempId, instanceId 是为了兼容老版本
    /* eslint prefer-const: 0 */
    let { id, type, tempId, instanceId } = getQs()
    id = id || tempId || instanceId;
    type = type || (tempId ? 'template' : (instanceId && 'instance'));

    dispatch({
      type: `${NAMESPACE}/getGraphDetail`,
      payload: { id },
      path: type,
      callback: (success, data) => {
        if (!success) {
          message.error('当前 id 不正确')
        } else {
          setGDetail(data);
          insertXmlToGraph(data.xml, editorRef.current.graph.getModel())
        }
      },
    });

    dispatch({
      type: `${NAMESPACE}/getByInstanceId`,
      payload: { instanceId: id },
      callback: (success, res) => {
        if (success && res && res.length) {
          setProjInfo(res[0]);
        }
      },
    });
  }, [dispatch])

  useEffect(() => {
    return () => dispatch({ type: `${NAMESPACE}/reset` })
  }, [dispatch])

  const fitView = () => {
    // 宽度超出视图时、缩小 svg
    const svgNode = graphRef.current.querySelector('svg')
    const { offsetWidth, offsetHeight } = graphRef.current;
    const widthV = offsetWidth - 10 || 860;
    const heightV = offsetHeight || 760;
    const svgW = parseInt(svgNode.style['min-width'], 10)
    const svgH = parseInt(svgNode.style['min-height'], 10)
    if (svgW > widthV) {
      const widthScale = widthV / svgW
      const heightScale = heightV / svgH
      const tx = svgW * (widthScale - 1) / 2
      const ty = svgH * (heightScale - 1) / 2
      // console.log('ssss', svgW, widthV, ty);
      svgNode.setAttribute(
        'transform',
        `translate(${tx}, ${ty}) scale(${widthScale}, ${heightScale})`
      );
    } else {
      message.info('图形宽度未超出屏幕宽度')
    }
    // svgNode.setAttribute('viewBox', `0 0 ${widthV} ${heightV}`);
  }

  return (
    <div className="preview-wrap">
      {hideNav ? (
        <div className="pnav">
          <Link to="/graph">架构图范例库</Link>
          <Link to="/mygraph">我的架构图</Link>
        </div>
      ) : null}
      <div className="toolbar">
        <Button
          size="small"
          onClick={() => fitView()}
          style={{ display: 'none' }}
        >
          适应屏幕
        </Button>
        <span>创建人: {modifierName}</span>
        <span>修改时间: {moment(gmtModified).format('YYYY-MM-DD_HH:mm')}</span>
        {totalPv > 0 && <span>浏览量: {totalPv}</span>}
        {(businessProjectName || projectName) &&
          <span>项目信息: {businessProjectName ? `${businessProjectName}-` : ''}{projectName}</span>}
      </div>
      <div className="gname">{name}</div>
      <Spin tip="图形下载中" spinning={graphDetailLoading}>
        <div ref={graphRef} className="graph" />
      </Spin>
      {description && <div className="desc">描述：{description}</div>}
    </div>
  )
}

