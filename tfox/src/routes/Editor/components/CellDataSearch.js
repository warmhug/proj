import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';
import { Menu, Dropdown } from 'antd';
import { NAMESPACE } from '../../../models/editor';
import './CellDataSearch.less';

export default ({ cellAttr, updateCell, cellTxt }) => {
  const dispatch = useDispatch();
  const { searchList } = useSelector((state) => state[NAMESPACE]);
  const { cell, cellStyle, bounds } = cellAttr;

  useEffect(() => {
    if (cellTxt) {
      dispatch({
        type: `${NAMESPACE}/searchList`,
        payload: { name: cellTxt },
      })
    }
  }, [dispatch, cellTxt])

  const by = cell._pos === 3 ? 33 : bounds.height + 3;
  const style = {
    position: 'absolute',
    left: bounds.x + bounds.width / 2 - 150 || 0,
    top: bounds.y + by || 0,
  };

  const content = (
    <div style={style}>
      <Dropdown
        trigger="click"
        visible={!(!cell.value && !cellStyle.image)}
        align={{ overflow: { adjustX: 1, adjustY: 0 } }}
        overlay={
          <Menu className="cell-data-search">
            {searchList.length ? (
              searchList.map(({ id, label, iconUrl, shortDescription }) => (
                <Menu.Item
                  key={id}
                  value={id}
                  onClick={() => updateCell({
                    id, value: shortDescription, cell, img: cell._pos === 3 ? undefined : iconUrl,
                  })}
                >
                  {iconUrl ? <img src={iconUrl} /> : null}
                  {label}
                </Menu.Item>
              ))
            ) : (
              <Menu.Item value="">{cell.value || '暂无数据'}</Menu.Item>
            )}
          </Menu>
        }
      >
        <span />
      </Dropdown>
    </div>
  );

  return cell.value || cellStyle.image ? content : '';
};

// CellDataSearch.propTypes = {
//   cellAttr: PropTypes.objectOf(PropTypes.any),
//   updateCell: PropTypes.func,
//   cellTxt: PropTypes.string,
// };

