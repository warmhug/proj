import React from 'react';
import { Pagination } from 'antd';

export default (
  { pageIndex, pageSize, total, pageShowCount = 5, getTableList }
) => {
  return (
    total > 10 ?
      <Pagination
        hideOnSinglePage
        current={pageIndex}
        pageSize={pageSize}
        showSizeChanger={false}
        total={total}
        defaultPageSize={pageShowCount}
        onChange={(val) => getTableList({ pageIndex: val })}
      /> : null
  )
}

// Pager.propTypes = {
//   pageIndex: PropTypes.number,
//   pageSize: PropTypes.number,
//   total: PropTypes.number,
//   pageShowCount: PropTypes.number,
//   getTableList: PropTypes.func,
// }

