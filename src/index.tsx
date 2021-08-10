import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/Store';
import Problems from './component/problems/Problems';
import Similars from './component/similars/Similars';

const children = [<Problems />,<Similars />];

ReactDOM.render(
  <Provider store={store}>
    <App childProps={children}/>
  </Provider>,
  document.getElementById('root')
);

