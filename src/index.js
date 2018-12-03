import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Waves from 'node-waves';
import combinedReducers from './reducers';
import styles from './index.scss';
import Home from './home';

const $root = document.getElementById('root');
$root.className = styles.root;

const store = createStore(
  combinedReducers, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store} >
    <Router >
      <Home />
    </Router >
  </Provider >,
  $root
);

Waves.attach('.button');
Waves.init();
