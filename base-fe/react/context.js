/*

*/

import React, { useState, useEffect, useReducer, useContext } from 'react';

// context
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};
export const ThemeContext = React.createContext(
  themes.dark // 默认值
);
export const TodosDispatch = React.createContext(null);

export const DeepChild = ({ todos }) => {
  // 如果我们想要执行一个 action，我们可以从 context 中获取 dispatch。
  const dispatch = useContext(TodosDispatch);
  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }
  return (
    <button onClick={handleClick}>Add todo {JSON.stringify(todos)}</button>
  );
}

export default ({ onClick }) => {
  // 提示：`dispatch` 不会在重新渲染之间变化
  // 父组件 避免 向子组件 传递回调函数，改为 传递 dispatch
  const [todos, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add':
        return {text: state.text + action.text};
      default:
        throw new Error();
    }
  }, 'default', (text) => {
    return { text: text };
  });

  return (
    <div>
      <TodosDispatch.Provider value={dispatch}>
        <DeepChild todos={todos} />
      </TodosDispatch.Provider>
    </div>
  )
}
