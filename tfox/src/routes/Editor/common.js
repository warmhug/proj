/* eslint max-len: 0, no-unused-vars: 0, new-cap: 0, no-param-reassign: 0, no-new: 0, no-console: 0 */
import React from 'react';
import mxgraph from 'mxgraph';
import qs from 'qs';
import { isParseError, createNode, htmlEntities, defaultIcon } from './utils';
import resourcesTxt from './assets/app_zh.txt';
import imgs from './assets/imgs';

const { dot, deleteIcon, collapsed, expanded } = imgs;

export const EditorContext = React.createContext({})

export const initLabel = '双击输入(搜索)';
export const DEF_spacing = 3;
export const DEF_spacingLeft = 28;
export const EDGE_STYLE = [
  'labelBackgroundColor=#ffffff;strokeColor=#36393D;edgeStyle=elbowEdgeStyle;',
  'shape=arrow;fillColor=#ffffff;endSize=20;',
  'endArrow=classic;html=1;',
  // 'shape=flexArrow;endArrow=classic;startArrow=classic;html=1;'
  // 'shape=flexArrow;endArrow=classic;html=1;'
]

let { mx } = window;
if (!mx) {
  mx = mxgraph({
    // mxBasePath: '../../',
    mxImageBasePath: '../imgs', // 用于 images 文件夹里图片引用，
    mxLanguages: ['zh', 'en'],
    mxLanguage: 'zh',
    // mxDefaultLanguage: 'zh',
    mxLoadStylesheets: false, // 自己引入 mxgraph 包里的 common.css 文件
    mxLoadResources: false, // 自己引入 mxgraph 包里的 resources 文件
  })
  window.mx = mx;
  window.mxEditor = mx.mxEditor;
  window.mxDefaultKeyHandler = mx.mxDefaultKeyHandler;
  window.mxDefaultPopupMenu = mx.mxDefaultPopupMenu;
  // 查看源码 mxCodec.prototype.decode 处 window[node.nodeName] 需要的都要补上
  window.mxGraph = mx.mxGraph;
  window.mxGraphModel = mx.mxGraphModel;
  window.mxCell = mx.mxCell;
  window.mxCellPath = mx.mxCellPath;
  window.mxGeometry = mx.mxGeometry;
  window.mxRectangle = mx.mxRectangle;
  window.mxStylesheet = mx.mxStylesheet;
  window.mxDefaultToolbar = mx.mxDefaultToolbar;
  window.mxPoint = mx.mxPoint;
  // window.onbeforeunload = () => mxResources.get('changesLost');
}

const {
  mxEditor, mxClient, mxUtils, mxEvent, mxCodec, mxCell, mxGeometry, mxGraph, mxGraphModel,
  mxResources, mxVertexHandler, mxConstants, mxCellState, mxConnectionConstraint, mxPoint,
  mxConstraintHandler, mxImage, mxRubberband, mxEdgeHandler, mxGraphHandler, mxGuide, mxUndoManager, mxKeyHandler,
  mxRectangleShape, mxEllipse, mxImageShape, mxSwimlane, mxTriangle, mxRhombus,
} = mx

const bindActionWrap = (edti, handler) => (code, action, control) => {
  // Binds the function to control-down keycode
  if (control) {
    handler.bindControlKey(code, () => edti.execute(action));
  } else {
    // Binds the function to the normal keycode
    handler.bindKey(code, () => {
      edti.execute(action)
    });
  }
};

