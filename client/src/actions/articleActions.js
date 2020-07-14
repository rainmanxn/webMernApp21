import axios from 'axios';
import { GET_ARTICLES, POST_ARTICLE, LOADING_ARTICLE, STOP_ARTICLE_LOADING, INC_LIKE, DEC_LIKE } from './types';

export const getArticles = () => async (dispatch) => {
  dispatch(setArticleLoading());
  const response = await axios.get('/api/articles/articles');
  dispatch(setArticles(response.data))
  dispatch(stopArticleLoading());
}

export const postArticle = (article) => async (dispatch) => {
  dispatch(setArticleLoading());
  const response = await axios.post('api/articles/create', article);
  dispatch(postArticleAction(response.data));
  dispatch(stopArticleLoading());
}

export const patchArticle = (article, id) => async (dispatch) => {
  dispatch(setArticleLoading());
  console.log(article, id);
  const response = await axios.patch(`/api/articles/edit/${id}`, article);
  console.log('RESPONSE', response.data);
  dispatch(stopArticleLoading());
}

export const setLike = (id, likes, userId, likedUsers, stateLikes) => async (dispatch) => {
  const like = likes;
  dispatch(setArticleLoading());
  const response = await axios.patch(`/api/articles/edit/likes/${id}`, {id, like, userId });
  dispatch(incLike({id, like, userId, likedUsers, stateLikes}));
  dispatch(stopArticleLoading());
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


export const setArticles = (data) => {
  const { articles } = data;
  const arr = Object.values(articles);
  const likes = arr.map(({ _id, likes }) => { return { id: _id, likes }} );
  const likedUsers = arr.map(({ _id, likedUsers }) => { return { id: _id, likedUsers }} );
  const payload = { articles, likes, likedUsers };
  return {
    type: GET_ARTICLES,
    payload
  }
}

export const postArticleAction = (article) => {
  // const article = action.payload;
  const like = {
    id: article._id,
    likes: article.likes,
  }
  const likedUser = {
    id: article._id,
    likedUsers: []
  }
  const payload = { article, like, likedUser };
  return {
    type: POST_ARTICLE,
    payload
  }
}

export const incLike = ({id: _id, like, userId, likedUsers: likedUsersState, stateLikes: likesState}) => {
  let isLiked = false;
  let res = [];
  const likedUsers = likedUsersState.map(({ id, likedUsers }) => {
    if (id === _id) {
      if (likedUsers.indexOf(userId) !== -1) {
        isLiked= true;
        res = likedUsers.filter((el) => el !== userId)
      } else {
        res = [...likedUsers, userId];
      }
      return { id, likedUsers: res }
    }
    return { id, likedUsers }
  })
  const likes = likesState.map(({ id, likes}) => {
    if ( id === _id) {
      return isLiked ? { id, likes: like - 1 } : { id, likes: like + 1 }
    }
    return { id, likes }
  })

  const payload = {
    likes, likedUsers
  }
  return {
    type: INC_LIKE,
    payload
  }
}
