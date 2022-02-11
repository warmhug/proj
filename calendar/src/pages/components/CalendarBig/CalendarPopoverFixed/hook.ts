import * as React from 'react';
import type { IProps } from './defines';
/*
import * as CalendarInterface from '../../defines';
import { IMap } from '../../defines/base';
import moment, { DurationInputArg2 } from 'moment';
*/
import { UsePopoverPos } from './PopoverPos';

interface IHooks {
  props: IProps;
  popoverRef: React.RefObject<HTMLDivElement>;
}

interface IMethod {
  handleMaskClick: () => void;
}

interface IData {}

interface IViewModelReturnValue {
  viewMethod: IMethod;
  viewData: IData;
}

const ViewModelHooks = (params: IHooks): IViewModelReturnValue => {
  const { props, popoverRef } = params;
  const { calPopoverPosition } = UsePopoverPos({
    getSelectedNode: props.getSelectedNode,
    onVisibleChange: props.onVisibleChange,
    popoverRef,
    parentRef: props.parentRef,
  });

  // 找到被选中的元素; 遍历元素，里面找到 selected 属性？
  // 找到父元素；parentPref,
  // 找到挂载的元素； popoverRef;
  // 依赖收集，重新计算高度

  React.useEffect(() => {
    if (props.visible) {
      calPopoverPosition();
    }
  }, [calPopoverPosition, props.children, props.visible]);

  const handleMaskClick = () => {
    props.onVisibleChange(false);
  };

  return {
    viewData: {},
    viewMethod: {
      handleMaskClick,
    },
  };
};

export default ViewModelHooks;
