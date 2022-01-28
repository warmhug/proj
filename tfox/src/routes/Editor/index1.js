/* eslint new-cap: 0, max-len: 0 */
import React, { useEffect, useState, useRef } from 'react';

import AttrPanel from './components/AttrPanel';
import CellDataSearch from './components/CellDataSearch';
import Operation from './components/Operation';
import Sidebar from './components/Sidebar';

import { EditorContext } from './common';
import { initOper, initCellAttr, initAttr } from './utils';
import { onInit, addVertexFn, updateCell } from './core2';

import './assets/index.less';
import './index1.less';

export default () => {
  const [oData, onGraphChange] = useState(initOper);
  const [cellAttr, setCellAttr] = useState(initCellAttr);
  const [attrs, setAttrs] = useState(initAttr);
  const [cellTxt, setCellTxt] = useState('');

  const [editor, setEditor] = useState(null);
  const graphRef = useRef(null);

  useEffect(() => {
    const stateMap = { setCellAttr, setAttrs, onGraphChange, setCellTxt };
    setEditor(onInit(graphRef.current, ({ fn, res }) => stateMap[fn](res)))
    return () => {
      // editor.graph.destroy();
    }
  }, []);

  return (
    <EditorContext.Provider value={editor}>
      <div className="wrapper">
        <Operation typeKey="freedom" oData={oData} graphRef={graphRef} />
        <div className="editor">
          <Sidebar typeKey="freedom" onAddVertex={addVertexFn} />
          <div className="editor-main">
            <div className="graph-container">
              <div className="graph-tour" />
              <div ref={graphRef} className="graph" tabIndex="1" />
            </div>
            <CellDataSearch
              cellTxt={cellTxt}
              cellAttr={cellAttr}
              updateCell={(cellData) => updateCell(cellData, () => {
                setAttrs({ visible: attrs.visible, styles: { ...attrs.styles, image: cellData.img } })
                setCellAttr(initCellAttr)
              })}
            />
            <AttrPanel
              attrs={attrs}
              updateCell={(attr) => updateCell(attr, () => {
                setCellAttr(initCellAttr)
              })}
            />
          </div>
        </div>
      </div>
    </EditorContext.Provider>
  )
}

// DesignerEditor.propTypes = {
//   // match: PropTypes.objectOf(PropTypes.any),
// }
