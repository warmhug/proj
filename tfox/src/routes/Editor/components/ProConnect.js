import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import imgs from '../assets/imgs';
import './ProConnect.less';

const { connect, connectArrow } = imgs;

export default ({ setConnStyle = () => {} }) => {
  const [edgeType, setEdgeType] = useState(connect);

  const setEdge = (item, idx) => {
    setEdgeType(item);
    setConnStyle(idx);
  }

  return (
    <Dropdown
      trigger="click"
      overlay={
        <div className="conns">
          {[connect, connectArrow].map((item, idx) => (
            <div
              key={idx.toString()}
              className="conns-item"
              onClick={() => setEdge(item, idx)}
            >
              <img src={item} />
            </div>
          ))}
        </div>
      }
      placement="bottomCenter"
    >
      <div className="toolbar-icon">
        <img src={edgeType} />
        <CaretDownFilled className="toolbar-icon-right" />
      </div>
    </Dropdown>
  )
}

// ProConnect.propTypes = {
//   setConnStyle: PropTypes.func,
// }