const addActions = (edti, isPro) => {
  // const keyHandler = new mxKeyHandler(edti.graph, edti.graph.container);
  const keyHandler = new mxKeyHandler(edti.graph, undefined);
  const _keyDown = keyHandler.keyDown;
  keyHandler.keyDown = (evt) => {
    evt.isConsumed = false
    _keyDown.call(keyHandler, evt);
  }
  edti.keyHandler = {
    editor: edti,
    handler: keyHandler,
  };
  // 多实例时、键盘事件触发错乱，做源码覆盖
  const bindAction = bindActionWrap(edti, keyHandler)
  bindAction(8, 'delete');
  bindAction(46, 'delete');
  bindAction(37, 'selectPrevious');
  bindAction(38, 'selectParent');
  bindAction(40, 'selectChild');
  bindAction(39, 'selectNext');
  bindAction(65, 'selectAll', true);
  bindAction(90, 'undo', true);
  bindAction(89, 'redo', true);
  bindAction(83, 'save', true); // Ctrl+S
  // edti.save = (url, linefeed) => {
  //   mxEditor.prototype.save.call(edti, url, linefeed);
  //   // console.log('save');
  // }

  if (isPro) {
    bindAction(88, 'cut', true);
    bindAction(86, 'paste', true);
    bindAction(67, 'copy', true);
  }

  // 映射 Mac 上的 command 按键
  keyHandler.getFunction = (evt) => {
    if (evt) {
      const ins = keyHandler
      return (mxEvent.isControlDown(evt) ||
        (mxClient.IS_MAC && evt.metaKey)) ?
        ins.controlKeys[evt.keyCode] : ins.normalKeys[evt.keyCode];
    }
    return null;
  }

  const treeShape = (edt, cellr, flag) => {
    const { getSelectionCell, getDefaultParent } = edt.graph;
    edt.treeLayout(cellr || getSelectionCell() || getDefaultParent(), flag);
  }
  edti.addAction('horizontalTree', (edt, cellr) => treeShape(edt, cellr, true))
  edti.addAction('verticalTree', (edt, cellr) => treeShape(edt, cellr, false))
}

const setTemplates = (edti) => {
  const imgStyle = 'imageAlign=left;imageVerticalAlign=middle;imageWidth=20;imageHeight=20;'
  const rectStyle = 'fillColor=#ffffff;strokeColor=#181818;fontColor=#181818;'
  const titleStyle = 'fillColor=#73777a;strokeColor=#73777a;fontColor=#ffffff;bold=1;'
  const labelStyle = `align=center;verticalAlign=middle;overflow=hidden;${imgStyle}`
  const vertexObj = {
    group: new mxCell(
      'Group',
      null,
      'shape=rectangle;perimeter=rectanglePerimeter;align=center;verticalAlign=middle;fillColor=none;'
    ),
    container: new mxCell(
      '',
      new mxGeometry(0, 0, 200, 30),
      'shape=swimlane;startSize=0;fillColor=none;strokeColor=#181818;'
    ),
    container1: new mxCell(
      initLabel,
      new mxGeometry(0, 0, 200, 300),
      'shape=swimlane;startSize=30;swimlaneLine=0;fillColor=#ff6a00;fontColor=#ffffff;strokeColor=#181818;'
    ),
    label: new mxCell(
      initLabel,
      new mxGeometry(0, 0, 80, 30),
      `shape=label;perimeter=rectanglePerimeter;${labelStyle}fontSize=12;${rectStyle}`
    ),
    labelTitle: new mxCell(
      '填写标题',
      new mxGeometry(0, 0, 80, 30),
      `shape=label;perimeter=rectanglePerimeter;${labelStyle}fontSize=14;${titleStyle}`
    ),
    rectangle: new mxCell(
      initLabel,
      new mxGeometry(0, 0, 80, 30),
      `fontSize=14;${rectStyle}`
    ),
    rounded: new mxCell(
      'Rounded',
      new mxGeometry(0, 0, 80, 30),
      'rounded=1;'
    ),
    text: new mxCell(
      'Text Here',
      new mxGeometry(0, 0, 80, 30),
      'shape=rectangle;perimeter=rectanglePerimeter;fontSize=12;align=left;verticalAlign=top;strokeColor=none;fillColor=none;gradientColor=none;'
    ),
    image: new mxCell(
      // createNode('Image', { src: '' }),
      '',
      new mxGeometry(0, 0, 60, 40),
      // style 里的 image 不能为 base64 格式、会被解析错误，原因查看框架源代码 getCellStyle 的实现
      `shape=image;perimeter=rectanglePerimeter;fontSize=10,align=center;verticalAlign=middle;image=${defaultIcon};`
    ),
    ellipse: new mxCell(
      'Shape',
      new mxGeometry(0, 0, 60, 60),
      'shape=ellipse;perimeter=ellipsePerimeter;strokeColor=#CDEB8B;fillColor=#CDEB8B;'
    ),
    triangle: new mxCell(
      'Shape',
      new mxGeometry(0, 0, 60, 60),
      'shape=triangle;perimeter=trianglePerimeter;strokeColor=#FFCF8A;fillColor=#FFCF8A;align=left;'
    ),
    rhombus: new mxCell(
      'Shape',
      new mxGeometry(0, 0, 60, 60),
      'shape=rhombus;perimeter=rhombusPerimeter;strokeColor=#FFCF8A;fillColor=#FFCF8A;'
    ),
    hline: new mxCell(
      '',
      new mxGeometry(0, 0, 60, 10),
      'shape=line;strokeWidth=3,perimeter=rectanglePerimeter;fontColor=black;fontSize=10,align=center;verticalAlign=bottom;strokeColor=#36393D;'
    ),
    cloud: new mxCell(
      'Shape',
      new mxGeometry(0, 0, 80, 60),
      'shape=cloud;perimeter=ellipsePerimeter;strokeColor=#CDEB8B;fillColor=#CDEB8B;'
    ),
  }

  Object.keys(vertexObj).forEach(name => {
    vertexObj[name].vertex = true;
    if (name === 'group' || name === 'container') {
      vertexObj[name].connectable = false;
    }
  });

  const arrow = new mxCell('', new mxGeometry(0, 0, 50, 50), EDGE_STYLE[2]);
  arrow.geometry.setTerminalPoint(new mxPoint(0, 50), true);
  // arrow.geometry.points = [new mxPoint(25, 25)];
  arrow.geometry.setTerminalPoint(new mxPoint(50, 0), false);
  arrow.geometry.relative = true;
  arrow.edge = true;

  const connMetry = new mxGeometry(0, 9);
  connMetry.relative = true;
  const connCell = new mxCell('', connMetry);
  connCell.setEdge(true);

  edti.defaultEdge = connCell
  edti.defaultGroup = vertexObj.group
  edti.templates = { connCell, arrow, ...vertexObj }
}

