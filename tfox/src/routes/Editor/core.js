
/* eslint new-cap: 0, max-len: 0, no-param-reassign: 0 */
// import configXml from './config/diagrameditor.xml'
import { mx, createEditor, getCurrentXml, initLabel, setCstyle } from './common'
import debounce from 'lodash/debounce';
import { initCellAttr, initAttr } from './utils'
// import { comps } from './utils';
// 同名导出
// export { getSource } from './common'

// let msgDom;
// const logOpt = msg => {
//   msgDom = msgDom || document.querySelector('#logopt');
//   if (msgDom) {
//     console.log(msg);
//     // document.title = msg;
//     msgDom.innerHTML = msg;
//   }
// }

const {
  mxEvent, mxStackLayout, mxClient, mxHierarchicalLayout, mxUtils,
  mxVertexHandler, mxRectangleShape, mxRectangle,
} = mx

let editor
let graphRef
let graphWidth
let rightWidth
let selPrtCell
let selCell
let removeCell
let delPrtCell
// let preSelCell
// const strokeColor = '#fff'
// const strokeColor = 'transparent'
const strokeColor = 'none'
const gap = 10
const cellCol = 8

const layoutHeight = (graph, origin = 'south', cell) => {
  const layout = new mxHierarchicalLayout(graph, origin);
  layout.parentBorder = [3].includes(cell._pos) ? gap : 0
  layout.intraCellSpacing = [1, 3].includes(cell._pos) ? gap : 0
  layout.interRankCellSpacing = [1, 3].includes(cell._pos) ? gap : 0
  layout.interHierarchySpacing = [3].includes(cell._pos) ? gap : 0
  layout.resizeParent = true;
  layout.traverseAncestors = false;
  layout.fineTuning = false;
  return layout
}

const layoutExec = (graph, cell) => {
  // var st = Date.now();
  if (cell.id !== '1' && !graph.isSwimlane(cell)) {
    return
  }
  const layout = new mxStackLayout(graph, false)
  layout.spacing = gap;
  layout.marginTop = gap;
  layout.marginBottom = gap;
  layout.marginLeft = gap;
  layout.marginRight = gap;
  layout.resizeParent = true
  layout.resizeParentMax = true
  const resetSwlGap = () => {
    layout.spacing = gap;
    layout.marginTop = 0;
    layout.marginBottom = 0;
    layout.marginLeft = 0;
    layout.marginRight = 0;
  }
  if (cell._hor === 1) {
    if ([10, 2, 4].includes(cell._pos)) {
      resetSwlGap()
    }
    layout.horizontal = true
    layoutHeight(graph, 'east', cell).execute(cell)
    layoutHeight(graph, 'south', cell).execute(cell)
    layout.execute(cell)
  } else if (cell._hor === 2) {
    if ([1].includes(cell._pos)) {
      resetSwlGap()
    }
    layout.horizontal = false
    layoutHeight(graph, 'east', cell).execute(cell)
    layout.execute(cell)
  } else {
    // 对 defaultParent 做布局
    layoutHeight(graph, 'east', cell).execute(cell)
    layout.execute(cell)
  }
  // console.log(`“${cell.value || '父空节点'}”布局中、耗时 ${Date.now() - st}ms`);
  // logOpt(`“${cell.value || '父空节点'}”布局中、耗时 ${Date.now() - st}ms`);
}

// 同步渲染把 dom 锁死、导致耗时过长，改异步后尺寸获取又不对。
const layoutDFS = (graph, arr) => {
  arr.forEach(cell => {
    if (!graph.isSwimlane(cell)) {
      return
    }
    const ic = graph.getChildCells(cell)
    if (ic && ic.length) {
      layoutDFS(graph, ic)
    }
    layoutExec(graph, cell)
  })
}

// 根据_pos=10容器，设置 title 高度
const layoutTit = (graph, swl) => {
  const prt = graph.getChildCells(swl)
  if (swl._pos === 10 && prt && prt[0] && prt[1]) {
    const model = graph.getModel()
    const swlGeoClone = model.getGeometry(prt[0]).clone()
    swlGeoClone.height = prt[1].geometry.height
    model.setGeometry(prt[0], swlGeoClone)
  }
}

