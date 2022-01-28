/* eslint max-len: 0, new-cap: 0 */
import { mx, createEditor, getCurrentXml, setCstyle, DEF_spacing, DEF_spacingLeft } from './common';
import debounce from 'lodash/debounce';
import { initCellAttr, initAttr } from './utils';
import { uploadFile } from '../../models/services';

const { mxEvent, mxUtils } = mx;

let editor;

const handleDrop = (graph, file, x, y) => {
  if (file.type.substring(0, 5) === 'image') {
    const reader = new FileReader();

    reader.onload = async (e) => {
      // Gets size of image for vertex
      let data = e.target.result;
      // SVG needs special handling to add viewbox if missing and
      // find initial size from SVG attributes (only for IE11)
      if (file.type.substring(0, 9) === 'image/svg') {
        const comma = data.indexOf(',');
        const svgText = atob(data.substring(comma + 1));
        const root = mxUtils.parseXml(svgText);
        // Parses SVG to find width and height
        if (root != null) {
          const svgs = root.getElementsByTagName('svg');
          if (svgs.length > 0) {
            const svgRoot = svgs[0];
            let w = parseFloat(svgRoot.getAttribute('width'));
            let h = parseFloat(svgRoot.getAttribute('height'));
            // Check if viewBox attribute already exists
            const vb = svgRoot.getAttribute('viewBox');
            if (!vb || !vb.length) {
              svgRoot.setAttribute('viewBox', `0 0 ${w} ${h}`);
              // svgRoot.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
            } else if (isNaN(w) || isNaN(h)) {
              const tokens = vb.split(' ');
              if (tokens.length > 3) {
                w = parseFloat(tokens[2]);
                h = parseFloat(tokens[3]);
              }
            }
            w = Math.max(1, Math.round(w));
            h = Math.max(1, Math.round(h));
            data = `data:image/svg+xml,${btoa(mxUtils.getXml(svgs[0], '\n'))}`;
            graph.insertVertex(null, null, '', x, y, w, h, `shape=image;image=${data};`);
            // graph.insertVertex(null, null, '', x, y, w, h, 'shape=image;image=' + data + ';');
          }
        }
      } else {
        const formData = new FormData();
        formData.append('fileItem', file);
        const result = await uploadFile({
          data: formData,
        });

        if (result.success) {
          const img = new Image();
          img.onload = () => {
            const w = Math.max(1, img.width);
            const h = Math.max(1, img.height);
            // Converts format of data url to cell style value for use in vertex
            // const semi = data.indexOf(';');
            // if (semi > 0) {
            //   data = data.substring(0, semi) + data.substring(data.indexOf(',', semi + 1));
            // }
            graph.insertVertex(null, null, '', x, y, w, h, `shape=image;image=${result.data};`);
          };
          img.src = result.data;
        }
      }
    };
    reader.readAsDataURL(file);
  }
};

const listenGraphModelChange = (graphDom, edt, callback) => {
  const { graph, _cleanXml } = edt;
  let curXml = _cleanXml;
  const graphChangeHandler = debounce(() => {
    const { parentNode } = graphDom;
    let scaleNum = parentNode.clientWidth / parentNode.scrollWidth;
    graph.zoomTo(scaleNum);
    scaleNum = scaleNum < 0.98 ? parseInt(scaleNum * 100, 10) : 100;
    const newXml = getCurrentXml(edt);
    if (newXml !== curXml) {
      callback({ fn: 'onGraphChange', res: { newXml, scaleNum } });
      curXml = newXml
    }
  }, 300)
  graph.model.addListener(mxEvent.CHANGE, graphChangeHandler);
  return () => {
    graph.model.removeListener(mxEvent.CHANGE, graphChangeHandler);
  }
}

