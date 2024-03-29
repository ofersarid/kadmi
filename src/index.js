import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import Waves from 'node-waves';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { Router, hashHistory } from 'react-router';
import rootReducer from './cms/root-reducers';
import styles from './styles.scss';
import firebase from '../firebase.config';
import Routes from '/src/routes';

const $root = document.getElementById('root');

$root.className = styles.root;

// export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer, /* preloadedState, */
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({ getFirebase, getFirestore }),
    ),
    reduxFirestore(firebase),
    reactReduxFirebase(firebase, {
      userProfile: 'users',
      useFirestoreForProfile: true,
    }),
  )
);

ReactDOM.render(
  <Provider store={store} >
    <Router history={hashHistory} routes={Routes.routesMap} />
  </Provider >,
  $root
);

Waves.attach('.ripple');
Waves.init();

// document.addEventListener('touchmove',
//   function (e) {
//     e.preventDefault();
//   }, { passive: false });
