import * as React from 'react';
import type { IProps } from './defines';
import useViewModelHook from './hook';
import './index.less';

// popover 容器，只需关注空间计算
const CalendarPopoverFixed = (props: IProps) => {
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const { viewData, viewMethod } = useViewModelHook({
    props,
    popoverRef,
  });

  return (
    <div className="main-calendar-popover-fixed" ref={popoverRef}>
      {props.visible ? (
        <div>
          <div className={'capture-event-mask'} onClick={viewMethod.handleMaskClick} />
          {props.children}
        </div>
      ) : null}
    </div>
  );
};

export { CalendarPopoverFixed };

export default CalendarPopoverFixed;
