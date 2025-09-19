/*
useEffect useCallback
*/

import React, { useState, useEffect, useCallback } from 'react';
const Index = () => {
  const [count, setCount] = useState(0);
  const [text, updateText] = useState('');

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

  async function fetchData() {
    const res = await new Promise((resolve) => {
      setTimeout(() => resolve(true), 3000);
    });
    updateText('new');
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>btn1 {count}</button>
      <button onClick={onAlert}>点我后，再点 btn1</button>
      <input value={text} onChange={e => updateText(e.target.value)} />
    </div>
  );
}
