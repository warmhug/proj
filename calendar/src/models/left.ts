import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useModel } from 'umi';
import { useRequest } from 'ahooks';
import moment from 'moment';
import {
  getCollaborationList as getCollaborationListFn,
  getNeedSignInList as getNeedSignInListFn,
} from '@/services';
import { bizTypes, checkEitherTime, fixEndTime } from '@/utils';
import type {
  ICollaborationItemParams,
  ICollaborationItemResult,
} from '@/interface/IEvents';

export default () => {
  const { calendarRange, events, setEvents, changeTimeSucceed } = useModel('events');
  const [filterModel, setFilterModel] = useState<any>({
    collapseKeys: ['myCalendar'],
    active: 'myCalendar',
    calendarEventChecked: true,
  });

  const { run: getCollaborationList, data: collaborationList } = useRequest(
    async (params: ICollaborationItemParams) => {
      const res = await getCollaborationListFn(params);
      const formatRes = (res.data || []).map((item: ICollaborationItemResult, index: number) => {
        let timeDatas = checkEitherTime(item?.startTime, item?.endTime);
        if (timeDatas?.end) {
          timeDatas.end = fixEndTime(timeDatas?.end);
        }
        return {
          id: item.id,
          title: item.name,
          allDay: false,
          ...timeDatas,
          bizType: bizTypes[index],
          bizData: item,
        };
      });
      return formatRes;
    },
    {
      manual: true,
    },
  );

  const {
    run: getNeedSignInList,
    data: needSignInList,
    loading: needSignInListLoading,
  } = useRequest(
    async (params: any) => {
      const res = await getNeedSignInListFn(params);
      if (!res?.success) {
        message.error(res?.message || '未签到数据获取失败');
        return [];
      }
      // console.log('needSignInList', res?.data);
      return res?.data || [];
    },
    { manual: true },
  );

  useEffect(() => {
    if (calendarRange) {
      // console.log('calendarRange', calendarRange);
      getNeedSignInList(calendarRange);
    }
  }, [calendarRange]);

  useEffect(() => {
    if (needSignInList) {
      // console.log('calendarRange', calendarRange);
      setEvents(events);
    }
  }, [needSignInList]);

  useEffect(() => {
    // 来自多个数据源合并成 events 对象
    const otherSoures = [] as ICollaborationItemResult[];
    setEvents([...(collaborationList || []), ...otherSoures]);
  }, [collaborationList]);

  useEffect(() => {
    if (calendarRange) {
      getCollaborationList(calendarRange);
    }
  }, [calendarRange]);

  useEffect(() => {
    // 修改时间成功时候
    if (calendarRange && changeTimeSucceed) {
      getCollaborationList(calendarRange);
    }
  }, [calendarRange, changeTimeSucceed]);

  return {
    filterModel,
    setFilterModel,
    needSignInList,
  };
};
