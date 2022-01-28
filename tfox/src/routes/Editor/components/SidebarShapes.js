/* eslint max-len: 0, object-property-newline: 0, new-cap: 0 */
import React, { useEffect, useRef } from 'react';
import { mx, setCstyle, DEF_spacing } from '../common';
import imgs from '../assets/imgs';

export default ({ editor, selectShape }) => {
  const toolbarRef = useRef(null);

  useEffect(() => {
    if (!editor) {
      return;
    }
    const { mxDefaultToolbar, mxEvent } = mx;
    const { templates } = editor;
    const toolbar = new mxDefaultToolbar(toolbarRef.current, editor);

    toolbar.toolbar.defaultMode = document.createElement('div')
    toolbar.toolbar.defaultFunction = () => {}
    toolbar.toolbar.addListener(mxEvent.SELECT, (e) => {
      if (e.selectedMode) {
        selectShape(e.selectedMode.title)
      }
    })
    const shapes = ['rectangle', 'container1', 'text', 'image', 'ellipse', 'triangle', 'rhombus', 'hline', 'arrow']

    shapes.forEach(item => {
      const newCell = editor.graph.cloneCell(templates[item])
      if (!['text', 'image', 'hline', 'arrow'].includes(item)) {
        setCstyle('spacing', DEF_spacing, newCell);
        // setCstyle('spacingLeft', DEF_spacingLeft, newCell);
      }
      setCstyle('rotatable', 1, newCell);
      item === 'arrow' ? toolbar.addPrototype(item, imgs[item], newCell, null, (edt, fCell, evt) => {
        edt.graph.importCells([fCell], evt.layerX, evt.layerY);
      }) : toolbar.addPrototype(item, imgs[item], newCell)
    });
  }, [editor, selectShape]);

  return (
    <div ref={toolbarRef} className="sidebar-shapes" />
  );
};

// SidebarShapes.propTypes = {
//   editor: PropTypes.objectOf(PropTypes.any),
//   selectShape: PropTypes.func,
// };