const createGraph = (graphContainer) => {
  // mxResources.add('../resources/app') // resources 默认是通过 http 加载，改为打包进来
  mxResources.parse(resourcesTxt)

  const root = new mxCell('技术架构图')
  root.id = '0'
  const layer = new mxCell('默认图层')
  layer.id = '1'
  root.insert(layer)
  const model = new mxGraphModel(root)
  return new mxGraph(graphContainer, model);
}

const proConfig = (edt) => {
  const { graph } = edt;
  graph.dropEnabled = true;
  graph.allowLoops = true;
  graph.collapsedImage = new mxImage(collapsed, 9, 9);
  graph.expandedImage = new mxImage(expanded, 9, 9);
  // graph.autoSizeCellsOnAdd = true;
  // graph.autoSizeCells = true;
  // graph.setHtmlLabels(true);
  // graph.convertValueToString = (cell) => {
  //   return mxUtils.htmlEntities(cell.value, false);
  // }
  // 右键菜单
  graph.popupMenuHandler.autoExpand = true;
  graph.popupMenuHandler.factoryMethod = (menu, cell) => {
    if (cell) {
      const trEle = menu.addItem('删除', deleteIcon, () => edt.execute('delete'))
      trEle.querySelectorAll('.mxPopupMenuItem')[1].innerHTML = '<span style="color: gray;">Delete</span>';
    }
  }

  // Overridden to define per-shape connection points
  mxGraph.prototype.getAllConnectionConstraints = (terminal) => {
    if (terminal && terminal.shape) {
      if (terminal.shape.stencil && terminal.shape.stencil.constraints) {
        return terminal.shape.stencil.constraints;
      } else if (terminal.shape.constraints) {
        return terminal.shape.constraints;
      }
    }
    return null;
  };
  mxConstraintHandler.prototype.pointImage = new mxImage(dot, 5, 5);
  // mxShape.prototype.constraints = [
  mxRectangleShape.prototype.constraints = [
    // new mxConnectionConstraint(new mxPoint(0.25, 0), true),
    new mxConnectionConstraint(new mxPoint(0.45, 0), true),
    // new mxConnectionConstraint(new mxPoint(0.5, 0), true),
    // new mxConnectionConstraint(new mxPoint(0.75, 0), true),
    // new mxConnectionConstraint(new mxPoint(0, 0.25), true),
    new mxConnectionConstraint(new mxPoint(0, 0.45), true),
    // new mxConnectionConstraint(new mxPoint(0, 0.5), true),
    // new mxConnectionConstraint(new mxPoint(0, 0.75), true),
    // new mxConnectionConstraint(new mxPoint(1, 0.25), true),
    new mxConnectionConstraint(new mxPoint(1, 0.45), true),
    // new mxConnectionConstraint(new mxPoint(1, 0.5), true),
    // new mxConnectionConstraint(new mxPoint(1, 0.75), true),
    // new mxConnectionConstraint(new mxPoint(0.25, 1), true),
    new mxConnectionConstraint(new mxPoint(0.45, 1), true),
    // new mxConnectionConstraint(new mxPoint(0.5, 1), true),
    // new mxConnectionConstraint(new mxPoint(0.75, 1), true)
  ];
  mxEllipse.prototype.constraints = mxRectangleShape.prototype.constraints;
  mxImageShape.prototype.constraints = mxRectangleShape.prototype.constraints;
  mxSwimlane.prototype.constraints = mxRectangleShape.prototype.constraints;
  mxTriangle.prototype.constraints = mxRectangleShape.prototype.constraints;
  mxRhombus.prototype.constraints = mxRectangleShape.prototype.constraints;

  graph.setConnectable(true);
  graph.connectionHandler.setCreateTarget(true);
  // 这里会影响 边线箭头 形状设置
  graph.connectionHandler.factoryMethod = (source, target) => edt.createEdge(source, target);
  // graph.connectionHandler.createEdgeState = (me) => {
  //   const edge = graph.createEdge(null, null, null, null, null);
  //   return new mxCellState(graph.view, edge, graph.getCellStyle(edge));
  // }
  // mxConnectionHandler.prototype.connectImage = new mxImage(connector, 16, 16);
  // Disables built-in connection starts
  graph.connectionHandler.isValidSource = () => false;

  // 设置框选
  new mxRubberband(graph);

  // Maintains swimlanes and installs autolayout
  edt.createSwimlaneManager(graph);
  edt.createLayoutManager(graph);

  // mxEvent.disableContextMenu(edt.graph.container);
  mxEdgeHandler.prototype.snapToTerminals = true;
  mxGraphHandler.prototype.guidesEnabled = true;
  mxGuide.prototype.isEnabledForEvent = function (evt) {
    return !mxEvent.isAltDown(evt);
  };
}

