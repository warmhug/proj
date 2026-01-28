import _ from 'lodash';
import { createRoot } from 'react-dom/client';
import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}
// document.body.appendChild(component());

function reactRender() {
  document.body.innerHTML = '<div id="app"></div>';
  // ReactDOM.render(<App />, document.getElementById('app'));

  // Render your React component instead
  const root = createRoot(document.getElementById('app'));
  // root.render(<h1>Hello, world</h1>);
  root.render(<App />);
}
reactRender()
