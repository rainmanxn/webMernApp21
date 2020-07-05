import { SET_CURRENT_USER, USER_LOADING, STOP_USER_LOADING } from '../actions/types';
const isEmpty = require('is-empty');

const inititalState = {
  isAuth: false,
  user: {},
  loading: false
}

const authReducer = (state = inititalState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuth: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      // console.log("STARTED!!!")
      return {
        ...state,
        loading: true
      };
    case STOP_USER_LOADING:
      // console.log("STOPPED!!!")
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export default authReducer;