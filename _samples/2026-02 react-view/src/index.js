import { createRoot } from 'react-dom/client';
import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';

function reactRender() {
  document.body.innerHTML = '<div id="app"></div>';
  // ReactDOM.render(<App />, document.getElementById('app'));

  // Render your React component instead
  const root = createRoot(document.getElementById('app'));
  // root.render(<h1>Hello, world</h1>);
  root.render(<App />);
}
reactRender()
