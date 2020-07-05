import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Article from '../Article/Article';

const ArticlePrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
  render={({ match, history }) => { if (auth.isAuth) {
    const {id} = match.params;
      return <Article history={history} item={id}/>
  } else {
    return <Redirect to='/login' />
  }
  }
  //   (auth.isAuth === true) ? return {
  //   const {id} = match.params;
  //   return <Article item={id}/>
  // } : (<Redirect to='/login' />)
  }/>
)


ArticlePrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(ArticlePrivateRoute);