import React, { useState, useEffect, useRef } from 'react';
import { Button, Dropdown } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import moment from 'moment';
import cls from 'classnames';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import EventPopover from '../EventPopover';
import CalendarPopover from './CalendarPopover';
import CalendarPopoverFixed from './CalendarPopoverFixed';
import momentLocalizer1 from './moment-localizer';
import { bizTypes } from '@/utils';
import { DRAFT_EVENT } from '@/constants';
import type { IEventItem } from '@/interface/IEvents';
import styles from './index.less';

// const localizer = momentLocalizer(moment);
const localizer = momentLocalizer1(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

export default () => {
  const { events, resizeEvent, moveEvent, draftEvent, setDraftEvent, createDraftEvent } = useModel(
    'events',
  );
  const { setCollaborationTime } = useModel('left');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const viewRef = React.useRef<string>(Views.MONTH);
  const [selectedEvent, setSelectedEvent] = useState<null | IEventItem>(null);

  const disableDragOrResize = (evt: any) => {
    if (evt?.bizType === bizTypes[1]) {
      return false;
    }
    return true;
  };

  const getCreateCardMiniNode = React.useCallback((): HTMLDivElement | null => {
    let selectEventTarget: HTMLDivElement | null = null;
    selectEventTarget = document.querySelector(`.${DRAFT_EVENT}`) as HTMLDivElement;
    return selectEventTarget;
  }, []);

  const getEventCardNode = React.useCallback((): HTMLDivElement | null => {
    let selectEventTarget: HTMLDivElement | null = null;
    selectEventTarget = document.querySelector('.rbc-selected') as HTMLDivElement;
    return selectEventTarget;
  }, []);

  const newBtns = (
    <div className={styles.newBtnWrap}>
      <Button
        className={styles.newBtn}
        block
        onClick={() => {

        }}
      >
        新建项目任务
      </Button>
      <Button
        className={styles.newBtn}
        block
        onClick={() => {
        }}
      >
        新建待办
      </Button>
    </div>
  );

  // console.log('events', events);
  return (
    <div className={styles.root} ref={containerRef}>
      <Dropdown overlay={newBtns} getPopupContainer={(ele) => ele.parentElement}>
        <Button type="primary" className={styles.newBtnTrigger}>
          新建
        </Button>
      </Dropdown>
      <DragAndDropCalendar
        views={[Views.MONTH, Views.WEEK]}
        localizer={localizer}
        events={draftEvent ? [...events, draftEvent] : events}
        defaultDate={new Date('2022-01-03T09:58:55.000+0000')}
        formats={{
          // dayFormat: (date, culture, localizer) => localizer.format(date, 'DDD', culture),
          monthHeaderFormat: (date: Date, culture: any, locer: any) =>
            locer.format(date, 'YYYY年M月', culture),
        }}
        messages={{
          today: <div className={styles.titleTxt}>今天</div>,
          month: <div className={styles.titleTxt}>月</div>,
          week: <div className={styles.titleTxt}>周</div>,
          previous: <LeftOutlined />,
          next: <RightOutlined />,
          showMore: (total: string) => `还有${total}项`,
        }}
        components={{
          eventWrapper: (props: any) => {
            const { event, children } = props;
            const { bizType, bizData } = event;
            const { statusType } = bizData || {};
            return <div className={cls(styles.eventWrap, bizType, statusType)}>{children}</div>
          },
          // event: (props: any) => <MyEvent {...props} />,
          timeGutterHeader: () => <div>全天</div>,
          month: {
            // event: (headProps) => {
            //   console.log('headProps', headProps);
            //   return <div>ssss</div>;
            // },
            // dateHeader: (headProps) => {
            //   const { label, drilldownView, onDrillDown } = headProps;
            //   return <a href="#" onClick={onDrillDown} role="cell">{label} 这里放图标</a>;
            // },
          },
        }}
        popup
        selectable
        selected={selectedEvent}
        onSelectEvent={(evt: IEventItem, ev: any) => {
          ev.preventDefault();
          ev.stopPropagation();
          setSelectedEvent(evt);
          console.log('select', evt, ev);
        }}
        onSelectSlot={createDraftEvent}
        resizable
        resizableAccessor={disableDragOrResize}
        draggableAccessor={disableDragOrResize}
        // onDragStart={console.log}
        onEventResize={resizeEvent}
        onEventDrop={moveEvent}
        eventPropGetter={(event: IEventItem, start: Date, end: Date, isSelected: boolean) => {
          let className = '';
          if (event?.eventType === DRAFT_EVENT) {
            className = DRAFT_EVENT;
            // isSelected = true;
          }
          return { className };
        }}
        // onNavigate={(date: any, view: any, action: any) => {
        //   console.log('nv', date, view, action);
        // }}
        onView={(view: string) => {
          // console.log('vv', view);
          viewRef.current = view;
        }}
        onRangeChange={(range: any) => {
          // console.log('rv', range);
          let rangeTime: { startTime: any; endTime: any } | null = null;
          switch (viewRef.current) {
            case Views.MONTH:
              const { start, end } = range;
              rangeTime = {
                startTime: moment(start).format('YYYY-MM-DD 00:00:00'),
                endTime: moment(end).format('YYYY-MM-DD 00:00:00'),
              };
              break;
            case Views.WEEK:
              rangeTime = {
                startTime: moment(range[0]).format('YYYY-MM-DD 00:00:00'),
                endTime: moment(range[6]).format('YYYY-MM-DD 00:00:00'),
              };
              break;
            default:
          }
          if (rangeTime) {
            setCollaborationTime(rangeTime);
          }
        }}
      />
      <CalendarPopover
        getSelectedNode={getEventCardNode}
        visible={!!selectedEvent}
        onVisibleChange={(visible: boolean) => {
          if (!visible) {
            setSelectedEvent(null);
          }
        }}
        parentRef={containerRef}
      >
        <EventPopover event={selectedEvent} />
      </CalendarPopover>
      <CalendarPopoverFixed
        getSelectedNode={getCreateCardMiniNode}
        visible={!!draftEvent}
        onVisibleChange={(visible: boolean) => {
          if (!visible) {
            setDraftEvent(null);
          }
        }}
        parentRef={containerRef}
      >
        {newBtns}
      </CalendarPopoverFixed>
    </div>
  );
};
