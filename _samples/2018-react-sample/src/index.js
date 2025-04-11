/**
先运行 npm run build
再 npm start
*/

import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

const Index = () => {
  const [count, setCount] = useState(0);

  const onAlert = useCallback(() => {
    setTimeout(() => {
      alert('Value: ' + count)
    }, 5000)
  }, [count])

  useEffect(() => {
    console.log('count change')
    return () => {
      console.log('count cleanup')
    }
  }, [count])

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>btn1 {count}</button>
      <button onClick={onAlert}>点我后，再点 btn1</button>
    </div>
  );
}

ReactDOM.render(<Index /> , document.getElementById('example'));
