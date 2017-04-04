import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './redux/store/configureStore'

const store = configureStore();
ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);
