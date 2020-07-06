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
// import Card from './components/Card/Card';
import CreateArticle from './components/CreateArticle/CreateArticle';
import Main from './components/Main/Main';
// import Article from './components/Article/Article';
import ArticlePrivateRoute from './components/private-route/ArticlePrivateRoute';
// import EditArticle from './components/EditArticle/EditArticle';
import EditArticlePrivateRoute from './components/private-route/EditArticlePrivateRoute';


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
            <Route exact path='/' render={({ history }) => { return <Main history={history} />}} />
            {/*<Route path='/articles/:id' render={({ match }) => {*/}
            {/*  const { id } = match.params;*/}
            {/*  console.log('MATCH', id)*/}
            {/* return <Article item={id}/>*/}
            {/*}} />*/}
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />

            <Switch>
              <PrivateRoute path='/create' component={CreateArticle} />
              <PrivateRoute path='/dashboard' component={Dashboard} />
              {/*<PrivateRoute path='/edit' component={EditArticle} />*/}
              <ArticlePrivateRoute path='/articles/:id' />
              <EditArticlePrivateRoute path='/edit/:id' />
            </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
