import { useState } from 'react';
import { message } from 'antd';
import moment from 'moment';
import { diffTime, fixEndTime } from '@/utils';
import { DRAFT_EVENT } from '@/constants';
import type { IEventItem, IcalendarRange } from '@/interface/IEvents';

const defaultRange = {
  startTime: moment().startOf('month').add(-7, 'days').format('YYYY-MM-DD 00:00:00'),
  endTime: moment().endOf('month').add(15, 'days').format('YYYY-MM-DD 00:00:00'),
};

export default () => {
  // 日历统一数据源
  const [events, setEvents] = useState<IEventItem[]>([]);
  // 点击或多选日历单元格、生成的数据
  const [draftEvent, setDraftEvent] = useState<IEventItem | null>();
  // 日历起止时间
  const [calendarRange, setCalendarRange] = useState<IcalendarRange | null>();
  const [changeTimeSucceed, setChangeTimeSucceed] = useState(0);

  const createDraftEvent = (slotData: {
    start: Date;
    end: Date;
    allDay: boolean;
    action: string;
  }) => {
    // console.log('slot', slotData);
    const { start, end, allDay } = slotData;
    Object.defineProperties(start, {
      _isCustom: {
        get: function () {
          return true;
        },
      },
    });
    const draftEventNew: IEventItem = {
      id: DRAFT_EVENT + Date.now(),
      eventType: DRAFT_EVENT,
      title: '(无标题)',
      start,
      end,
      _end: end ? fixEndTime(end, -1) : undefined,
      allDay: allDay || false,
      // draggable: false,
      // resizeable: false,
      // canDelete: false,
      // interaction: false,
    };

    setDraftEvent(draftEventNew);
  };

  const editCollaboration = async (params: any) => {
    return true;
  };

  const changeTime = async (event: any, restProps: any) => {
    const preEvts = events.map((existingEvent) => ({ ...existingEvent }));
    setEvents(
      events.map((existingEvent) => {
        return existingEvent.id == event.id ? { ...existingEvent, ...restProps } : existingEvent;
      }),
    );

    const { type, id, projectId } = event?.bizData || {};
    const changeProps = diffTime(restProps, event);
    // console.log('ev', ev, changeProps);
    const editRes = [];
    for (let index = 0; index < changeProps.length; index++) {
      const ele = changeProps[index];
      const propName = `${ele}Time`;
      let submitTime = restProps[ele];
      if (ele === 'end') {
        submitTime = fixEndTime(submitTime, -1);
      }
      const res = await editCollaboration({
        changeProperty: propName,
        [propName]: submitTime ? moment(submitTime).format('YYYY-MM-DD HH:mm:ss') : null,
        businessProjectId: projectId,
        itemId: id,
        type,
      });
      editRes.push(res);
    }

    if (editRes.length === 2 && editRes.filter((ii) => !ii).length === 1) {
      // 开始或结束时间、其中一个修改失败，提示刷新页面
      message.error('部分修改成功，请刷新页面');
      setEvents(preEvts);
    } else if (editRes.includes(false)) {
      setEvents(preEvts);
    } else {
      setChangeTimeSucceed(changeTimeSucceed + 1);
    }
    return editRes;
  };

  const resizeEvent = async (ev: any) => {
    const { event, start, end } = ev;
    await changeTime(event, { start, end });
  };

  const moveEvent = async (ev: any) => {
    const { event, start, end, isAllDay: droppedOnAllDaySlot } = ev;
    let allDay = event.allDay;
    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }
    await changeTime(event, { start, end, allDay });
  };

  return {
    calendarRange,
    setCalendarRange,
    events,
    setEvents,
    draftEvent,
    setDraftEvent,
    createDraftEvent,
    resizeEvent,
    moveEvent,
    changeTimeSucceed,
  };
};