function mxEditorSimulate() {
  this.actions = [];
  const _addActions = mxEditor.prototype.addActions.bind(this)
  _addActions();
  this.undoManager = new mxUndoManager();
}
mxEditorSimulate.prototype = mxEditor.prototype;

export const createEditor = (graphContainer, isPro = false) => {
  try {
    if (!mxClient.isBrowserSupported()) {
      mxUtils.error('浏览器不支持', 200, false);
    } else {
      // 由于 快捷键 问题、不使用内置的 mxEditor 构造编辑器
      // const localEditor = new mxEditor();
      const localEditor = new mxEditorSimulate();
      const graph = createGraph(graphContainer)
      localEditor.graph = graph

      const defStyle = localEditor.graph.stylesheet.styles;
      defStyle.defaultVertex = {
        ...defStyle.defaultVertex,
        fillColor: '#ffffff',
        strokeColor: '#181818',
        fontColor: '#774400',
      }
      defStyle.defaultEdge = {
        ...defStyle.defaultEdge,
        strokeColor: '#181818',
        fonColor: '#774400',
      }

      // 补齐 mxEditor.prototype.createGraph 里的初始化操作
      localEditor.installUndoHandler(graph);
      localEditor.installDrillHandler(graph);
      localEditor.installChangeHandler(graph);
      localEditor.installInsertHandler(graph);

      graph.foldingEnabled = false;
      // 拖动释放高亮颜色
      // graph.graphHandler.setHighlightColor('#63b2f5')
      // graph.graphHandler.previewColor = '#f00'

      mxConstants.HANDLE_FILLCOLOR = '#4184f7'
      // 节点可旋转
      mxVertexHandler.prototype.rotationEnabled = isPro;
      mxVertexHandler.prototype.getSelectionColor = () => '#4184f7'
      mxVertexHandler.prototype.getSelectionStrokeWidth = () => 2
      mxVertexHandler.prototype.isSelectionDashed = () => true

      addActions(localEditor, isPro);
      isPro && proConfig(localEditor);

      setTemplates(localEditor);

      localEditor._cleanXml = getCurrentXml(localEditor)
      return localEditor;
    }
  } catch (e) {
    mxUtils.alert(`不能启动应用: ${e.message}`);
    // throw e; // for debugging
  }
}

export { mx };

/**
 * 以下为 核心操作
 */
export const onSave = (edt, callback) => {
  // edt.save = (url, linefeed) => {
  edt.save = () => {
    // mxEditor.prototype.save.call(edti, url, linefeed);
    // console.log('save');
    callback && callback();
  }
}