// 删除的节点为当前容器的最后一个节点时，循环布局父容器
const layoutPrt = (graph, swl) => {
  let prtCell = swl
  while (prtCell && prtCell.getParent() && prtCell._pos) {
    // 当为外层容器时，先修改左侧title高度 = 其右侧容器高度，修改后再布局
    if (prtCell._pos === 10) {
      layoutTit(graph, prtCell)
    }
    layoutExec(graph, prtCell)
    prtCell = prtCell.getParent()
  }
}

const setCellWidth = (graph, swl, val = rightWidth) => {
  if (!swl) {
    return
  }
  const cells = graph.getChildCells(swl, true, true)
  const swlChildLen = cells.length < swl._col ? cells.length : swl._col
  if (swl._hor === 1) {
    val = (val - (swlChildLen + 1) * gap) / swlChildLen
  }
  cells.forEach((ite) => {
    const item = ite
    if (!graph.isSwimlane(item)) {
      item.geometry.width = val
    }
    if (item.children && item.children.length && item.id !== '1') {
      setCellWidth(graph, item, val)
    }
  })
}

const wrapUndo = (fn) => {
  return function () {
    const model = editor.graph.getModel();
    model.beginUpdate();
    try {
      /* eslint prefer-rest-params: 0 */
      fn.apply(this, arguments);
    } finally {
      model.endUpdate();
    }
  }
}

export const resetLayout = wrapUndo((cells, callback = () => {}) => {
  if (!editor) {
    return
  }
  const { graph } = editor
  const defaultParent = graph.getDefaultParent()
  const defaultCells = graph.getChildCells(defaultParent, false)
  const cellArr = cells || defaultCells
  let curCell
  cellArr.length && cellArr[0].id !== '0' && cellArr.forEach(item => {
    // 获取最外层 _pos = 10 的容器
    if ([1, 2, 3, 4, 10].includes(item._pos)) {
      const prtVal = item._pos === 4 ? item.getParent().getParent().getParent().getParent() : item
      const prtItem = item._pos === 2 ? item.getParent().getParent() : prtVal
      const prt = graph.getChildCells(prtItem)
      if (item._pos === 10 && prt && prt[0]) {
        rightWidth = graphWidth - prt[0].geometry.width - gap * 2
      }
      const itemW = item.geometry.width
      // TODO 标题被移除后，prt 里只有一个 children 这样 prt[1] 不存在
      const prtCel = item._pos === 10 ? prt[1] : item
      const widthVal = item._pos === 3 ? itemW : itemW + 20
      const widthCel = item._pos === 10 ? rightWidth : widthVal
      setCellWidth(graph, prtCel, widthCel)
    }

    if ([1, 2, 3].includes(item._pos)) {
      curCell = item
    }
  })
  const oldSelSt = graph.cellsMovable
  graph.setCellsMovable(true)
  layoutDFS(graph, cellArr)
  // 删除的节点为当前容器的最后一个节点时，循环布局父容器
  curCell && layoutPrt(graph, curCell)
  // 布局默认图层下的所有子容器
  defaultParent && layoutExec(graph, defaultParent)
  graph.setCellsMovable(oldSelSt)
  callback(false)
})

const getRightSwl = (swl, posVal = 10) => {
  let prtCell = swl
  while (prtCell && prtCell.getParent() && prtCell.getParent()._pos && prtCell.getParent()._pos !== posVal) {
    prtCell = prtCell.getParent()
  }
  return prtCell
}

// 获取 pos = 10 的节点位置
const getSectionIdx = (swl) => {
  let prtCell = swl
  if (prtCell && prtCell._pos === 10) {
    return prtCell.getParent().getIndex(prtCell);
  }
  while (prtCell && prtCell.getParent() && prtCell.getParent()._pos && prtCell.getParent()._pos !== 10) {
    prtCell = prtCell.getParent()
  }
  const sec = prtCell.getParent();
  return sec.getParent().getIndex(sec);
}

