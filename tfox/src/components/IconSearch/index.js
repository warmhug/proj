import React, { useEffect, useState } from 'react';
import { Dropdown } from 'antd';
import './index.less';

export default (props) => {
  const { iconData, onSel, children } = props;
  const [iconVisible, setIconVisible] = useState(false);

  useEffect(() => {
    if (iconData.records && iconData.records.length) {
      setIconVisible(true);
    }
  }, [iconData.records]);

  const sel = (v) => {
    onSel(v);
    setIconVisible(false);
  }

  return (
    <Dropdown
      trigger="click"
      onVisibleChange={() => setIconVisible(!iconVisible)}
      visible={iconVisible}
      overlay={iconData.records ? (
        <div className="icons">
          {iconData.records.map(v => (
            <div
              key={v.id}
              className="icons-item"
              onClick={() => sel(v)}
            >
              {v.url && <img src={v.url} />}
              <div className="img-tit" title={v.name}>{v.name}</div>
            </div>
          ))}
        </div>
      ) : ''}
    >
      {children}
    </Dropdown>
  )
}

// IconSearch.propTypes = {
//   iconData: PropTypes.objectOf(PropTypes.any),
//   children: PropTypes.objectOf(PropTypes.any),
//   onSel: PropTypes.func,
// }

