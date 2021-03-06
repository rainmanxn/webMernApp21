import { SET_CURRENT_USER, USER_LOADING, STOP_USER_LOADING, EDIT_CURRENT_USER } from '../actions/types';
const isEmpty = require('is-empty');

const inititalState = {
  isAuth: false,
  user: {},
  loading: false
}

const authReducer = (state = inititalState, action) => {
  switch (action.type) {
    case EDIT_CURRENT_USER:
      const { name, email, password, url } = action.payload;
      let { user } = state;
      user = { ...user, name, email, password, url }
      return {
        ...state,
        user: user
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuth: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case STOP_USER_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export default authReducer;