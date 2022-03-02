import React, { useEffect } from 'react';
import { Tag, Popover } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';
import styles from './index.less';

export default (props: any) => {
  const { label, date } = props;
  const { needSignInList } = useModel('left');

  // console.log('needSignInList', needSignInList, props);
  let showEle = false;
  if (needSignInList?.length) {
    needSignInList.forEach((item: any) => {
      const isSameDay = moment(item.date).isSame(date, 'day');
      if (isSameDay) {
        showEle = true;
      }
    });
  }

  const popContent = (
    <div className={styles.popOver}>
      <h3>未签到</h3>
      <div className={styles.popOverItem}>
        <span className={styles.popOverLabel}>签到或补签：</span>
        <span>打开钉钉扫码</span>
      </div>
      <div className={styles.popOverItem}>
        <img
          src="https://img.alicdn.com/imgextra/i1/O1CN01bj7drt1b0cYRMKMCS_!!6000000003403-2-tps-500-490.png"
          alt="打开钉钉扫码"
        />
      </div>
      <div className={styles.popOverItem}>
        <span className={styles.popOverLabel}>特殊考勤请点击这里：</span>
        <a href="#">出勤申请</a>
      </div>
    </div>
  );

  return (
    <div className={styles.root}>
      <a role="cell">{label}</a>
      {showEle ? (
        <Popover trigger={'hover'} placement="right" content={popContent}>
          <Tag className={styles.noSign} color="#ff6900">
            未签到
          </Tag>
        </Popover>
      ) : null}
    </div>
  );
};
