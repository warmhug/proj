import React, { useState, useEffect, useMemo } from 'react';
import { Popover, Typography } from 'antd';
import cls from 'classnames';
import styles from './index.less';

export default ({ evProps }: any) => {
  // console.log('ew', evProps);
  const { event, placement } = evProps;
  const [visible, setVisible] = useState(false);

  const { bizType, bizData, title } = event;
  const { statusType } = bizData || {};

  const content = (
    <div className={styles.evPopover}>
      <Typography.Title level={3}>{title}</Typography.Title>
    </div>
  );

  const rbcOverlay = document.querySelector('.rbc-overlay');
  const moreProp = rbcOverlay ? { getPopupContainer: () => rbcOverlay } : {};

  return (
    <Popover
      visible={visible}
      onVisibleChange={() => setVisible(!visible)}
      trigger={'click'}
      content={content}
      placement={placement || 'rightTop'}
      {...moreProp}
    >
      <div className={cls(styles.evtWrap, bizType, statusType)}>{evProps.children}</div>
    </Popover>
  );
};
