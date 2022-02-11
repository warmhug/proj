import React, { useEffect } from 'react';
import CalendarBig from './components/CalendarBig';
import CalendarSmall from './components/CalendarSmall';
import MyAndMyTeam from './components/MyAndMyTeam';
import Schedule from './components/Schedule';
import styles from './index.less';

export default (props: any) => {
  return (
    <div className={styles.root}>
      <div className={styles.panelLeft}>
        <CalendarSmall />
        <MyAndMyTeam />
      </div>
      <div className={styles.container}>
        <CalendarBig />
      </div>
      <div className={styles.panelRight}>
        <Schedule />
      </div>
    </div>
  );
};
