import React, { Component} from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './header.scss'
import { Link } from 'react-router-dom';

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


export default class Header extends Component {
  render() {
    return (
    <Wrapper>
      <Link to='/main'>
        <Text>Realworld Blog</Text>
      </Link>
      <div className='right_block'>
        <Link to='/login'>
          <Button type='text'>Sign In</Button>
        </Link>
        <Link to='/register'>
          <Button className='button_signUp'>Sign Up</Button>
        </Link>
      </div>
    </Wrapper>
    )
  }
}