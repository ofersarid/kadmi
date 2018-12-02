import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Waves from 'node-waves';
import styles from './index.scss';
import Home from './home';

const $root = document.getElementById('root');
$root.className = styles.root;

ReactDOM.render(
  <Router>
    <Home />
  </Router>,
  $root
);

Waves.attach('.button');
Waves.init();
