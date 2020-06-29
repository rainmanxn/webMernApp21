import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, STOP_USER_LOADING } from './types';

export const registerUser = (userData, history) => dispatch => {
  dispatch(setUserLoading());
  setTimeout(() =>
    axios
      .post('/api/users/register', userData)
      .then(res => history.push('/login'))
      .then(dispatch(stopUserLoading()))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
    , 500)

}

export const loginUser = userData => dispatch => {
  dispatch(setUserLoading());
  setTimeout(() =>
    axios
      .post('api/users/login', userData)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwtDecode(token);
        console.log('DECODED: ', decoded);
        dispatch(setCurrentUser(decoded));
      })
      .then(dispatch(stopUserLoading()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
    , 500)

}

export const setErrors = payload => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: payload
  })
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  })
}

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  }
}
export const stopUserLoading = () => {
  return {
    type: STOP_USER_LOADING
  }
}