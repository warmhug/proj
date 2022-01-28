/**
 * common.js 里的 templates
*/
const imgs = {
  cylinder: 'data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBmAABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNmZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZmzGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZAJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+ZzP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANgALAAAAAAQABAAAAhDALEJHEiwoMF/CBMaFIjw4L+CCiE2HPgQW8KIFRkupEgw40KPHg923KiRI0mQJC2OtHixIsiJHWEyDMlyY0uaKQsGBAA7',
  hexagon: 'data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBmAABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNmZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZmzGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZAJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+ZzP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANgALAAAAAAQABAAQAg0ALEJHEiwoEAABg0iHLhQYcKHECMelIitYcWHFilqjAigo8eODiEuzChyYsmCHz9uXJkwIAA7',
  note: 'https://img.alicdn.com/tfs/TB1bfUcjDM11u4jSZPxXXahcXXa-500-620.jpg',
  noteLabel: 'https://img.alicdn.com/tfs/TB1KnncTXT7gK0jSZFpXXaTkpXa-499-419.jpg',
}
const vertexObj = {
  cylinder: new mxCell(
    'Shape',
    new mxGeometry(0, 0, 60, 60),
    'shape=cylinder;spacingTop=10;strokeColor=#4096EE;fillColor=#4096EE;'
  ),
  hexagon: new mxCell(
    'Shape',
    new mxGeometry(0, 0, 60, 60),
    'shape=hexagon;'
  ),
  note: new mxCell(
    '注释',
    new mxGeometry(0, 0, 40, 40),
    `shape=image;perimeter=rectanglePerimeter;fontSize=10,align=center;verticalAlign=middle;image=${noteIcon};`
  ),
  noteLabel: new mxCell(
    '注释说明',
    new mxGeometry(0, 0, 100, 150),
    'shape=rectangle;perimeter=rectanglePerimeter;fontSize=12;align=left;verticalAlign=top;strokeColor=none;fillColor=#ff0;gradientColor=none;'
  ),
}

/**
异步方式布局
*/
const layoutDFS = async (graph, arr) => {
  const run = (cell) => {
    return new Promise((resolve) => {
      layoutExec(graph, cell)
      // window.setTimeout(resolve, 4000);
      window.requestAnimationFrame(resolve);
    });
  }
  for (const cell of arr) {
    if (!graph.isSwimlane(cell)) {
      break;
    }
    const ic = graph.getChildCells(cell)
    if (ic && ic.length) {
      await layoutDFS(graph, ic)
    }
    await run(cell);
  }
}

/**
导出文件 （框架自带）
*/
export const exportFile = (editor, format) => {
  const { graph, urlImage } = editor
  const { scale } = graph.view;
  const bounds = graph.getGraphBounds();
  const ns = ele => ele.createElementNS != null;

  const xmlDoc = mxUtils.createXmlDocument();
  const imgExport = new mxImageExport();
  let params = '';
  let root
  let canvas;

  if (format === 'png') {
    root = xmlDoc.createElement('output');
    xmlDoc.appendChild(root);
    canvas = new mxXmlCanvas2D(root);

    const w = Math.ceil(bounds.width * scale + 2);
    const h = Math.ceil(bounds.height * scale + 2);

    if (w > 0 && h > 0) {
      params = `&bg=#FFFFFF&w=${w}&h=${h}`;
    }
  }

  if (format === 'svg') {
    root = ns(xmlDoc) ?
      xmlDoc.createElementNS(mxConstants.NS_SVG, 'svg') : xmlDoc.createElement('svg');
    ns(xmlDoc) && root.setAttribute('xmlns', mxConstants.NS_SVG);
    if (root.style != null) {
      root.style.backgroundColor = '#FFFFFF';
    } else {
      root.setAttribute('style', 'background-color:#FFFFFF');
    }
    root.setAttribute('width', `${Math.ceil(bounds.width * scale + 2)}px`);
    root.setAttribute('height', `${Math.ceil(bounds.height * scale + 2)}px`);
    root.setAttribute('xmlns:xlink', mxConstants.NS_XLINK);
    root.setAttribute('version', '1.1');
    const group = ns(xmlDoc) ?
      xmlDoc.createElementNS(mxConstants.NS_SVG, 'g') : xmlDoc.createElement('g');
    group.setAttribute('transform', 'translate(0.5,0.5)');
    root.appendChild(group);
    xmlDoc.appendChild(root);
    canvas = new mxSvgCanvas2D(group);
  }

  canvas.translate(Math.floor(1 / scale - bounds.x), Math.floor(1 / scale - bounds.y));
  canvas.scale(scale);
  imgExport.drawState(graph.getView().getState(graph.model.root), canvas);

  const xml = encodeURIComponent(mxUtils.getXml(root));
  const req = new mxXmlRequest(urlImage, `filename=export.${format}&format=${format}${params}&xml=${xml}`);
  // req.simulate(document, "_blank");
  req.send((req) => {
    mxUtils.alert(req.getDocumentElement());
  }, (req) => {
    mxUtils.alert('Error');
  });
}

