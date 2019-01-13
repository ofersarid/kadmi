import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Waves from 'node-waves';
import '/src/analytics';
import createBrowserHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';
import combinedReducers from './reducers';
import styles from './index.scss';
import Home from './home/home';
import './device/device';

const $root = document.getElementById('root');
$root.className = styles.root;

export const history = createBrowserHistory();

ReactGA.pageview('home');

export const store = createStore(
  combinedReducers, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store} >
    <Router history={history} >
      <Home />
    </Router >
  </Provider >,
  $root
);

Waves.attach('.ripple');
Waves.init();
