import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Waves from 'node-waves';
import './index.scss';
import Home from './home';

const $root = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Home />
  </Router>,
  $root
);

Waves.attach('.button');
Waves.init();