export const changePos = (cell, down) => {
  const { graph } = editor
  const curPrt = cell.getParent()
  const idx = curPrt.getIndex(cell)
  const model = graph.getModel()
  model.add(curPrt, cell, down ? idx + 1 : idx - 1)
  resetLayout([getRightSwl(cell).getParent()])
  graph.view.refresh()
}

export const getParentSpe = (cell) => {
  if (!editor) {
    return
  }
  const { graph } = editor
  if (cell) {
    const isSwl = graph.isSwimlane(cell)
    return (cell._pos === 3 || !isSwl) ? cell.getParent() : cell;
  }
}

export const addVertexFn = wrapUndo((_compName, extra = {}, _col = cellCol, type, callback = () => {}) => {
  // hack 做法，设置 IS_CHROMEAPP 避免 svg fill gradient 带上 url
  mxClient.IS_CHROMEAPP = true;

  const { graph, templates } = editor
  const { id, shortDescription, iconUrl } = extra

  let compName = _compName

  let swl = graph.getSelectionCell()

  // 选中节点，点击左侧菜单数据，替换选中节点数据  TODO id 是否为 0
  if (!type && id && swl && swl.value === initLabel) {
    swl.value = shortDescription || swl.value
    swl._mid = id
    // 复合容器标题不设置图标，因为 spacingLeft 不起作用
    if (iconUrl && swl._pos !== 3) {
      graph.setCellStyles('image', iconUrl, [swl]);
    }
    graph.setCellStyles('fontColor', swl._tit || swl._pos === 3 ? '#ffffff' : '#000', [swl])
    graph.refresh(swl)
    return
  }

  // 限制只能在 同行 添加同样类型组件
  if ((!type || type === 'col') && swl && swl._pos === 3) {
    compName = 'third'
  }

  // 选中 _pos = 2 | 4 的某行容器，点击左侧菜单数据，确保此行所有节点类型一致（与 添加列 按钮操作一致）
  if (!type && id && swl && [2, 4].includes(swl._pos) && swl.children?.length) {
    if (swl.children[0]._pos === 3) {
      compName = 'third'
    } else {
      compName = 'first'
    }
  }

  // 点击左侧 插入新模块，在选中节点大容器下方、新增一行，清空选中节点。
  let sectionIdx
  if (!type && !id && swl) {
    sectionIdx = getSectionIdx(swl) + 1;
    graph.clearSelection();
    compName = _compName;
    swl = undefined
  }

  const getCell = (shape, attrs = {}) => {
    const cell = graph.cloneCell(templates[shape])
    Object.keys(attrs).forEach(attr => {
      cell[attr] = attrs[attr]
    })
    return cell
  }

  /**
    _hor = 1 水平布局 | 2 垂直布局
    _col = 2 表示 一行 2 列
    _pos 枚举值:
      10 表示 title 和 rightSwl 的父容器。
      1 表示 标题右侧 最外层容器。
      2 表示 标题右侧 每一行的容器。
      3 表示 复合组件 父容器。
      4 表示 复合组件 里的 行容器。
  */
  const prtSwl = getCell('container', { _hor: 1, _col: 2, _pos: 10 })
  const rightSwl = getCell('container', { _hor: 2, _col: 1, _pos: 1 })
  const rowSwl = getCell('container', { _hor: 1, _col, _pos: 2 })
  const thirdSwltpl = getCell('container1', { _hor: 2, _col: 1, _pos: 3 })
  const titleNode = getCell('labelTitle', { _tit: 1 })
  const vertex = getCell('label')
  graph.setCellStyles('strokeColor', strokeColor, [prtSwl])
  graph.setCellStyles('strokeColor', strokeColor, [rowSwl])

  // 获取最初的 标题右侧 容器宽度
  rightWidth = graphWidth - titleNode.geometry.width - gap * 2

  const conVerex = graph.cloneCell(vertex)
  // 设置宽度为 0 布局能生效
  conVerex.geometry.width = 0
  conVerex.value = shortDescription || conVerex.value
  if (id) {
    conVerex._mid = id
  } else {
    graph.setCellStyles('fontColor', '#9b9ea0', [conVerex])
  }
  if (iconUrl) {
    graph.setCellStyles('image', iconUrl, [conVerex]);
  }

  // 复合组件
  const thirdSwl = graph.cloneCell(thirdSwltpl)
  const thirdRowSwl = graph.cloneCell(rowSwl)
  thirdRowSwl._pos = 4
  thirdRowSwl._col = cellCol

  const isThir = compName === 'third'
  let curSwl
  let smallSwl
  if (!swl) {
    // 组合各个 cell 并插入到 graph 里
    sectionIdx === undefined ? editor.addVertex(null, prtSwl, 0, 0) : graph.addCell(prtSwl, null, sectionIdx);
    editor.addVertex(prtSwl, titleNode, 0, 0)
    editor.addVertex(prtSwl, rightSwl, 0, 0)
    editor.addVertex(rightSwl, rowSwl, 0, 0)
    graph.setCellStyles('strokeColor', strokeColor, [rightSwl])
    isThir && editor.addVertex(thirdRowSwl, conVerex, 0, 0)
    isThir && editor.addVertex(thirdSwl, thirdRowSwl, 0, 0)
    editor.addVertex(rowSwl, isThir ? thirdSwl : conVerex, 0, 0)
    swl = rowSwl
    curSwl = prtSwl
    selCell = isThir ? thirdSwl : conVerex
  } else {
    // 获取当前选中节点所在的位置、再加行加列
    selCell = swl
    selPrtCell = getParentSpe(swl)
    swl = selPrtCell
    let idx = selPrtCell.getIndex(selCell) + 1
    if (type === 'row') {
      idx = selPrtCell.parent?.getIndex(selPrtCell) + 1
      swl = swl.parent
    } else {
      const swlChildren = graph.getChildCells(swl, true, true)
      if (swl._col && swlChildren.length > swl._col - 1) {
        callback({}, true)
        return
      }
    }

    if (swl._pos === 1) {
      const newRow = graph.cloneCell(rowSwl)
      graph.addCell(newRow, swl, idx)
      isThir && editor.addVertex(thirdRowSwl, conVerex, 0, 0)
      isThir && editor.addVertex(thirdSwl, thirdRowSwl, 0, 0)
      editor.addVertex(newRow, isThir ? thirdSwl : conVerex, 0, 0)
      curSwl = newRow
      smallSwl = isThir ? thirdRowSwl : newRow
    } else if (swl._pos === 2) {
      isThir && editor.addVertex(thirdRowSwl, conVerex, 0, 0)
      isThir && editor.addVertex(thirdSwl, thirdRowSwl, 0, 0)
      graph.addCell(isThir ? thirdSwl : conVerex, swl, idx)
      curSwl = swl
      smallSwl = thirdRowSwl
    } else if (swl._pos === 3) {
      editor.addVertex(thirdRowSwl, conVerex, 0, 0)
      // thirdRowSwl 默认值为 200 > swl.width 时、会把 swl 宽度撑大 导致问题。
      thirdRowSwl.geometry.width = 0;
      graph.addCell(thirdRowSwl, swl, idx);
      curSwl = thirdRowSwl
      smallSwl = thirdRowSwl
    } else {
      graph.addCell(conVerex, swl, idx)
      curSwl = swl
      smallSwl = swl
    }
  }

  const oldSelSt = graph.cellsMovable
  graph.setCellsMovable(true)
  if (!type) {
    resetLayout([curSwl])
  } else if (type === 'col') {
    // 添加列的当前行如果是_pos = 4，直接修改当前行，布局当前行
    if (curSwl._pos === 4) {
      setCellWidth(graph, curSwl, curSwl.geometry.width + 20)
      layoutExec(graph, curSwl)
    }
    // 添加列的当前行如果是_pos = 2，需要布局当前行
    if (curSwl._pos === 2) {
      resetLayout([curSwl])
    }
  } else {
    // 添加行时，需要布局当前行及其父容器
    const widthVal = curSwl._pos === 4 ? 0 : 20
    setCellWidth(graph, curSwl, swl.geometry.width + widthVal)
    layoutPrt(graph, smallSwl)
    // 布局默认图层下的所有子容器
    const defaultParent = graph.getDefaultParent()
    defaultParent && layoutExec(graph, defaultParent)
  }

  // 获取到最内层容器，从内到外布局

  // 设置 title 高度
  const resetRowPos = type === 'col' ? swl._pos - 1 : 10
  const rightSwlVal = getRightSwl(swl, resetRowPos)
  layoutTit(graph, rightSwlVal.getParent())
  graph.setCellsMovable(oldSelSt)
  // graph.clearSelection()
  graph.setSelectionCell(conVerex)
  graph.view.refresh()
  mxClient.IS_CHROMEAPP = false;

  const cellStyle = graph.getCurrentCellStyle(conVerex)
  const attr = { visible: true, styles: cellStyle }
  callback(attr)
})

