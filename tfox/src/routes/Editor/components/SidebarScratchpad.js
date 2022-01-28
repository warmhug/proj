/* eslint no-console: 0, max-len: 0, react/no-danger: 0, new-cap: 0 */
import React, { useRef, useEffect, useState, useMemo, forwardRef, useImperativeHandle } from 'react';
import { useSelector } from 'umi';
import lzString from 'lz-string';
// import { NAMESPACE } from '../../../models/editor';
import { NAMESPACE as appNS } from '../../../models/app';
import { isParseError } from '../utils';
import { createEditor, mx, getSelectionCellsInOriginTranslate, importCellsOnAvailable } from '../common';

const THUMB_WIDTH = 42;
const THUMB_HEIGHT = 42;
const { mxConstants, mxClient, mxUtils, mxCodec } = mx;

const createThumb = (graph, cells, width, height) => {
  const fo = mxClient.NO_FO;
  graph.view.scaleAndTranslate(1, 0, 0);
  graph.addCells(cells);
  const bounds = graph.getGraphBounds();
  const s = Math.floor(Math.min(width / bounds.width, height / bounds.height) * 100) / 100;
  graph.view.scaleAndTranslate(s, Math.floor((width - bounds.width * s) / 2 / s - bounds.x),
    Math.floor((height - bounds.height * s) / 2 / s - bounds.y));
  let node = null;
  if (graph.dialect === mxConstants.DIALECT_SVG && !mxClient.NO_FO && graph.view.getCanvas().ownerSVGElement != null) {
    node = graph.view.getCanvas().ownerSVGElement.cloneNode(true);
  } else {
    node = graph.container.cloneNode(false);
    node.innerHTML = graph.container.innerHTML;
    // Workaround for clipping in older IE versions
    if (mxClient.IS_QUIRKS || document.documentMode === 8) {
      node.firstChild.style.overflow = 'visible';
    }
  }
  const enc = new mxCodec();
  const encodeNode = enc.encode(graph.getModel());
  const xml = mxUtils.getXml(encodeNode);
  graph.getModel().clear();
  mxClient.NO_FO = fo;
  return { xml, html: node.outerHTML, cacheId: +new Date() };
}

const paintByXml = (graph, xml) => {
  const doc = mxUtils.parseXml(xml);
  if (isParseError(doc)) {
    return false
  }
  try {
    const codec = new mxCodec(doc);
    codec.decode(doc.documentElement, graph.getModel());
  } catch (e) {
    console.log(e);
  }
  const cells = graph.getModel().getChildren(graph.getDefaultParent());
  graph.getModel().clear();
  return cells;
}
export default forwardRef(({ editor }, ref) => {
  // const { graphInfo } = useSelector((state) => state[NAMESPACE]);
  const { dayuInfo: { accountId } } = useSelector((state) => state[appNS]);
  const graphContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [tmplList, setTmplList] = useState([]);

  const list = useMemo(() => {
    const str = localStorage.getItem(`scratchpad-${accountId}`);
    return str ? JSON.parse(str) : [];
  }, [accountId]);

  useEffect(() => {
    editorRef.current = createEditor(graphContainerRef.current, true);
  }, []);

  useEffect(() => {
    setTmplList(list.map(item => ({
      cacheId: item.id,
      xml: lzString.decompress(item.cx),
      html: lzString.decompress(item.ch),
    })));
  }, [list]);

  useEffect(() => {
    const l = tmplList.map(item => ({
      id: item.cacheId,
      cx: lzString.compress(item.xml),
      ch: lzString.compress(item.html),
    }));
    localStorage.setItem(`scratchpad-${accountId}`, JSON.stringify(l));
  }, [tmplList])

  // const handleAdd = () => {}
  useImperativeHandle(ref, () => ({
    handleAdd() {
      if (editor) {
        const { cells } = getSelectionCellsInOriginTranslate(editor.graph);
        const tmpl = createThumb(editorRef.current.graph, cells, THUMB_WIDTH, THUMB_HEIGHT);
        setTmplList(arr => arr.concat([tmpl]));
      }
    },
  }))

  const del = tmpl => {
    setTmplList(arr => arr.filter(item => item.cacheId !== tmpl.cacheId));
  }

  const handleTemplateClick = tmpl => {
    if (editor) {
      importCellsOnAvailable(editor.graph, paintByXml(editorRef.current.graph, tmpl.xml));
    }
  }

  return (
    <div className="sidebar-scratchpad" >
      <div ref={graphContainerRef} className="sidebar-scratchpad-graph" tabIndex="1" />
      <div className="sidebar-scratchpad-list">
        {tmplList.map(tmpl => (
          <div key={tmpl.cacheId} className="sidebar-scratchpad-item">
            <div
              className="ss-svg"
              key={tmpl.cacheId}
              dangerouslySetInnerHTML={{ __html: tmpl.html }}
              onClick={() => handleTemplateClick(tmpl)}
            />
            <div className="ss-del" onClick={() => del(tmpl)}>-</div>
            <div className="ss-plus" onClick={() => handleTemplateClick(tmpl)}>+</div>
          </div>
        ))}
      </div>
    </div>
  )
})

// Scratchpad.propTypes = {
//   editor: PropTypes.objectOf(PropTypes.any),
// }

