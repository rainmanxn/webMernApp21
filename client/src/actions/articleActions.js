import axios from 'axios';
import { GET_ARTICLES, POST_ARTICLE, LOADING_ARTICLE, STOP_ARTICLE_LOADING, INC_LIKE, DEC_LIKE } from './types';

export const getArticles = () => async (dispatch) => {
  dispatch(setArticleLoading());
  const response = await axios.get('/api/articles/articles');
  dispatch(setArticles(response.data))
  // console.log('RESPONSE', response.data)
  dispatch(stopArticleLoading());
}

export const postArticle = (article) => async (dispatch) => {
  dispatch(setArticleLoading());
  const response = await axios.post('api/articles/create', article);
  // console.log('RESPONSE', response);
  dispatch(postArticleAction(response.data));
  dispatch(stopArticleLoading());
}

export const patchArticle = (article, id) => async (dispatch) => {
  dispatch(setArticleLoading());
  console.log(article, id);
  // const id = article._id;
  const response = await axios.patch(`/api/articles/edit/${id}`, article);
  console.log('RESPONSE', response.data);
  // dispatch(postArticleAction(article));
  dispatch(stopArticleLoading());
}

export const setLike = (id, likes, userId) => async (dispatch) => {
  const like = likes;
  console.log('xz',id, likes, 'userId', userId)
  const response = await axios.patch(`/api/articles/edit/likes/${id}`, {id, like, userId });
  dispatch(incLike({id, like}));
  // console.log('click', id, like)
  // console.log('id, likes')
  // console.log(response);
}

export const deleteArticle = (id) => async (dispatch) => {
  console.log(id);
  const _id = { id: 123};
  const response = await axios.delete(`/api/articles/delete/${id}`);
  console.log('RESPONSE', response.data);
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

export const incLike = (payload) => {
  return {
    type: INC_LIKE,
    payload
  }
}
