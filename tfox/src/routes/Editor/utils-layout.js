/* eslint-disable new-cap */
/* eslint-disable import/prefer-default-export */
import { mx } from './common';
import imgs from './assets/imgs';

const { mxMorphing, mxCellOverlay, mxEvent, mxImage } = mx;
const { layoutOverlay } = imgs;

export const layoutTypes = {
  horizontalTree: {
    name: '水平树', fn: 'mxCompactTreeLayout', param: undefined, attr: { edgeRouting: false, levelDistance: 30 },
  },
  verticalTree: {
    name: '垂直树', fn: 'mxCompactTreeLayout', param: false, attr: { edgeRouting: false, levelDistance: 30 },
  },
  // radialTree: {
  //   name: '径向树', fn: 'mxRadialTreeLayout', param: false, attr: { edgeRouting: false, levelDistance: 30 },
  // },
  verticalFlow: {
    name: '垂直流', fn: 'mxHierarchicalLayout', param: 'north',
  },
  horizontalFlow: {
    name: '水平流', fn: 'mxHierarchicalLayout', param: 'west',
  },
  organic: {
    name: '力导向布局图', fn: 'mxFastOrganicLayout', param: false, attr: { forceConstant: 80 },
  },
  circle: {
    name: '圆形', fn: 'mxCircleLayout', param: undefined,
  },
}

export const layoutFactory = (layoutType, graph) => {
  const { fn, param, attr = {} } = layoutTypes[layoutType]
  const layout = new mx[fn](graph, param);
  Object.keys(attr).forEach(at => { layout[at] = attr[at] });
  return layout;
}

const executeLayoutWithAnimation = (graph, layout, rootCell, exec, post) => {
  graph.getModel().beginUpdate();
  try {
    exec && exec();
    layout.execute(graph.getDefaultParent(), rootCell);
  } catch (e) {
    throw e;
  } finally {
    const morph = new mxMorphing(graph);
    morph.addListener(mxEvent.DONE, () => {
      graph.getModel().endUpdate();
      if (post != null) {
        post();
      }
    });
    morph.startAnimation();
  }
};

export const overlayFn = (graph, layoutType = 'horizontalTree') => {
  const addOverlay = cell => {
    const overlay = new mxCellOverlay(new mxImage(layoutOverlay, 26, 26), 'Add outgoing');
    overlay.cursor = 'hand';
    overlay.addListener(mxEvent.CLICK, () => {
      graph.connectionHandler.reset();
      graph.clearSelection();
      const geo = graph.getCellGeometry(cell);
      let v2;
      executeLayoutWithAnimation(graph, layout, root, () => {
        v2 = graph.insertVertex(parent, null, '输入', geo.x, geo.y, 80, 30, 'rounded=1;');
        addOverlay(v2);
        graph.view.refresh(v2);
        graph.insertEdge(parent, null, '', cell, v2, edgeStyle);
      }, () => {
        graph.scrollCellToVisible(v2);
      });
    });
    graph.addCellOverlay(cell, overlay);
  }
  const parent = graph.getDefaultParent();
  graph.getModel().beginUpdate();
  let root;
  try {
    root = graph.insertVertex(parent, null, '开始', 0, 0, 80, 30, 'shape=ellipse;');
    addOverlay(root);
  } finally {
    // Updates the display
    graph.getModel().endUpdate();
  }
  const layout = layoutFactory(layoutType, graph);
  let edgeStyle = 'curved=1;';
  if (layoutType === 'horizontalTree') {
    edgeStyle = 'edgeStyle=elbowEdgeStyle;elbow=horizontal;';
  } else if (layoutType === 'verticalTree') {
    edgeStyle = 'edgeStyle=elbowEdgeStyle;elbow=vertical;';
  }
}

export const exportLayoutCells = graph => {
  graph.clearCellOverlays();
  const cells = graph.getModel().getChildren(graph.getDefaultParent());
  return cells;
}