export const onSysAction = (edt, name, xml, callback) => {
  if (xml && name === 'show') {
    let tmpDiv = document.getElementById('_tmpDiv')
    if (tmpDiv) {
      tmpDiv.parentNode.removeChild(tmpDiv)
    }
    tmpDiv = document.createElement('div')
    tmpDiv.id = '_tmpDiv'
    tmpDiv.style.display = 'none';
    document.body.appendChild(tmpDiv);
    const newGraph = createGraph(tmpDiv)
    insertXmlToGraph(xml, newGraph.getModel())
    mxUtils.show(newGraph, null, 10, 10)
  } else {
    edt.execute(name)
  }
  if (['zoomIn', 'zoomOut', 'actualSize'].includes(name) && callback) {
    const scaleNum = edt.graph.getView().getScale()
    callback(scaleNum)
  }
}

export const getIframeDoc = () => {
  const iframe = document.getElementById('_innerIfr') || document.createElement('iframe')
  iframe.id = '_innerIfr'
  iframe.style.display = 'none';
  iframe.src = `data:text/html;charset=utf-8,${encodeURI('<body></body>')}`;
  document.body.appendChild(iframe);
  return iframe.contentDocument || iframe.contentWindow.document;
}

export const getSvgInfo = (graph, win) => {
  const doc = mxUtils.show(graph, win || null, 10, 10)
  const wrapper = doc.body.children[0]
  const wh = {
    width: parseInt(wrapper.style.width, 10), height: parseInt(wrapper.style.height, 10),
  }
  const svgNode = wrapper.querySelector('svg')
  svgNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  return { svgNode, wh }
}

export const getImg = (graph, graphRef, callback) => {
  const { svgNode } = getSvgInfo(graph, getIframeDoc());
  if (graphRef.current && graphRef.current.parentNode) {
    const { offsetWidth, offsetHeight } = graphRef.current.parentNode;
    const widthV = offsetWidth || 860;
    const heightV = offsetHeight || 760;
    svgNode.setAttribute('viewBox', `0 0 ${widthV} ${heightV}`);
    callback(svgNode.outerHTML);
  }
};

export const setCstyle = (key, value, cell) => {
  const style = mxUtils.setStyle(cell.getStyle(), key, value);
  cell.setStyle(style);
}

export const getQs = () => qs.parse(location.search, { ignoreQueryPrefix: true });
export const strQs = obj => qs.stringify(obj);

export const getSource = (edt, callback = () => {}) => {
  const enc = new mxCodec();
  const node = enc.encode(edt.graph.getModel());
  const xml = mxUtils.getPrettyXml(node);
  // const xml = mxUtils.getXml(node);
  // console.log(xml)
  // mxUtils.alert(xml)
  callback(xml)
  // mxUtils.popup(xml, true);
}

export const getCurrentXml = (edt) => {
  const enc = new mxCodec();
  const node = enc.encode(edt.graph.getModel());
  // console.log('nnn', node, node.firstChild);
  return mxUtils.getXml(node)
  // return mxUtils.getXml(node.firstChild)
}

export const insertXmlToGraph = (xml, graphModel) => {
  // DOMParser().parseFromString(xml, 'text/xml');
  // DOMParser 在转换 xml 时、需要把 & 转义为 &amp; 不然会解析错误。
  // 但上个函数 mxUtils.getXml 内部的 xmlSerializer.serializeToString 已对特殊字符做了转义
  // https://stackoverflow.com/questions/17423495/how-to-solve-ampersand-conversion-issue-in-xml
  // https://stackoverflow.com/questions/11555890/how-to-parse-xml-with-special-character-specifically-for-ampersand
  // 配合 graph.convertValueToString 的设置，注意输入 < > & 换行等问题
  // xml.replace(/&/g, '&amp;')
  const doc = mxUtils.parseXml(xml);
  if (isParseError(doc)) {
    // alert('转义 xml 出错，检查是否有 & 号未转义')
    return false
  }
  try {
    const codec = new mxCodec(doc);
    codec.decode(doc.documentElement, graphModel)
  } catch (e) {
    console.log(e);
  }
  // 解决 webpack 下不生效问题 https://stackoverflow.com/a/50793107/2190503
}

