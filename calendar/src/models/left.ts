import { useState, useEffect } from 'react';
import { useModel } from 'umi';
import { useRequest } from 'ahooks';
import moment from 'moment';
import { getCollaborationList as getCollaborationListFn } from '@/services';
import { bizTypes, checkEitherTime, fixEndTime } from '@/utils';
import type {
  ICollaborationItemParams,
  ICollaborationItemResult,
} from '@/interface/IEvents';

export default () => {
  const { setEvents, changeTimeSucceed } = useModel('events');
  const [collaborationList, setCollaborationList] = useState<any>([]);
  const [collaborationTime, setCollaborationTime] = useState({
    startTime: moment().startOf('month').add(-7, 'days').format('YYYY-MM-DD 00:00:00'),
    endTime: moment().endOf('month').add(15, 'days').format('YYYY-MM-DD 00:00:00'),
  });

  const { run: getCollaborationList } = useRequest(
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
      setCollaborationList(formatRes);
      return formatRes;
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    // 来自多个数据源合并成 events 对象
    const otherSoures = [];
    setEvents([...collaborationList, ...otherSoures]);
  }, [collaborationList]);

  useEffect(() => {
    getCollaborationList();
  }, []);

  useEffect(() => {
    getCollaborationList();
  }, [collaborationTime]);

  useEffect(() => {
    // 修改时间成功时候
    if (changeTimeSucceed) {
      getCollaborationList();
    }
  }, [changeTimeSucceed]);

  return {
    collaborationTime,
    setCollaborationTime,
  };
};
