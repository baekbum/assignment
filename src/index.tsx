/** @jsxImportSource @emotion/react */
import { Global } from "@emotion/react";
import { style } from './css/index';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/Store';
import Problems from './component/problems/Problems';
import Similars from './component/similars/Similars';

ReactDOM.render(
  <Provider store={store}>
    <Global styles={style} />
    <App>
      <Problems />
      <Similars />
    </App>
  </Provider>,
  document.getElementById('root')
);

