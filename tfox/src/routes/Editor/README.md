# 资料

- [mxgraph GitHub](https://github.com/jgraph/mxgraph)
  - [文档](https://jgraph.github.io/mxgraph)、[示例](https://jgraph.github.io/mxgraph/javascript/index.html)
  - 中文简介 <http://fancyerii.github.io/2019/03/26/mxgraph/>
- [draw.io GitHub](https://github.com/jgraph/drawio)、[draw.io](https://app.diagrams.net)

文件及目录说明：
`images` 文件夹里有拷贝自 node_modules 'mxgraph/javascript/src/images' 目录的图片、由于图片名写死在库源码中、就不可更改。如果需要显示这些图片、需要配合 `mxImageBasePath` 的设置、在服务器的 相应目录 放置此文件夹。
其他 项目自引用 图片，可以直接上传 cdn 或者转为 base64 统一放到 `less/imgs.js` 里。

底层技术说明：

- svg: 元素可交互、可缩放 占优势，大规模元素性能差。
- canvas: 大规模元素、频繁重绘、导出图片、光影效果，占优势。

example 文件参考

- 形状、动作 基础参考页面 https://jgraph.github.io/mxgraph/javascript/examples/editors/diagrameditor.html
- 边线上的箭头连接点: portrefs.html 、 anchors.html 、 fixedpoints.html
- 查看页: viewer.html 另参考 draw.io 导出为 HTML URL; 自定义形状 shape.html
- 插入html: htmllabel.html ; 图文混排 fixedicon.html images.html; 文字换行溢出 wrapping.html ;
- 图+label: contexticons.html 、 labelposition.html 、indicators.html 、 perimeter.html 、labels.html
- 覆盖物: control.html 、overlays.html 、hovericons.html ；单元格嵌套: constituent.html 、handles.html。
- drop.html 拖入本地图片、morph.html 反转、layers.html 多图层、剪切板 clipboard.html 、事件风暴 secondlabel.html

## 删除或未用到的方法 (移到 backup 目录)

- 框选功能(@qingqian)
- 导出文件、高亮节点边框/选区

## 设计器其他常用方法

```js
const configXml = `
<mxEditor>
  <ui><add as="graph" element="graph"/></ui>
  <mxGraph as="graph">
    <mxGraphModel as="model">
      <root>
        <mxCell value="技术架构图" id="0" />
        <mxCell value="默认图层" id="1" parent="0"/>
      </root>
    </mxGraphModel>
  </mxGraph>
</mxEditor>
`

// 更新 model 但内部方法基本都有调用，自己代码还需要调用吗？
graph.getModel().beginUpdate();
try {
  // do change
} finally {
  graph.getModel().endUpdate();
}

const setToolbar = (ele) => {
  const clickHandler = (name) => {
    lastSelShape = name
  }
  const toolbar = new mxToolbar(ele);
  toolbar.addSwitchMode('Rounded', rounded, () => clickHandler(titles[3]))
  toolbar.addSwitchMode('Rectangle', rectangle, () => clickHandler(titles[2]))
  toolbar.addSwitchMode('Ellipse', ellipse, () => clickHandler(titles[4]))
  toolbar.addSwitchMode('Text', text, () => clickHandler(titles[0]))
  toolbar.addSwitchMode('Image', image, () => clickHandler(titles[5]))
}

// 更新 window.status 到页面
const _validate = graph.view.validate
graph.view.validate = (cell) => {
  // _validate.apply(graph.view, arguments);
  _validate.call(graph.view, cell);
  callback({ fn: 'onStateChange', res: window.status })
}

// 配置代码
graph.gridSize = 64;
graph.cellsResizable = false;
graph.setCellsMovable(false);

graph.getTooltipForCell = (cell) => {
  // const label = cell.getAttribute('label');
  // cell.getId() cell.getStyle() cell.getChildCount() cell.getEdgeCount()
  return cell.value;
}
graph.convertValueToString = (cell) => {
  // 如果 value 是 XML node，可以获取其某个 attribute 来显示
  return cell.value;
}
graph.model.valueForCellChanged = (cellr, value) => {
  const cell = cellr
  const previous = cell.value;
  cell.value = value;
  return previous;
}
const { cellLabelChanged } = graph;
graph.cellLabelChanged = (cell, newValue, autoSize) => {
  // const elt = cell.value;
  // elt.setAttribute('label', newValue);
  // newValue = elt;
  // cellLabelChanged.apply(graph, arguments);
  cellLabelChanged.apply(graph, cell, newValue, autoSize);
};

// 获取多个 cell 所占的区域尺寸
const bounds = graph.getBoundingBoxFromGeometry(cells, true);

// 获取选择的 cell
const cell = editor.graph.getSelectionCell();
editor.execute('showProperties', cell);
const model = editor.graph.getModel();
model.getStyle(cell)
model.setStyle(cell, style);
cell = editor.graph.getCurrentRoot();
cell = editor.graph.getModel().getRoot();
cell.getAttribute('href');

editor.graph.toggleCellStyles(mxConstants.STYLE_HORIZONTAL, true);
const acs = ['selectAll', 'selectNone', 'selectVertices', 'selectEdges']
acs.map(item => mxUtils.linkAction(sa, item, editor, item))
const acss = ['group', 'ungroup', 'cut', 'copy', 'paste']
acss.map((name) => editor.execute(name))
editor.execute('exportImage')
editor.execute('show')
editor.urlImage = './';
const styles = graph.getCellStyle(graph.getSelectionCell())

graph.isAutoSizeCell = (cell) => {
  return mxUtils.isNode(graph.model.getValue(cell), 'text');
}
graph.isSwimlane = (cell) => {
  return mxUtils.isNode(graph.model.getValue(cell), 'container');
}

const onSave = () => {
  try {
    editor.save();
  } catch (e) {
    mxUtils.error(`Cannot save : ${e.message}`, 280, true);
  }
}

// 源码有用 API 参考：
// 选取 previewColor 、redrawHandles、singleSizer
mxConstants.HANDLE_FILLCOLOR
mxConnectionHandler.prototype.mouseUp
mxConnectionHandler.prototype.createEdge
getTopmostCells
mxGraph.prototype.createHandler
selectionCellsHandler
setHandlesVisibleForCells
this.drawPreview();  画绿色选中框
this.fireEvent(new mxEventObject(mxEvent.ADD, 'state', state));
mxGraphHandler.prototype.isCellMoving
STYLE_INDICATOR_SHAPE
STYLE_IMAGE
STYLE_WHITE_SPACE
labelsVisible
snapDelta
getChildOffsetForCell
getBoundingBox
mxImageExport
graph.isConstrainedEvent(me.getEvent())  按 shift 固定移动
hitsSwimlaneContent
```