export const getXmlText = (graph, graphName) => {
  const gm = createNode('mxGraphModel')
  const root = createNode('root')
  const { offsetWidth, offsetHeight } = graph.container;
  offsetWidth && root.setAttribute('width', offsetWidth)
  offsetHeight && root.setAttribute('height', offsetHeight)

  gm.appendChild(root)
  const arr = [...Object.values(graph.model.cells)].filter(cell => !['0', '1'].includes(cell.id))
  // const cells = arr.map(cell => !graph.isSwimlane(cell))
  // shapeNum 用于后端生成 PPT，具体数字联系后端确认
  const shapeNum = {
    ellipse: 35,
    label: 5,
    rounded: 26,
    swimlane: 5,
  }
  arr.forEach(cell => {
    const style = { ...graph.getCurrentCellStyle(cell) }
    style.shapeNum = shapeNum[style.rounded === 1 ? 'rounded' : style.shape]
    const geo = cell.geometry
    const extraStyle = {}
    // 边框线的宽度
    if (style.strokeWidth) {
      extraStyle.lineWidth = style.strokeWidth
    }
    // 边框实线0=>false; 1=>true
    if (style.dashed === 1) {
      extraStyle.lineDash = true
    }
    // 字体加粗、斜体
    if (style.fontStyle) {
      if (style.fontStyle === 1) {
        extraStyle.fontBold = true
      } else if (style.fontStyle === 2) {
        extraStyle.fontItalic = true
      } else {
        extraStyle.fontBold = true
        extraStyle.fontItalic = true
      }
    }

    // cell.value 只转义 & 双引号，对 < > ' 不会自动转义？在 XML 里 < & 是非法字符
    const newVal = htmlEntities(cell.value)

    // ppt导出加标题需要 _pos = 10 的容器 y + 40
    const attrs = {
      value: newVal,
      position: JSON.stringify({ x: geo.x, y: cell._pos === 10 ? geo.y + 40 : geo.y, width: geo.width, height: geo.height }),
      style: JSON.stringify({ ...style, ...extraStyle }),
      shapeId: cell.id,
      parentShapeId: cell.parent.id,
      // displayName: newVal,
      metadataName: newVal,
    }

    if (style.image) {
      attrs.icon = JSON.stringify({ width: 20, height: 20, iconUrl: style.image, x: style.spacing, y: 5 })
    }
    if (cell._mid) {
      attrs.metadataId = cell._mid
    }

    let titCell
    let newCell
    if (cell._pos === 3) {
      titCell = createNode('mxCell', {
        ...attrs,
        shapeId: String(10000 + Number(cell.id)),
        parentShapeId: cell.id,
        position: JSON.stringify({ x: 0, y: 0, width: geo.width, height: 30 }),
      })
      newCell = createNode('mxCell', {
        ...attrs,
        value: '',
        style: JSON.stringify({ ...style, fillColor: '#ffffff' }),
      })
    } else {
      newCell = createNode('mxCell', attrs)
    }
    // ppt导出加标题
    if (geo.x === 10 && geo.y === 10) {
      const tit = createNode('mxCell', {
        shapeId: '-1',
        value: htmlEntities(graphName) || '未命名',
        position: JSON.stringify({ x: 0, y: 5, width: geo.width, height: 30 }),
        style: JSON.stringify({ ...style, title: true, fontBold: true, fontSize: 20 }),
      })
      root.appendChild(tit)
    }

    root.appendChild(newCell)
    titCell && root.appendChild(titCell)
  })
  // 后端需要替换 nbsp
  return gm.outerHTML.replace(/&nbsp;/g, '');
  // return gm.outerHTML;
}

/**
 * pro 版本方法
 */
export const getSelectionCellsInOriginTranslate = (graph) => {
  const { view } = graph;
  const selectionModel = graph.getSelectionModel();
  const { cells } = selectionModel;
  const bounds = view.getBounds(cells);
  const cloneCells = graph.cloneCells(mxUtils.sortCells(graph.model.getTopmostCells(cells)));
  const { scale, translate } = view;
  bounds.x /= scale;
  bounds.y /= scale;
  bounds.width /= scale;
  bounds.height /= scale;
  bounds.x -= translate.x;
  bounds.y -= translate.y;
  cloneCells.forEach(cell => {
    const geo = cell.getGeometry();
    if (geo !== null) {
      geo.translate(-bounds.x, -bounds.y);
    }
  });
  return {
    cells: cloneCells, bounds,
  }
}

export const importCellsOnAvailable = (graph, cells) => {
  const visibleGraph = graph.getGraphBounds();
  const newCells = graph.importCells(
    cells, visibleGraph.x + Math.random() * visibleGraph.width,
    visibleGraph.y + Math.random() * visibleGraph.height
  );
  graph.setSelectionCells(newCells);
}
