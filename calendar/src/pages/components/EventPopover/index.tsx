import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Typography } from 'antd';
import styles from './index.less';

export default (props: any) => {
  const { event } = props;
  const { title, bizData } = event || {};
  const popoverRef = useRef(null);

  const content = (
    <div className={styles.root} ref={popoverRef}>
      <Typography.Title level={3}>{title}</Typography.Title>
      <div>
        正文
        <br/>
        b-start: {bizData?.startTime}
        <br/>
        b-end: {bizData?.endTime}
      </div>
    </div>
  );

  return (
    content
  );
};
