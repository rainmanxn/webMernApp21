import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './header.scss'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import avatar from '../Card/avatar.png';

const Avatar = styled.img.attrs((props) => ({ src: props.img }))`
  height: 46px;
  width: 46px;
  border-radius: 23px;
  margin-right: 27px;
  margin-left: 13px;
  &:hover {
    cursor: pointer;
  }
`;

const UserName = styled.div`
  font-family: Inter,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.85);
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`

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
  let { url } = user;
  // console.log('!!!!!!!!!', user)
  if (!url) {
    url = avatar;
  }
  const isLogged = !(Object.keys(user).length === 0);
  const onLogoutClick = e => {
     e.preventDefault();
     const { logoutUser } = props;
     logoutUser();
   }


   const renderLogOut = (logged) => {
     if (logged) {
       return (
         <Link to='/'>
          <Button className='button_logOut' onClick={onLogoutClick}>Log OUT</Button>
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

   const renderUser = (logged) => {
     if (logged) {
       return (
           <Link to='/editaccount'>
         <UserInfo>
              <UserName>{user.name}</UserName>
              {/*<Avatar img='http://www.1zoom.net/prev2/290/289597.jpg' />*/}
              <Avatar img={url} />
         </UserInfo>
           </Link>
       )
     }
     return null
   }

   const renderCrete = (logged) => {
     if (logged) {
       return (
         <Link to='/create'>
           <Button className='button_create'>Create article</Button>
         </Link>
       )
     }
     return null
   }

    return (
    <Wrapper>
      <Link to='/'>
        <Text>Realworld Blog</Text>
      </Link>
      <div className='right_block'>
        <UserInfo>
          {renderCrete(isLogged)}
          {renderUser(isLogged)}
          {renderLogIn(isLogged)}
          {renderRegister(isLogged)}
          {renderLogOut(isLogged)}
        </UserInfo>
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