export const getRemoveSwl = (swl, isDel) => {
  const { graph } = editor
  let sel = swl
  const delCell = isDel ? sel : undefined
  // 当拖动的节点为最后一个节点 或者 拖动到默认图层时
  const isDefault = ((sel.getParent() && sel.getParent().id === '1') || isDel) && selPrtCell && selPrtCell.children && selPrtCell.children.length === 0
  if (isDefault) {
    sel = selPrtCell
  }
  while (sel && sel.id !== '1' && ((sel.children && sel.children.length === 1 && sel.id !== '1') || (sel.children && sel.children.length > 1 && sel.children[0]._tit) || (isDefault && sel.children && sel.children.length === 0))) {
    // 节点为最后一个子时，需删除其父容器
    graph.setSelectionCell(sel)
    const prt = sel.getParent()
    sel = prt
  }
  if (sel && sel.children && sel.children.length > 0) {
    removeCell = sel
    editor.graph.removeCells()
  }
  // 拖拽到默认图层时，需要删除当前被拖拽到默认图层的节点
  if (isDel) {
    graph.setSelectionCell(delCell)
    removeCell = sel
    editor.graph.removeCells()
  }
}

const resetAttr = (callback) => {
  callback({ fn: 'setCellAttr', res: initCellAttr })
  callback({ fn: 'setAttrs', res: initAttr })
  callback({ fn: 'setColsAttr', res: { cols: cellCol, colsVisible: false, cellStates: {} } })
}

