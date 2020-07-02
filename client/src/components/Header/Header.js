import React, { Component} from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './header.scss'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Text = styled.div`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 28px;
  margin-left: 22px;
  color: black;
`


 const Header = (props) => {
  const { user } = props.auth;
  const isLogged = !(Object.keys(user).length === 0);
   console.log(isLogged);
   const renderLogOut = (logged) => {
     if (logged) {
       return (
         <Link to='/'>
          <Button className='button_logOut'>Log OUT</Button>
         </Link>
       )
     }
     return null
   }
   const renderLogIn = (logged) => {
     if (!logged) {
       return (
         <Link to='/login'>
           <Button type='text'>Sign In</Button>
         </Link>
       )
     }
     return null
   }
   const renderRegister = (logged) => {
     if (!logged) {
       return (
         <Link to='/register'>
           <Button className='button_signUp'>Sign Up</Button>
         </Link>
       )
     }
     return null
   }


    return (
    <Wrapper>
      <Link to='/main'>
        <Text>Realworld Blog</Text>
      </Link>
      <div className='right_block'>
        {renderLogIn(isLogged)}
        {renderRegister(isLogged)}
        {renderLogOut(isLogged)}
      </div>
    </Wrapper>
    )
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);