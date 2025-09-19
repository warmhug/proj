/*
常用 hooks
*/

import React, { useCallback, useRef, useEffect } from 'react';
import React, { useState, useCallback, useRef } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import { debounce } from 'lodash';

// 解决 React state update on an unmounted component
export function useIsMounted() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });
  return isMounted;
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useEventCallback(fn, dependencies) {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });
  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);
  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}

/**
 * https://github.com/uidotdev/usehooks
 * https://usehooks.com/useDebounce
 * @param value
 * @param delay
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes
  return debouncedValue;
}
function useDebounce(fn, ms) {
  const fRef = useRef();
  fRef.current = fn;
  const result = useCallback(debounce(() => fRef.current(), ms), []);
  return result;
}


export function useDebounce1(props) {
  const [value, setValue] = useState();
  const f = () => console.log(value);

  // 组件 re-render，每次都重新生成一个 debounce 的 fetch  timeout 之后都触发了请求
  // const fn = debounce(f, 500);

  // 使用 useCallback 但没监听 value 则 value 一直为 undefined
  // const fn = useCallback(debounce(f, 500), []);

  // 使用 useRef 组件 re-render，每次都重新生成 回调函数，不需要外部传入最新变量
  const fRef = useRef();
  fRef.current = f;
  const fn = useCallback(debounce(() => fRef.current(), 500), []);

  return (
    <div>
      <input
        value={value}
        onChange={(event) => {
          const _v = event.target.value;
          setValue(_v);
          fn();
        }}
      />
    </div>
  );
}

export function useThrottle(props) {
  const [hover, setHover] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    console.log('click', hover);
    if (!hover) {
      return;
    }
    const container = containerRef.current;

    const onScroll = throttle(() => {
      console.log(container.scrollTop, window.innerHeight);
      // 如果 otherFn 内部有依赖其他 state 也需要添加到 useEffect 监听里
      // otherFn();
    }, 200);

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', onScroll);
    };
  }, [hover]);

  return (
    <div onClick={() => setHover(!hover)}>
      <div ref={containerRef} style={{ width: 500, height: 200, border: '1px solid red', overflow: 'scroll' }}>
        <div style={{ height: 1000 }}>点击后、滚动内容</div>
      </div>
    </div>
  );
}
