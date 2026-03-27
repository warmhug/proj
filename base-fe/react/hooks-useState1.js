/*

*/

import React, { useState, useEffect, useCallback } from 'react';

// useState 异步回调获取不到最新值 https://www.cnblogs.com/hymenhan/p/14991789.html
export default (props) => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(true);

  const increase = useCallback(() => {
    setCount(count + 1);
    // 函数式方法更新 count 会加 1
    // setCount(count => count + 1);
  }, [count]);

  function handleClick() {
    setCount(count + 1);
    // setCount(c => c + 1);
    setFlag(f => !f);

    increase();
    increase();
    increase();
    // 相当于
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);

    // 只更新 UI 一次
  }

  useEffect(() => {
    setTimeout(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      // 更新 UI 两次
    }, 1000);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(`Count: ${count}`);
      // setCount(count + 1);
      // https://reactjs.org/docs/hooks-reference.html#functional-updates
      // setCount(count => count + 1);
    }, 1000);
    // return () => clearInterval(intervalId);
  }, []);
  // }, [count]);

  console.log('re render count');

  return (
    <div>
      <div>{count} {String(flag)}</div>
      <button onClick={handleClick}>re render</button>
    </div>
  );
}
