import React, { useEffect, useState, useMemo } from 'react';
import { Collapse, Checkbox, message } from 'antd';
import { useRequest } from 'ahooks';
import classnames from 'classnames';
import styles from './index.less';
import { CalendarTypesEnum } from '@/constants';
import { getGroupMembers as getGroupMembersFn } from '@/services';
const { Panel } = Collapse;

export default (props: any) => {
  const [leftFilter, setLeftFilter] = useState<any>({
    active: CalendarTypesEnum.MY_CALENDAR,
  });
  const { active } = leftFilter;

  const { data: groupMembers, run: getGroupMembers } = useRequest(
    async () => {
      const res = await getGroupMembersFn();
      if (!res?.success) {
        message.error(res?.message || '获取失败');
      }
      const groupMemberParam = { groupMemberId: String(res?.data?.[0]?.id || '') };
      return res?.data;
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (active === CalendarTypesEnum.My_TEAM_CALENDAR) {
      getGroupMembers();
    }
  }, [active, leftFilter[active]?.groupMemberId]);

  return (
    <div className={styles.root}>
      <Collapse
        className={styles.collapse}
        defaultActiveKey={active}
        accordion
        ghost
        onChange={(key) => {
          // console.log(key, active);
          setLeftFilter({
            ...leftFilter,
            active: key || active,
          });
        }}
      >
        <Panel
          header="我的日历"
          key={CalendarTypesEnum.MY_CALENDAR}
        >
          <Checkbox
            className={styles.myMeeting}
            onChange={(e) => {
              console.log(`checked = ${e.target.checked}`);
            }}
          >
            我的会议
          </Checkbox>
          <br/>
          <Checkbox
            className={styles.todo}
          >
            我的待办
          </Checkbox>
        </Panel>
        <Panel
          className={classnames(styles.myTeamCalendar, {
            [styles.collapseChecked]: active === CalendarTypesEnum.My_TEAM_CALENDAR,
          })}
          header="我团队的日历"
          key={CalendarTypesEnum.My_TEAM_CALENDAR}
        >
          全部项目成员：
          <div>
            {JSON.stringify(groupMembers)}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};
