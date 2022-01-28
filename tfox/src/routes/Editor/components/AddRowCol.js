/* eslint max-len: 0 */
import { Button, message, Tooltip } from 'antd';
import React from 'react';
import Icon from '../../../components/Icon';
import { addVertexFn, changePos, getParentSpe, getRemoveSwl } from '../core';
import { rowColOpt } from '../utils';

const getDisable = (cell) => {
  const cellp = cell?.getParent();
  const len = cellp?.children?.length;
  const idx = cellp?.getIndex(cell);
  // console.log('dddd', cellp?.getIndex(cell), idx);
  return (cell && cellp) ? { up: idx === 0, down: idx === len - 1 } : { up: false, down: false };
}

// 获取 pos = 10 的节点
const getSectionCell = (cell) => {
  if (cell && cell._pos === 10) {
    return cell
  }
  let prtCell = cell;
  while (prtCell && prtCell.getParent() && prtCell.getParent()._pos && prtCell.getParent()._pos !== 10) {
    prtCell = prtCell.getParent()
  }
  return prtCell.getParent();
}

export default ({ colsAttr, setAttrs }) => {
  const { colsVisible, cellStates } = colsAttr || {};
  const { x, y, width, cell: rawCell } = cellStates || {};

  const cell = getParentSpe(rawCell);

  if (!cell) {
    return null;
  }
  // console.log('ccc', cell._pos);

  const rawSt = getDisable(cell);
  let upCell = cell;
  let downCell = cell;
  let upDisable = rawSt.up;
  let downDisable = rawSt.down;
  // 如果 disable 则检测 cell 的父区块 cell 的状态、尝试改变父区块位置
  if (upDisable && !getDisable(getSectionCell(upCell)).up) {
    upCell = getSectionCell(upCell);
    upDisable = false;
  }
  if (downDisable && !getDisable(getSectionCell(downCell)).down) {
    downCell = getSectionCell(downCell);
    downDisable = false;
  }

  const addNode = (rc, compName) => {
    const { children } = cell;
    if (children && children.length >= cell._col && rc === 'col') {
      message.error('已超过当前设置列数');
      return;
    }
    addVertexFn(compName, undefined, cell._col, rc, (res) => setAttrs(res));
  };

  const btnProps = { type: 'link', size: 'small' };

  const rowColEle = rowColOpt.map((item) => {
    const { key, name, urls } = item;
    let showBall = true;
    // let compName = urls[0].value;
    // if (key === 'col') {
    //   // 加列按钮、限制只能在 同行 添加同样类型组件
    //   compName = rawCell._pos === 3 ? urls[1].value : urls[0].value;
    // }
    if (cell._pos === 4 || key === 'col') {
      // 复合组件里边，加行或列、限制只能加简单类型
      showBall = false;
    }
    const btn = (
      <Button key={key} {...btnProps} onClick={() => addNode(key, urls[0].value)}>
        {name}
      </Button>
    );
    return !showBall ? (
      btn
    ) : (
      <Tooltip
        key={key}
        placement="topLeft"
        title={
          <div className="row-con">
            {urls.map((ii) => (
              <span key={ii.value} className="row-img" onClick={() => addNode(key, ii.value)}>
                <img src={`https://img.alicdn.com/tfs/${ii.img}.png`} title="选择此模块类型" />
              </span>
            ))}
          </div>
        }
        color="#ffffff"
      >
        {btn}
      </Tooltip>
    );
  });

  // 根据节点/容器位置信息，计算浮框的位置
  const style = {
    left: x + width - 140 || 0,
    top: y - 27 || 0,
  };
  let rce = rowColEle;
  // TODO 标题禁止加行列
  if (rawCell._tit || (rawCell._pos && rawCell._pos !== 3)) {
    // 只在选择 节点和复合容器 时显示 加行列 按钮
    rce = null;
    style.left += 62;
  }

  if (cell._pos === 1) {
    style.left += 50;
  }

  return colsVisible ? (
    <div style={style} className="overlay">
      {/* {[1, 10].includes(cell._pos) ? null : rowColEle} */}
      {rce}
      {cell._pos !== 1 && (
        <>
          <Button size="small" type="text" onClick={() => changePos(upCell, false)} disabled={upDisable}>
            <Icon type="ascending" />
          </Button>
          <Button size="small" type="text" onClick={() => changePos(downCell, true)} disabled={downDisable}>
            <Icon type="descending" />
          </Button>
        </>
      )}
      <Button {...btnProps} size="small" onClick={() => getRemoveSwl(cell)}>
        <Icon type="delete" />
      </Button>
    </div>
  ) : null;
};

// AddRowCol.propTypes = {
//   colsAttr: PropTypes.objectOf(PropTypes.any),
//   setAttrs: PropTypes.func,
// };
