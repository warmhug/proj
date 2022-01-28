/* eslint new-cap: 0, max-len: 0 */
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Spin, message as Message } from 'antd';
import AttrPanel from './components/AttrPanel';
import CellDataSearch from './components/CellDataSearch';
import Operation from './components/Operation';
import Sidebar from './components/Sidebar';
import AddRowCol from './components/AddRowCol';
import { EditorContext } from './common';
import { onInit, updateCell, resetLayout, addVertexFn } from './core';
import { initOper, initCellAttr, initAttr, initCols } from './utils';
import './assets/index.less';

export default () => {
  const [oData, onGraphChange] = useState(initOper)
  const [cellAttr, setCellAttr] = useState(initCellAttr)
  const [attrs, setAttrs] = useState(initAttr)
  const [cellTxt, setCellTxt] = useState('')
  const [colsAttr, setColsAttr] = useState(initCols)
  const [loading, setLoading] = useState(false)

  const [editor, setEditor] = useState(null);
  const graphRef = useRef(null);

  const resetLayoutFn = useCallback((v) => {
    setLoading(true)
    setTimeout(() => {
      resetLayout(v, (res) => {
        setLoading(res)
      })
    }, 0)
  }, [])

  useEffect(() => {
    const stateMap = { setCellAttr, setAttrs, onGraphChange, setColsAttr, setLoading, setCellTxt }
    setEditor(onInit(graphRef.current, ({ fn, res }) => stateMap[fn](res)))
  }, [])

  const handleAddVertex = (val, data) => {
    addVertexFn(val, data, undefined, false, (res, message) => {
      if (message) {
        Message.error('已超过当前设置列数');
      } else {
        setAttrs(res);
      }
    });
  }

  return (
    <EditorContext.Provider value={editor}>
      <div className="wrapper">
        <Operation oData={oData} graphRef={graphRef} resetLayout={resetLayoutFn} />
        <div className="editor">
          <Sidebar onAddVertex={handleAddVertex} />
          <div className="editor-main">
            <div className="graph-wrap">
              <div className="graph-tour" />
              <Spin tip="为适应分辨率修正布局中(可能较慢)..." spinning={loading}>
                <div ref={graphRef} className="graph" tabIndex="-1" />
              </Spin>
            </div>
            <AddRowCol colsAttr={colsAttr} setAttrs={setAttrs} />
            <CellDataSearch
              cellAttr={cellAttr}
              cellTxt={cellTxt}
              updateCell={(cellData) => updateCell(cellData, () => {
                setCellAttr(initCellAttr)
              })}
            />
            <AttrPanel
              attrs={attrs}
              updateCell={(attr) => updateCell(attr, () => {
                setCellAttr(initCellAttr)
              })}
              // colsAttr={colsAttr}
            />
          </div>
        </div>
      </div>
    </EditorContext.Provider>
  )
}