export const onInit = (graphDom, callback) => {
  const edt = createEditor(graphDom)
  graphRef = graphDom;
  graphWidth = graphDom.parentNode.offsetWidth
  const { graph } = edt

  graph.zoomFactor = 1.02;
  graph.centerZoom = false;
  graph.dropEnabled = true;
  graph.cellsCloneable = false;
  graph.graphHandler.removeEmptyParents = true;

  graph.setCellsResizable(false);
  // graph.getSelectionModel().setSingleSelection(true);

  // 修改自动选中的 父容器样式
  mxVertexHandler.prototype.parentHighlightEnabled = true;
  mxVertexHandler.prototype.createParentHighlightShape = bounds => {
    const shape = new mxRectangleShape(mxRectangle.fromRectangle(bounds), null, '#4184f7');
    shape.strokewidth = 1;
    shape.isDashed = true;
    return shape;
  }

  // 注意 click 事件和 selectionCellsHandler add 事件的顺序
  graph.addListener(mxEvent.CLICK, (sender, evt) => {
    const ev = evt.getProperty('event') // mouse event
    // 注意 evt.getProperty 获取的 cell 不一定是当前选中的 cell
    const cell = evt.getProperty('cell'); // cell may be null
    // preSelCell = graph.getSelectionCell()
    // if (preSelCell && (graph.isSwimlane(preSelCell) || preSelCell._tit)) {
    //   graph.setCellsMovable(false)
    // } else {
    //   graph.setCellsMovable(true)
    // }
    // console.log(cell && cell.value);
    !cell && resetAttr(callback)

    // 获取点击的节点或容器并设置选区，解决节点重合选中问题
    const point = mxUtils.convertPoint(graphRef, mxEvent.getClientX(ev), mxEvent.getClientY(ev));
    const atCell = graph.getCellAt(point.x, point.y)
    // graph.setSelectionCell(atCell)
    // if (!cell && !atCell) {
    //   resetAttr(callback)
    // }
    // console.log('ddd', cell, atCell);
    // 按住 Ctrl 能够多选、设置属性
    if (!graph.isToggleEvent(ev)) {
      // console.log('ctrl down');
      graph.setSelectionCell(atCell)
    }
  });

  graph.addListener(mxEvent.DOUBLE_CLICK, (e, evt) => {
    const selSwl = evt.getProperty('cell');
    if (selSwl) {
      selCell = selSwl
      const cellStyle = graph.getCurrentCellStyle(selSwl)
      const bounds = graph.getCellBounds(selSwl)
      callback({ fn: 'setCellAttr', res: { cell: selSwl, cellStyle, bounds } })
      // 双击时，隐藏其他
      callback({ fn: 'setColsAttr', res: { cols: cellCol, colsVisible: false, cellStates: {} } })
      callback({ fn: 'setAttrs', res: initAttr })
    }
  })

  graph.cellEditor.blurEnabled = true;
  graph.addListener(mxEvent.EDITING_STARTED, () => {
    // 用 mxEvent 增删事件，在元素销毁时、会自动删除事件注册
    mxEvent.addListener(graph.cellEditor.textarea, 'keyup', () => {
      const rawCont = graph.cellEditor.textarea.innerText
      if (rawCont === initLabel) {
        // 输入时清空输入框内默认文案
        graph.cellEditor.textarea.innerText = ''
        graph.setCellStyles('fontColor', selCell._tit || selCell._pos === 3 ? '#ffffff' : '#9b9ea0', [selCell])
      } else {
        graph.setCellStyles('fontColor', selCell._tit || selCell._pos === 3 ? '#ffffff' : '#000', [selCell])
      }
      if (selCell._mid) {
        delete selCell._mid;
      }
      callback({ fn: 'setCellTxt', res: rawCont })
    });
    mxEvent.addListener(graph.cellEditor.textarea, 'blur', () => {
      callback({ fn: 'setCellAttr', res: initCellAttr })
    });
  })

  // graph.graphHandler.isCellMoving()
  // mousemove 时触发
  let isDown = false
  graph.graphHandler.updateHint = () => {
    isDown = true
    // graph.dropEnabled = false
  }
  graph.addMouseListener({
    mouseUp: () => {
      isDown = false
    },
    mouseDown: () => {},
    mouseMove: () => {},
  })

  const _isValidDropTarget = graph.isValidDropTarget
  graph.isValidDropTarget = (cell, cells, evt) => {
    const res = _isValidDropTarget.call(graph, cell, cells, evt)

    // 移动节点时，如果跨外部容器拖拽，返回false
    if (cells && cells.length > 0) {
      // 获取移动的目标容器和原容器id是否相同
      const targetR = getRightSwl(cells[0].getParent())
      const moveR = getRightSwl(selPrtCell.getParent())
      if (moveR.id !== targetR.id) {
        return false
      }
    }
    // graph.getDefaultParent().id === cell.id
    // console.log('ori', res, cell._pos);
    if (!isDown) {
      return res;
    }
    if (cell && !graph.isSwimlane(cell)) {
      return false
    }
    // 排除掉 外围容器
    if (cell && (cell._pos === 1 || cell._pos === 10 || cell._pos === 3 || cell.pos === 2)) {
      // console.log('false', cell._pos);
      return false;
    }
    // 如果是 复合组件 ( _pos 是 2 的行内 包含 >= 1 个复合组件)
    if (cell && cell._pos === 2 && cell.children && cell.children.find(item => item._pos === 3)) {
      // console.log('ff false', cell._pos);
      return false;
    }
    // 如果是 最内行( _pos 是 2) 则遵守行的列数
    if (cell && cell._hor === 1 && cell._col && cell.children && cell.children.length > cell._col) {
      // console.log('rrr', res, cell._pos);
      return false;
    }
    // console.log('ori', res, cell._pos);
    return res
  }

  graph.addListener(mxEvent.REMOVE_CELLS, wrapUndo(() => {
    const oldSelSt = graph.cellsMovable
    graph.setCellsMovable(true)

    // 删除的节点不是当前行的最后一个节点时
    const lastCell = removeCell && selPrtCell && selPrtCell.id !== removeCell.id

    // 删除的如果是最外层容器，只需布局默认图层，否则布局其内部，再布局默认图层
    if (removeCell && removeCell.id !== '1') {
      const removeChildren = graph.getChildCells(removeCell)
      const isSwl = removeChildren && removeChildren.length && graph.isSwimlane(removeChildren[0])
      // 重置宽度
      const widthVal = [1, 2].includes(removeCell._pos) || !lastCell ? 20 : 0
      setCellWidth(graph, removeCell, removeCell.geometry.width + widthVal)

      if (isSwl) {
        // 如果删除的当前行内有容器，继续布局其内部容器，然后再布局当前行
        isSwl && layoutDFS(graph, removeChildren)
        layoutExec(graph, removeCell)
      } else {
        // 如果删除的当前行内只有节点，直接布局当前行
        layoutExec(graph, removeCell)
      }
      // 删除的节点为当前行的最后一个节点时，从内到外依次布局其父容器
      lastCell && layoutPrt(graph, removeCell)
    }

    // 布局默认图层下的所有子容器
    const defaultParent = graph.getDefaultParent()
    lastCell && defaultParent && layoutExec(graph, defaultParent)

    graph.setCellsMovable(oldSelSt)
    graph.view.refresh()

    // 删除后，初始化属性
    resetAttr(callback)
  }))

  edt.addAction('delete', wrapUndo(() => delPrtCell && getRemoveSwl(delPrtCell)))

  const layout = new mxStackLayout(graph, true)
  layout.spacing = gap;
  graph.addListener(mxEvent.MOVE_CELLS, wrapUndo((e, evt) => {
    const moveCells = evt.getProperty('cells');
    const ev = evt.getProperty('event')
    // let tarCellPrt
    let tarCell
    const oldSelSt = graph.cellsMovable
    graph.setCellsMovable(true)

    if (ev) {
      const point = mxUtils.convertPoint(graphRef, mxEvent.getClientX(ev), mxEvent.getClientY(ev));
      layout.moveCell(moveCells[0], point.x, point.y);
      tarCell = graph.getDropTarget(moveCells, ev)
      const dropCell = getRightSwl(tarCell)
      if (dropCell) {
        // 如果当前节点是容器的最后一个节点，需要删除当前容器
        const lastCell = selPrtCell.children.length === 0
        lastCell && getRemoveSwl(selPrtCell, true)
        tarCell && setCellWidth(graph, tarCell, tarCell.geometry.width + 20)
        layoutExec(graph, moveCells[0].getParent())
      } else {
        // 拖动到 默认父容器 时，删掉、再新建一行
        // const { _mid, _col, value } = moveCells[0]
        moveCells[0] && getRemoveSwl(moveCells[0], true)
        // graph.removeCells(moveCells)
        graph.clearSelection()
        // TODO 拖动删除有问题，先注释
        // setTimeout(() => {
        //   addVertexFn('first', { id: _mid, shortDescription: value }, Number(_col))
        // }, 10)
      }
    }
    if (evt.properties.target && evt.properties.target.parent && selPrtCell && selPrtCell.geometry) {
      setCellWidth(graph, selPrtCell, selPrtCell.geometry.width + 20)
      layoutDFS(graph, [selPrtCell])
      // 拖动节点后需要把selPrtCell设置为目标容器
      selPrtCell = tarCell
    }

    graph.setCellsMovable(oldSelSt)
    graph.view.refresh()
  }))

  // 选中元素并添加选区后触发的事件
  graph.selectionCellsHandler.addListener(mxEvent.ADD, (sender, evt) => {
    const cellStates = evt.getProperty('state');
    const { cell } = cellStates;
    // console.log('sss', cellStates);
    if (cell) {
      // 一行只有一个节点时、禁止拖动
      if (graph.isSwimlane(cell) || cell._tit || cell.parent.children.length <= 1) {
        // 改变样式会造成多一次触发 mxEvent.ADD 事件，而 mxEvent.REMOVE 少一次，导致样式设置错误
        // graph.setCellStyles('movable', 0, [cell])
        graph.setCellsMovable(false)
      } else {
        graph.setCellsMovable(true)
      }

      // TODO 以下代码 影响性能
      // return
      const isSwl = graph.isSwimlane(cell)
      delPrtCell = cell.getParent()
      selPrtCell = isSwl ? cell : delPrtCell
      callback({
        fn: 'setAttrs',
        res: {
          visible: isSwl ? (cell._pos === 3) : true,
          styles: (!isSwl || cell._pos === 3) ? graph.getCurrentCellStyle(cell) : {},
          _mid: cell._mid,
          setImage: cell._pos !== 3,
          backColor: true,
        },
      })
      callback({ fn: 'setColsAttr', res: { colsVisible: true, cellStates: cellStates || {} } })
      callback({ fn: 'setCellAttr', res: initCellAttr })
    }
  })

  const upView = (cell) => {
    // graph.view.invalidate(cell, true, true);
    // graph.view.validate();
    // graph.view.refresh();
    if (!graph.isEditing()) {
      graph.refresh(cell)
    }
  }
  const changeImg = (sender) => {
    Object.keys(sender.cells).forEach(cellId => {
      const cell = sender.cells[cellId]
      const style = graph.getCurrentCellStyle(cell)
      // TODO: shape 为 swimlane 时 image 改变 spacingLeft 位置，不起作用？！
      if (!cell.style || style.shape !== 'label') {
        return
      }
      const st = graph.view.getCellStates([cell])[0]
      const textWidth = (st && st.text && st.text.node.getBoundingClientRect().width) || 0
      const textX = (cell.geometry.width - textWidth) / 2 - 20
      const styMap = {
        align: ['left', 'center'],
        spacingLeft: [30, 0],
        spacing: [textX > -10 ? textX : -10, 0],
      }
      // 使用 graph.setCellStyles 会导致 撤销 失效
      Object.keys(styMap).forEach(
        // sty => graph.setCellStyles(sty, style.image ? styMap[sty][0] : styMap[sty][1], [cell])
        sty => setCstyle(sty, style.image ? styMap[sty][0] : styMap[sty][1], cell)
      );
      upView(cell);
    })
  }
  graph.model.addListener(mxEvent.CHANGE, debounce(sender => {
    const oldSelSt = graph.cellsMovable
    graph.setCellsMovable(true)
    changeImg(sender)
    // console.log('ccd', graph.cellsMovable);
    graph.setCellsMovable(oldSelSt)
  }, 30))

  let curXml = edt._cleanXml
  graph.model.addListener(mxEvent.CHANGE, debounce(() => {
    const newXml = getCurrentXml(edt)
    if (newXml !== curXml) {
      callback({ fn: 'onGraphChange', res: { newXml, scaleNum: 100 } })
      // callback({ fn: 'sendOnWindowMessage', res: {} });
      curXml = newXml
    }
  }, 130));

  editor = edt;
  return edt;
}

export const updateCell = (cellData, callback = () => { }) => {
  const { graph } = editor
  const { id, img } = cellData
  let { cell, value } = cellData
  cell = cell || graph.getSelectionCell()
  value = value || cell.value
  if (id) {
    cell._mid = id
  }
  if (img) {
    graph.setCellStyles('image', img, [cell]);
  } else {
    graph.setCellStyles('image', '', [cell]);
  }
  graph.setCellStyles('fontColor', cell._tit || cell._pos === 3 ? '#ffffff' : '#000', [cell])
  graph.getModel().setValue(cell, value);
  graph.stopEditing(true);
  callback(graph.getCurrentCellStyle(cell))
}
