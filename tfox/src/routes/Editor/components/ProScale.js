import React, { useState, useEffect, useContext } from 'react';
import { Dropdown } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import { EditorContext, onSysAction } from '../common';
import './ProScale.less';

export default (props) => {
  const { scaleNum: sNum } = props;
  const editor = useContext(EditorContext);
  const [scaleNum, setScaleNum] = useState(sNum);

  const scaleView = (arg) => {
    if (typeof arg === 'string') {
      onSysAction(editor, arg, null, (sc) => setScaleNum(parseInt(sc * 100, 10)));
    } else {
      editor.graph.view.setScale(arg / 100);
      setScaleNum(arg);
    }
  };

  useEffect(() => {
    setScaleNum(scaleNum);
  }, [scaleNum]);

  return (
    <Dropdown
      trigger="click"
      overlay={
        <div className="scale">
          <div
            className="scale-item"
            // onClick={e => {e.preventDefault(); scaleView('zoomIn');}}
            onClick={() => scaleView('zoomIn')}
          >
            <b className="icon-sprite icon-sprite-zoomin" />
            <span className="des">放大</span>
          </div>
          <div className="scale-item" onClick={() => scaleView('zoomOut')}>
            <b className="icon-sprite icon-sprite-zoomout" />
            <span className="des">缩小</span>
          </div>
          <div className="scale-item divider" onClick={() => scaleView('actualSize')}>
            {/* <b className="icon-sprite icon-sprite-actualsize" /> */}
            <span className="des">实际大小</span>
          </div>
          {[25, 50, 75, 100].map((vv) => (
            <div key={vv} className="scale-item" onClick={() => scaleView(vv)}>
              <div className="num">{vv}%</div>
            </div>
          ))}
        </div>
      }
      placement="bottomCenter"
      getPopupContainer={(node) => node.parentNode}
    >
      <div className="toolbar-icon">
        {scaleNum}%
        <CaretDownFilled className="toolbar-icon-right" />
      </div>
    </Dropdown>
  )
}

// ProScale.propTypes = {
//   scaleNum: PropTypes.number,
// }

