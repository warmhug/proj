import React, { useState, useEffect, useContext } from 'react';
import { Modal, Input } from 'antd';
import { EditorContext, getSource, insertXmlToGraph } from '../common';

export default (props) => {
  const editor = useContext(EditorContext);
  const { visible, onVisible } = props;
  const [sourceVal, setSourceVal] = useState('');
  // visible 状态统一由 外部 控制，尝试 双向绑定
  // const [sourceVisible, setSourceVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      getSource(editor, (xml) => setSourceVal(xml));
    }
  }, [visible, editor]);

  const sourceChange = () => {
    /* eslint no-alert: 0 */
    if (window.confirm('源代码可能有变化，是否更新全图')) {
      insertXmlToGraph(sourceVal, editor.graph.getModel());
      onVisible(false);
    }
  };

  return (
    <Modal
      className="sources"
      title="源码"
      visible={visible}
      onOk={() => sourceChange()}
      onCancel={() => onVisible(false)}
      destroyOnClose
      okText="确认"
      cancelText="取消"
      keyboard={false}
      closable={false}
      width={800}
    >
      <Input.TextArea
        className="sourcetxt"
        value={sourceVal}
        onChange={(e) => setSourceVal(e.target.value)}
      />
    </Modal>
  )
}

// OperationSource.propTypes = {
//   visible: PropTypes.bool,
//   onVisible: PropTypes.func,
// }

