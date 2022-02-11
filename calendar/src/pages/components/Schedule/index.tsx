import React, { useEffect, useState } from 'react';
import styles from './index.less';

export default (props: any) => {
  // console.log(props);
  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.title}>安排日程</div>
    </div>
  );
};
