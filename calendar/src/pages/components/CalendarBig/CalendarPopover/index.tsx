
import * as React from 'react';
import {
  IProps,
} from './defines';
import useViewModelHook from './hook';
import useEventListener from 'ahooks/es/useEventListener';
import './index.less';

function elementsContains(
  elements: NodeList | HTMLDivElement[] | null | undefined,
  target: HTMLElement,
) {
  let result = false;
  elements && elements.forEach((ele) => {
    if (ele && ele.contains(target)) {
      result = true;
    }
  });
  return result;
}

// popover 容器，只需关注空间计算
const CalendarPopover = (props: IProps) => {
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const { viewData, viewMethod } = useViewModelHook({
    props, popoverRef,
  });

  // 需要放到hook 那里
  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (props.visible) {
      if (e && e.target) {
        if (elementsContains(document.querySelectorAll('.rbc-event'), e.target as HTMLDivElement) ||
          elementsContains(document.querySelectorAll('div[data-selected="1"]'), e.target as HTMLDivElement) ||
          elementsContains([popoverRef.current], e.target as HTMLDivElement)) {
          props.onVisibleChange(true);
        } else {
          props.onVisibleChange(false);
        }
      }
    }
  };

  useEventListener('click', clickHandler, { target: window });

  return (
    <div className="main-calendar-popover" ref={popoverRef}>
      {
        props.visible ?
          <div className="main-calendar-popover-content">
            {props.children}
          </div> : null
      }
    </div>
  );
};

export default CalendarPopover;

