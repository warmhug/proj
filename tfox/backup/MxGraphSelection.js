/* eslint max-len: 0 */
import React, { useEffect, useState, useMemo, useRef } from 'react';

const INIT_SELECTION_POINT = { x: -1, y: -1 };
const DEFAULT_STYLE = {
  position: 'absolute',
  backgroundColor: 'rgba(0, 0, 222, 0.3)',
  width: 0,
  height: 0,
}
const isInitSelectionPoint = point => {
  return point.x === INIT_SELECTION_POINT.x && point.y === INIT_SELECTION_POINT.y;
}

// MxGraphSelection.propTypes = {
//   mxGraphView: PropTypes.shape({
//     addMouseListener: PropTypes.func,
//     removeMouseListener: PropTypes.func,
//   }),
//   onSelect: PropTypes.func,
// };

export default ({ mxGraphView, onSelect }) => {
  const [selectionStartPoint, setSelectionStartPoint] = useState(INIT_SELECTION_POINT);
  const [selectionEndPoint, setSelectionEndPoint] = useState(INIT_SELECTION_POINT);
  const selection = useRef({ stX: INIT_SELECTION_POINT.x, stY: INIT_SELECTION_POINT.y, edX: INIT_SELECTION_POINT.x, edY: INIT_SELECTION_POINT.y });
  const mouseDownRef = useRef(false);
  const style = useMemo(() => {
    if (isInitSelectionPoint(selectionStartPoint) || isInitSelectionPoint(selectionEndPoint)) {
      return DEFAULT_STYLE;
    }
    const offsetX = selectionEndPoint.x - selectionStartPoint.x;
    const offsetY = selectionEndPoint.y - selectionStartPoint.y;
    const left = offsetX >= 0 ? selectionStartPoint.x : selectionEndPoint.x;
    const top = offsetY >= 0 ? selectionStartPoint.y : selectionEndPoint.y;
    const width = Math.abs(offsetX);
    const height = Math.abs(offsetY);
    return {
      ...DEFAULT_STYLE, left, top, width, height,
    }
  }, [selectionStartPoint, selectionEndPoint]);
  useEffect(() => {
    selection.current = {
      x: style.left, y: style.top, width: style.width, height: style.height,
    }
  }, [style]);
  useEffect(() => {
    const listeners = {
      mouseDown: (sender, { state, graphX, graphY }) => {
        mouseDownRef.current = true;
        if (!state) {
          setSelectionStartPoint({ x: graphX, y: graphY });
        }
      },
      mouseMove: (sender, { graphX, graphY }) => {
        if (mouseDownRef.current) {
          setSelectionEndPoint({ x: graphX, y: graphY });
        }
      },
      mouseUp: () => {
        mouseDownRef.current = false;
        if (onSelect) {
          onSelect(selection.current);
        }
        setSelectionEndPoint(INIT_SELECTION_POINT);
        setSelectionStartPoint(INIT_SELECTION_POINT);
      },
    }
    mxGraphView.addMouseListener(listeners);
    return () => {
      mxGraphView.removeMouseListener(listeners);
    }
  }, []);

  return (
    <div className="graph-selection" style={style} />
  )
}
