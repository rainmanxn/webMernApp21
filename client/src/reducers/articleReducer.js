import { GET_ARTICLES, POST_ARTICLE, LOADING_ARTICLE, STOP_ARTICLE_LOADING } from '../actions/types';

const initState = {
  articles: {},
  loadingArticle: false
};

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ARTICLES: {
      console.log('action.payload', action.payload);
      return {
        ...state,
        articles: action.payload
      }}
    case LOADING_ARTICLE:
      return {
        ...state,
        loadingArticle: true
      }
    case STOP_ARTICLE_LOADING:
      return {
        ...state,
        loadingArticle: false
      }
    default:
      return state;
  }
}

export default articleReducer;
