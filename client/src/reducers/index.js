import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import articleReducer from './articleReducer';

const reducers = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  articles: articleReducer,
})

export default reducers;