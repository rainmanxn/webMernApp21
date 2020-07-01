import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Header from './components/Header/Header';
import Card from './components/Card/Card';
import CreateArticle from './components/CreateArticle/CreateArticle';
import Main from './components/Main/Main';


// check logged
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const curTime = Date.now() / 1000;
  if (decoded.exp < curTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
            <Route path='/' component={Header}/>
            <Route exact path='/' component={Card} />
            <Route exact path='/main' component={Main} />
            <Route exact path='/create' component={CreateArticle} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Switch>
              <PrivateRoute path='/dashboard' component={Dashboard} />
            </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
