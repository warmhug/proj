/* eslint max-len: 0 */
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Dropdown, Input, Tabs, Tooltip, Button } from 'antd';
import { CaretDownOutlined, CaretRightOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { SketchPicker } from 'react-color';
import IconSearch from '../../../components/IconSearch';
import { NAMESPACE } from '../../../models/editor';
import { NAMESPACE as mNS } from '../../../models/maintain';
import { colorList } from '../utils';
import { EditorContext, mx } from '../common';
import '../common.less';
import './AttrPanel.less';

const { TabPane } = Tabs;
const { mxConstants } = mx;

const ALIGN_STYLE = {
  [mxConstants.ALIGN_LEFT]: 'align-left',
  [mxConstants.ALIGN_CENTER]: 'align-center',
  [mxConstants.ALIGN_RIGHT]: 'align-right',
  [mxConstants.ALIGN_TOP]: 'align-top',
  [mxConstants.ALIGN_MIDDLE]: 'align-middle',
  [mxConstants.ALIGN_BOTTOM]: 'align-bottom',
}

const setSty = (edt, item, val) => {
  const { graph } = edt
  if (item === 'bold' || item === 'italic') {
    edt.execute(item);
  } else if (item === 'rounded' || item === 'shadow') {
    graph.toggleCellStyle(item);
  } else {
    graph.setCellStyles(item, val);
  }
}

const convertStyles = (stys) => {
  const res = { ...stys }
  res.textOpacity = 100;
  switch (res.fontStyle) {
    case 0:
      res.bold = false
      res.italic = false
      break;
    case 1:
      res.bold = true
      res.italic = false
      break;
    case 2:
      res.bold = false
      res.italic = true
      break;
    case 3:
      res.bold = true
      res.italic = true
      break;
    default:
      return res
  }
  return res
}

const clearColor = 'transparent'
// transparent 有问题 https://github.com/casesandberg/react-color/issues/500
// const clearColor = '#00000000'
// const swatches = [clearColor, 'transparent', '#ffffff', '#ff6a00', '#ff0000', '#73777a', '#373d41']
const swatches = [clearColor, '#ffffff', '#ff6a00', '#ff0000', '#73777a', '#373d41']

const initPrdInfo = { officialWebsite: '', introduction: '' }

export default ({ attrs, updateCell }) => {
  const editor = useContext(EditorContext);
  const dispatch = useDispatch()
  const { iconData } = useSelector(state => state[mNS])
  const [valMap, setValMap] = useState(attrs.styles || {});
  const [curAttr, setCurAttr] = useState(null);
  const [colorVisible, setColorVisible] = useState(false);
  const [prdInfo, setPrdInfo] = useState(initPrdInfo);
  const btnRef = useRef(null)
  // console.log('styles', valMap);

  useEffect(() => {
    if (attrs.visible) {
      setValMap(convertStyles(attrs.styles))
      if (attrs._mid) {
        dispatch({
          type: `${NAMESPACE}/getMetadata`,
          payload: { id: attrs._mid },
        }).then((res) => {
          if (res.success) {
            const { officialWebsite, introduction } = res.data
            setPrdInfo({
              officialWebsite,
              introduction,
            })
          }
        })
      }
    } else {
      dispatch({ type: `${mNS}/updateState`, payload: { iconData: {} } });
    }
  }, [attrs, dispatch])

  const onChangeFinal = (val, item) => {
    setValMap({ ...valMap, [item]: val });
    setSty(editor, item, val);
  }
  const onChangeIcon = (val, item) => {
    updateCell({ img: val });
    onChangeFinal(val, item);
  }

  const txtEles = ['strokeWidth', 'fontSize'/* , 'textOpacity' */].map(item => (
    <Input
      className={item}
      onChange={evt => onChangeFinal(evt.target.value, item)}
      value={valMap[item] || (item === 'fontSize' ? 12 : 1)}
      suffix="pt"
      type="number"
      size="small"
      max="100"
      min={item === 'fontSize' ? '8' : '0'}
      step="1"
    />
  ))

  const fontFamily = {
    Arial: 'Arial', SimSun: '宋体', SimHei: '黑体', 'Microsoft YaHei': '微软雅黑',
  }
  const dashed = {
    0: '———', 1: '......',
  }
  const selEle = (data, item) => {
    const opts = Object.keys(data)
    return (
      <>
        <select
          value={valMap[item] || data[opts[0]]}
          onChange={evt => onChangeFinal(evt.target.value, item)}
          className={item}
        >
          {opts.map(ii => <option key={ii} value={ii}>{data[ii]}</option>)}
        </select>
      </>
    )
  }

  const chkEles = ['rounded', 'shadow'].map(item => (
    <input
      type="checkbox"
      checked={valMap[item] || false}
      onChange={evt => onChangeFinal(evt.target.checked, item)}
      className={item}
    />
  ))

  const chkEles1 = ['bold', 'italic'].map(item => (
    <>
      <div
        className={`icon ${item} ${valMap[item] ? 'checked' : ''}`}
        onClick={() => {
          setValMap({ ...valMap, [item]: !valMap[item] });
          setSty(editor, item, !valMap[item]);
        }}
      />
    </>
  ))

  const colorChange = (val) => {
    const hex = (val.hex === clearColor && ['gradientColor', 'fontColor'].includes(curAttr)) ? null : val.hex
    setValMap({ ...valMap, [curAttr]: hex });
    setSty(editor, curAttr, hex)
  }

  const showPicker = (e) => {
    e && e.stopPropagation();
    setColorVisible(true);
  }

  const colorEles = ['fillColor', 'strokeColor', 'gradientColor', 'fontColor'].map(item => (
    <Dropdown
      trigger="click"
      overlay={
        <div ref={btnRef} key={item}>
          {colorVisible ?
            <SketchPicker presetColors={swatches} color={valMap[item]} onChange={colorChange} />
            :
            (
              <div className="color-box">
                {colorList.map((val, idx) => (
                  <div key={idx.toString()}>
                    <div className="color-box-label">{val.label}</div>
                    <div>
                      {val.colors.map((v) => (
                        <div
                          key={v}
                          className={`color-box-item ${valMap[item] === v ? 'sel' : ''}`}
                          style={{ backgroundColor: v }}
                          onClick={() => colorChange({ hex: v })}
                        />
                      ))}
                    </div>
                  </div>
                ))}
                <div className="more-opt">
                  <Button type="text" size="small" onClick={showPicker}>更多颜色</Button>
                  <Button type="text" size="small" onClick={() => colorChange({ hex: clearColor })}>清除</Button>
                </div>
              </div>
            )
        }
        </div>
      }
      placement="bottomRight"
      align={'tr bc'}
      offset={[13, 5]}
    >
      <div
        className="color"
        style={{ backgroundColor: valMap[item] }}
        onClick={() => setCurAttr(item)}
      />
    </Dropdown>
  ))

  /* eslint no-confusing-arrow: 0 */
  const showIcon = () => attrs.visible ?
    <CaretDownOutlined className="icon-right" /> :
    <CaretRightOutlined className="icon-right" />;
  const visibleIt = ele => attrs.visible ? ele : null;

  const main = (
    <div className="attr-container">
      {attrs.visible && (
        <div className="mult-tips">按住 Ctrl (Windows) 或 Common (macOS) 点击节点、可以多选，批量设置属性</div>
      )}
      {attrs.backColor && (
        <div className="attr-section">
          <div className="attr-top">颜色编辑{showIcon()}</div>
          {visibleIt(
            <>
              <div className="attr-item">背景色{colorEles[0]}</div>
              <div className="attr-item">渐变色{colorEles[2]}</div>
            </>
          )}
        </div>
      )}
      <div className="attr-section">
        <div className="attr-top">边框样式{showIcon()}</div>
        {visibleIt(
          <>
            <div className="attr-item">
              {selEle(dashed, 'dashed')}{txtEles[0]}
            </div>
            <div className="attr-item">
              <div className="item-inline">边框颜色{colorEles[1]}</div>
              <div className="item-inline">圆角{chkEles[0]}</div>
              <div className="item-inline">阴影{chkEles[1]}</div>
            </div>
          </>
        )}
      </div>
      <div className="attr-section">
        <div className="attr-top">文字编辑{showIcon()}</div>
        {visibleIt(
          <>
            <div className="attr-item">{selEle(fontFamily, 'fontFamily')}</div>
            <div className="attr-item">
              {chkEles1[0]}{chkEles1[1]}{txtEles[1]}{colorEles[3]}
            </div>
          </>
        )}
      </div>
      {attrs.cellCount > 1 ? (
        <div className="attr-section align-functions">
          <div className="attr-top">对齐{showIcon()}</div>
          <div className="attr-body">
            {
              [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_RIGHT,
                mxConstants.ALIGN_TOP, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_BOTTOM].map(alignType => {
                return <div key={alignType} className={`icon-sprite icon-sprite-${ALIGN_STYLE[alignType]} align`} onClick={() => { editor.graph.alignCells(alignType); }} />
              })
            }
          </div>
        </div>
      ) : null}
      {attrs.setImage ? (
        <div className="attr-section">
          <div className="attr-top">
            图标地址
            {attrs.visible &&
              <Tooltip title="请填写阿里系内图片域名地址比如 img.alicdn.com 能确保正确导出图片">
                <InfoCircleOutlined className="info" />
              </Tooltip>}
            {showIcon()}
          </div>
          {visibleIt(
            <div className="attr-item">
              <IconSearch iconData={iconData} onSel={(v) => onChangeIcon(v.url, 'image')}>
                <Input
                  allowClear
                  placeholder="搜索产品图标或直接填入地址"
                  size="small"
                  value={valMap.image || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    dispatch({
                      type: `${mNS}/getIconList`,
                      payload: { pageIndex: 1, pageSize: 10, name: val },
                    });
                    onChangeIcon(val, 'image')
                  }}
                />
              </IconSearch>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )

  const prdContent = (
    <div className="attr-container">
      <div className="attr-section">
        <div className="attr-top">产品地址</div>
        <div className="attr-item">
          <a href={prdInfo.officialWebsite} target="_blank" rel="noreferrer">
            {prdInfo.officialWebsite}
          </a>
        </div>
      </div>
      <div className="attr-section">
        <div className="attr-top">产品信息</div>
        <div className="attr-item">{prdInfo.introduction}</div>
      </div>
    </div>
  )

  return (
    <div className="attr-panel" onClick={() => setColorVisible(false)}>
      {/* <Tab shape="wrapped" size="small">
        <Tab.Item title="编辑">{main}</Tab.Item>
        <Tab.Item title="产品信息">{prdContent}</Tab.Item>
        <Tab.Item title="数据分析">数据分析</Tab.Item>
      </Tab> */}

      <Tabs size="small" >
        <TabPane tab="编辑" key="1">{main}</TabPane>
        <TabPane tab="产品信息" key="2">{prdContent}</TabPane>
        <TabPane tab="数据分析" key="3">数据分析</TabPane>
      </Tabs>
    </div>
  )
}
