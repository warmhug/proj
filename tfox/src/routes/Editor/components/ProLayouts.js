import React, { useState, useEffect, useRef, useContext } from 'react';
import { Menu, Dropdown, Button, Modal } from 'antd';
import { EditorContext, createEditor, importCellsOnAvailable } from '../common';
import { layoutTypes, overlayFn, exportLayoutCells } from '../utils-layout'
import './ProLayouts.less';

export default () => {
  const editor = useContext(EditorContext);
  const [layoutType, setLayoutType] = useState('horizontalTree');
  const [showFlowEditor, setShowFlowEditor] = useState(false);
  const layoutEditorGraphRef = useRef(null);
  const layoutEditor = useRef(null);
  // console.log('xxx', editor);

  useEffect(() => {
    if (showFlowEditor) {
      layoutEditor.current = createEditor(layoutEditorGraphRef.current, true);
      overlayFn(layoutEditor.current.graph, layoutType);
      // react 不会触发 keydown 事件，需要设置 focus 或 tabIndex="1"
      layoutEditorGraphRef.current.focus();
    }
    return () => {
      layoutEditor.current && layoutEditor.current.graph.destroy();
    }
  }, [layoutType, showFlowEditor]);

  const onSelectFlowEditor = type => {
    setLayoutType(type);
    setShowFlowEditor(true);
  }

  const handleLayoutModalConfirm = () => {
    if (editor) {
      importCellsOnAvailable(editor.graph, exportLayoutCells(layoutEditor.current.graph));
      setShowFlowEditor(false);
    }
  }

  const layouts = Object.entries(layoutTypes).map(([key, { name }]) => (
    <Menu.Item key={key} onClick={() => onSelectFlowEditor(key)}>
      {name}
    </Menu.Item>
  ))

  return (
    <>
      <Dropdown
        trigger="click"
        // overlay={<Menu><Menu.SubMenu title="布局">{layouts}</Menu.SubMenu></Menu>}
        overlay={<Menu title="布局">{layouts}</Menu>}
      >
        <Button type="text" size="small" ><i className="icon-sprite icon-sprite-add" /></Button>
      </Dropdown>
      <Modal
        cancelText="取消"
        okText="插入"
        visible={showFlowEditor}
        onCancel={() => setShowFlowEditor(false)}
        onOk={handleLayoutModalConfirm}
        width={720}
      >
        <div className="layout-editor-graph-container">
          <div ref={layoutEditorGraphRef} className="layout-editor-graph" tabIndex="1" />
        </div>
      </Modal>
    </>
  )
}