/**
节点 mousemove 高亮 border 等操作 （框架自带）
*/
const marker = new mxCellTracker(graph, '#f60')
graph.addMouseListener({
  mouseDown: function() {},
  mouseMove: function(sender, me) {
    marker.process(me);
  },
  mouseUp:function(sender, me) {
    marker.process(me);
  },
});

/**
鼠标 hover 提示进入的区域 （自己实现、基础版）
*/
const updateStyle = (state, hover) => {
  if (state.style) {
    state.style.strokeWidth = (hover) ? '3' : '1';
    const hoverColor = [10].includes(state.cell._pos) ? strokeColor : '#f60'
    const normalColor = [3].includes(state.cell._pos) ? '#181818' : strokeColor
    state.style.strokeColor = hover ? hoverColor : normalColor
  }
  if (state.shape) {
    state.shape.apply(state);
    state.shape.redraw();
  }
  if (state.text) {
    state.text.apply(state);
    state.text.redraw();
  }
}
const mouseInCell = (state, evt) => {
  let inCell = true
  const { x, y, width, height } = state
  const { graphX, graphY } = evt
  if (graphX < x || graphX > width || graphY < y || graphY > height) {
    inCell = false
  }
  return inCell
}
let currentState;
const mouseMove = (sender, evt) => {
  marker.process(evt);
  if (currentState) {
    if (!evt.getState() && !mouseInCell(currentState, evt)) {
      updateStyle(currentState, false);
      return
    }
    if (evt.getState() === currentState) {
      updateStyle(currentState, true);
      return
    }
  }
  const tmp = graph.view.getState(evt.getCell());
  if (tmp !== currentState && evt.getState() && graph.isSwimlane(evt.getState().cell)) {
    if (currentState) {
      updateStyle(currentState, false);
      currentState = null
    }
    currentState = tmp;
    if (currentState) {
      updateStyle(currentState, true);
    }
  }
}
// mouse move 时更新次数太多
graph.addMouseListener({
  mouseUp: () => {},
  mouseDown: () => {},
  mouseMove,
})

/**
 * 初始化
 */
// mxObjectCodec.allowEval = true;
// new mxEditor(mxUtils.parseXml(configXml).documentElement);
// mxObjectCodec.allowEval = false;

// hack 掉 4.1 版本里 structureOnly 未定义错误
// const oldfn = mxGraph.prototype.getSelectionCellsForChanges
// mxGraph.prototype.getSelectionCellsForChanges = (changes, ignoreFn) => {
//   try { oldfn(changes, ignoreFn) } catch (error) {}
// }

const root = new mxCell(createNode('Diagram', { label: 'My Diagram', href: 'http://www.jgraph.com/' }))
const layer0 = root.insert(new mxCell());
const layer1 = root.insert(new mxCell());
