import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Button } from 'antd';
import 'antd/dist/antd.css';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    const { logoutUser } = this.props;
    logoutUser();
  }

  render() {
    const { user } = this.props.auth;
    console.log(user.name)
    return (
      <>
        <div>Hello, {user.name}</div>
        <Button type="primary" onClick={this.onLogoutClick}>
          Logout
        </Button>
      </>
    )
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);