import * as React from 'react';
import useSize from 'ahooks/es/useSize';

const UsePopoverPos = (params: {
  parentRef: React.RefObject<HTMLDivElement>;
  getSelectedNode: () => HTMLDivElement | null;
  onVisibleChange: (visible: boolean) => void;
  popoverRef: React.RefObject<HTMLDivElement>;
}) => {
  const { getSelectedNode, popoverRef, parentRef, onVisibleChange } = params;
  const popoverRefSize = useSize(popoverRef);

  const calPopoverPosition = React.useCallback(() => {
    const selectedNode = getSelectedNode();
    if (!selectedNode || !parentRef.current || !popoverRef.current) {
      onVisibleChange(false);
      return;
    }

    const containerWidth = parentRef.current.offsetWidth;
    const containerHeight = parentRef.current.offsetHeight;
    const containerRect = parentRef.current.getBoundingClientRect();

    const headerTop = containerRect.top;
    const sidebarWidth = containerRect.left;

    const targetWidth = selectedNode.offsetWidth;
    const targetHeight = selectedNode.offsetHeight;
    const selectedNodeRect = selectedNode.getBoundingClientRect();

    const targetLeft = selectedNodeRect.left - sidebarWidth;
    const targetTop = selectedNodeRect.top - headerTop;
    const targetRight = containerWidth - targetLeft - targetWidth;
    const targetBottom = containerHeight - targetTop - targetHeight;

    const PADDING = 4;
    const popoverHeight = popoverRefSize?.height || 0;
    const popoverWidth = popoverRefSize?.width || 0;

    // 初始化的时候 会是 undefined 或 0 ，不处理
    if (popoverWidth === 0 || popoverHeight === 0) {
      return;
    }

    // 过滤更新数值
    const popoverLastHeight = popoverRef.current.getAttribute('data-last-height');
    //     popoverRef.current.setAttribute('data-last-target-left', targetLeft.toString());
    /*
        popoverRef.current.setAttribute('data-last-target-left', targetLeft.toString());
    popoverRef.current.setAttribute('data-last-target-top', targetTop.toString());
    */
    const lastTargetLeft = popoverRef.current.getAttribute('data-last-target-left');
    const lastTargetTop = popoverRef.current.getAttribute('data-last-target-top');

    if (
      popoverHeight === Number(popoverLastHeight) &&
      targetLeft === Number(lastTargetLeft) &&
      targetTop === Number(lastTargetTop)
    ) {
      return;
    }

    let left = 0;
    let top = 0;

    if (targetRight > popoverWidth + PADDING) {
      // 看一下右侧有没空间
      left = targetLeft + PADDING + targetWidth;
    } else if (targetLeft > popoverWidth + PADDING) {
      // 看一下左侧有没空
      left = targetLeft - PADDING - popoverWidth;
    } else {
      // 居中
      left = targetLeft + targetWidth / 2 - popoverWidth / 2;
    }

    if (targetBottom > popoverHeight + PADDING) {
      // 下方有空间
      top = targetTop + targetHeight;
    } else if (targetTop > popoverHeight + PADDING) {
      // 上侧有空间
      top = targetTop - PADDING - popoverHeight;
    } else {
      // 都没有空间，直接在中间
      top = containerHeight - popoverHeight - PADDING;
    }

    // 最后兜底适配; 确保不会超出空间
    if (left + popoverWidth > containerWidth || left < 0) {
      left = 12;
    }

    if (top + popoverHeight > containerHeight || top < 0) {
      top = 12;
    }

    popoverRef.current.style.cssText = `left: ${left}px;top: ${top}px;display: 'block';`;
    popoverRef.current.setAttribute('data-last-height', popoverHeight.toString());
    popoverRef.current.setAttribute('data-last-target-left', targetLeft.toString());
    popoverRef.current.setAttribute('data-last-target-top', targetTop.toString());
    popoverRef.current.classList.add('active');
  }, [getSelectedNode, onVisibleChange, parentRef, popoverRef, popoverRefSize]);

  return {
    calPopoverPosition,
  };
};

export { UsePopoverPos };

export default UsePopoverPos;
