import React, { useState, useContext } from 'react';
import { Button, Tag } from 'antd';
import Icon from '../../../components/Icon';
import ProScale from './ProScale';
import ProConnect from './ProConnect';
import ProLayouts from './ProLayouts';
import { EditorContext, onSysAction, EDGE_STYLE } from '../common';

export default ({ prop }) => {
  const { typeKey, scaleNum, resetLayout = () => { } } = prop;
  const editor = useContext(EditorContext);
  const [layoutWarn, setLayoutWarn] = useState(true);

  const resetLay = () => {
    resetLayout();
    setLayoutWarn(false);
  }

  const baseTools = (
    <>
      <Button type="text" size="small" onClick={() => resetLay()}>
        <Icon className="icon" type="fanggepailie" size="xs" /> 修正布局
      </Button>
      {layoutWarn && <Tag closable>如果图形显示错乱、点“修正布局”可恢复</Tag>}
    </>
  )

  const freeTools = (
    <>
      {['toFront', 'toBack'].map((item) => (
        <Button key={item} type="text" size="small" onClick={() => onSysAction(editor, item)}>
          <i className={`icon-sprite icon-sprite-${item.toLocaleLowerCase()}`} />
        </Button>
      ))}
      <ProLayouts />
      <ProConnect setConnStyle={idx => { editor.defaultEdge.style = EDGE_STYLE[idx] }} />
    </>
  )

  const tit = typeKey === 'fast' ? '撤回可能导致布局混乱、点右边“修正布局”按钮可恢复' : undefined;

  return (
    <div className="toolbar-tools">
      {typeKey === 'freedom' ? <ProScale scaleNum={scaleNum} /> : null}
      <Button type="text" size="small" onClick={() => onSysAction(editor, 'undo')} title={tit}>
        <Icon className="icon" type="huitui" size="xs" /> 撤回
      </Button>
      <Button type="text" size="small" onClick={() => onSysAction(editor, 'redo')}>
        <Icon className="icon" type="chongzuo" size="xs" /> 重做
      </Button>
      <Button type="text" size="small" onClick={() => onSysAction(editor, 'delete')}>
        <i className="icon-sprite icon-sprite-delete" />
      </Button>
      {typeKey === 'freedom' ? freeTools : baseTools}
    </div>
  )
}

// OperationToolbar.propTypes = {
//   prop: PropTypes.objectOf(PropTypes.any),
// }

