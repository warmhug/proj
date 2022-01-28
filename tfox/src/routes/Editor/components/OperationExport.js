/* eslint max-len: 0 */
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'umi';
import { Button, Modal, Input, Radio, message } from 'antd';
import { saveSvgAsPng } from 'save-svg-as-png';
import { NAMESPACE } from '../../../models/editor';
import { EditorContext, getSvgInfo, getIframeDoc } from '../common';

const { Group: RadioGroup } = Radio;

export default (props) => {
  const editor = useContext(EditorContext);
  const dispatch = useDispatch();

  const { graphInfo: { id, name }, onExport: onExportOk, typeKey } = props;

  const [exportVisible, setExportVisible] = useState(false);
  const [exportValue, setExportValue] = useState('ppt');
  const [exportName, setExportName] = useState(name || '');

  useEffect(() => {
    setExportName(name);
  }, [name])

  const onExport = () => {
    onExportOk((succ) => {
      if (!succ) {
        message.error('当前图形未提交成功');
        return;
      }
      if (exportValue === 'png') {
        const { svgNode, wh } = getSvgInfo(editor.graph, getIframeDoc());
        saveSvgAsPng(svgNode, `${exportName}.png`, { width: wh.width + 10, height: wh.height + 10 });
      } else if (exportValue === 'ppt') {
        // 加 token 时不能直接 window.open
        dispatch({
          type: `${NAMESPACE}/downloadWithToken`,
          payload: { instanceId: id, name: exportName, _ext: '.pptx' },
        })
      }
      setExportVisible(false);
    });
  };

  return (
    <>
      <Button className="bt80" size="small" type="primary" onClick={() => setExportVisible(true)}>导出</Button>
      <Modal
        title="请选择导出格式"
        visible={exportVisible}
        onOk={onExport}
        onCancel={() => setExportVisible(false)}
        destroyOnClose
        okText="确认"
        cancelText="取消"
        keyboard={false}
        closable={false}
        width={450}
      >
        <div className="export-method">
          <div>
            文件名称：
            <Input
              name="name"
              placeholder="请输入"
              value={exportName}
              onChange={(e) => setExportName(e.target.value)}
              className="file-name"
            />
          </div>
          <div>
            格式选择：
            <RadioGroup
              value={exportValue}
              onChange={(e) => setExportValue(e.target.value)}
              options={typeKey === 'freedom' ? [{ value: 'png', label: 'png' }] : [
                { value: 'ppt', label: 'ppt' },
                { value: 'png', label: 'png' },
              ]}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

// OperationExport.propTypes = {
//   graphInfo: PropTypes.objectOf(PropTypes.any),
//   typeKey: PropTypes.string,
//   onExport: PropTypes.func,
// }

