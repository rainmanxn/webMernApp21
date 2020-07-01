import axios from 'axios';
import { GET_ARTICLES, POST_ARTICLE, LOADING_ARTICLE, STOP_ARTICLE_LOADING, SET_CURRENT_USER } from './types';

export const getArticles = () => async (dispatch) => {
  dispatch(setArticleLoading());
  const response = await axios.get('/api/articles/articles');
  console.log('RESPONSE', response.data)
  dispatch(setArticles(response.data))
  dispatch(stopArticleLoading());
}




export const setArticleLoading = () => {
  return {
    type: LOADING_ARTICLE
  }
}

export const stopArticleLoading = () => {
  return {
    type: STOP_ARTICLE_LOADING
  }
}


export const setArticles = (payload) => {
  return {
    type: GET_ARTICLES,
    payload: payload
  }
}