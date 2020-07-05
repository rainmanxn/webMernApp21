import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
const history = createBrowserHistory();

ReactDOM.render((
  <Router history={history}>
    <App />
  </Router>),
  document.getElementById('root')
);

serviceWorker.unregister();
