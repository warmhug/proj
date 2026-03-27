
import React, { useState, useEffect, useCallback } from 'react';

// useState https://www.cnblogs.com/hymenhan/p/14991789.html
export default (props) => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(true);

  const exec = () => {
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);

    setCount(count => {
      console.log('log count: ', count);
      return count + 1
    });
    // setFlag(f => !f);
  };

  useEffect(() => {
    setTimeout(exec, 500);
    setTimeout(exec, 600);
    setTimeout(exec, 1000);
  }, []);

  return (
    <div>
      <div>{count} {String(flag)}</div>
    </div>
  );
}
