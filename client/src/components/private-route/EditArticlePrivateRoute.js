import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import Article from '../Article/Article';
import EditArticle from '../EditArticle/EditArticle';

const EditArticlePrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={({ match, history }) => { if (auth.isAuth) {
      const {id} = match.params;
      return <EditArticle history={history} item={id}/>
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


EditArticlePrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(EditArticlePrivateRoute);