const listenMouseChange = (graph, graphDom, callback) => {
  graph.addListener(mxEvent.DOUBLE_CLICK, (e, evt) => {
    const selSwl = evt.getProperty('cell');
    if (selSwl) {
      const cellStyle = graph.getCurrentCellStyle(selSwl)
      const bounds = graph.getCellBounds(selSwl)
      callback({ fn: 'setCellAttr', res: { cell: selSwl, cellStyle, bounds } })
    }
  })

  graph.addListener(mxEvent.CLICK, () => {
    // const cell = evt.getProperty('cell'); // cell may be null
    callback({ fn: 'setCellAttr', res: initCellAttr })
  });

  mxEvent.addListener(graphDom, 'dragover', (evt) => {
    if (graph.isEnabled()) {
      evt.stopPropagation();
      evt.preventDefault();
    }
  });

  mxEvent.addListener(graphDom, 'drop', (evt) => {
    if (graph.isEnabled()) {
      evt.stopPropagation();
      evt.preventDefault();
      // Gets drop location point for vertex
      const pt = mxUtils.convertPoint(graph.container, mxEvent.getClientX(evt), mxEvent.getClientY(evt));
      const tr = graph.view.translate;
      const { scale } = graph.view;
      const x = pt.x / scale - tr.x;
      const y = pt.y / scale - tr.y;
      // Converts local images to data urls
      const filesArray = evt.dataTransfer.files;
      for (let i = 0; i < filesArray.length; i++) {
        handleDrop(graph, filesArray[i], x + i * 10, y + i * 10);
      }
    }
  });
}

const initSelectionHandler = (graph, callback) => {
  const selectionModel = graph.getSelectionModel();
  const changeHandler = () => {
    const firstCell = selectionModel.cells[0];
    // console.log('fff', selectionModel);
    if (firstCell) {
      callback({
        fn: 'setAttrs',
        res: {
          visible: true,
          styles: graph.getCurrentCellStyle(firstCell),
          setImage: !firstCell.edge,
          backColor: !firstCell.edge,
          cellCount: selectionModel.cells.length,
        },
      })
    } else {
      callback({ fn: 'setAttrs', res: initAttr })
    }
  }
  selectionModel.addListener(mxEvent.CHANGE, changeHandler);
  return () => {
    selectionModel.removeListner(mxEvent.CHANGE, changeHandler);
  }
}

const defaultConfig = {
  gModelListen: true,
  enableMouseListener: true,
  enableSelection: true,
}

export const onInit = (graphDom, callback, _config = {}) => {
  const edt = createEditor(graphDom, true)
  const { graph } = edt;
  const { gModelListen, enableMouseListener, enableSelection } = { ...defaultConfig, ..._config };

  graph.cellEditor.blurEnabled = true;
  graph.addListener(mxEvent.EDITING_STARTED, () => {
    // 用 mxEvent 增删事件，在元素销毁时、会自动删除事件注册
    mxEvent.addListener(graph.cellEditor.textarea, 'keyup', () => {
      const rawCont = graph.cellEditor.textarea.innerText
      callback({ fn: 'setCellTxt', res: rawCont })
    });
    mxEvent.addListener(graph.cellEditor.textarea, 'blur', () => {
      callback({ fn: 'setCellAttr', res: initCellAttr })
    });
  });

  if (gModelListen) {
    listenGraphModelChange(graphDom, edt, callback);
  }
  if (enableMouseListener) {
    listenMouseChange(graph, graphDom, callback);
  }
  if (enableSelection) {
    initSelectionHandler(graph, callback);
  }

  editor = edt;
  return edt;
}

export const addVertexFn = (shape, { shortDescription, id, iconUrl }) => {
  const { graph, templates } = editor;
  let shapeType = shape;
  if (iconUrl) {
    shapeType = 'label';
  }
  const titleNode = graph.cloneCell(templates[shapeType]);
  const swl = graph.getSelectionCell()
  const num = Math.random() * 150;
  titleNode.value = shortDescription || '请输入';
  if (iconUrl) {
    graph.setCellStyles('image', iconUrl, [titleNode]);
    setCstyle('spacingLeft', DEF_spacingLeft, titleNode);
  }
  if (id) {
    titleNode._mid = id;
  }
  setCstyle('spacing', DEF_spacing, titleNode);
  if (!swl) {
    editor.addVertex(null, titleNode, num + 100, num + 100)
  } else {
    editor.addVertex(swl, titleNode, num, num)
  }
  graph.view.refresh()
}

export const updateCell = (cellData, callback = () => { }) => {
  const { graph } = editor
  const { id, img } = cellData
  let { cell, value } = cellData
  if (!cell || !value) {
    cell = graph.getSelectionCell()
    value = graph.getSelectionCell().value
  }
  if (id) {
    cell._mid = id
  }
  if (img) {
    graph.setCellStyles('image', img, [cell]);
  } else {
    graph.setCellStyles('image', '', [cell]);
  }
  !cell._tit && graph.setCellStyles('fontColor', '#000', [cell])
  graph.getModel().setValue(cell, value);
  graph.stopEditing(true);
  callback(graph.getCurrentCellStyle(cell))
}
