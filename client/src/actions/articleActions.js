import axios from 'axios';
import { GET_ARTICLES, POST_ARTICLE, LOADING_ARTICLE, STOP_ARTICLE_LOADING } from './types';

export const getArticles = () => async (dispatch) => {
  dispatch(setArticleLoading());
  const response = await axios.get('/api/articles/articles');
  // console.log('RESPONSE', response.data)
  dispatch(setArticles(response.data))
  dispatch(stopArticleLoading());
}
export const postArticle = (article) => async (dispatch) => {
  dispatch(setArticleLoading());
  const response = await axios.post('api/articles/create', article);
  console.log('RESPONSE', response.data);
  dispatch(postArticleAction(article));
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
    payload
  }
}

export const postArticleAction = (payload) => {
  return {
    type: POST_ARTICLE,
    payload
  }
}
