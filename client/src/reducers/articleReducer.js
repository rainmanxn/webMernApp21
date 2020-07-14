import { GET_ARTICLES, POST_ARTICLE, LOADING_ARTICLE, STOP_ARTICLE_LOADING, INC_LIKE } from '../actions/types';

const initState = {
  articles: {},
  likes: [],
  loadingArticle: false,
  likedUsers: []
};

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case INC_LIKE: {
      const { likes, likedUsers } = action.payload;
      return {
        ...state,
        likes,
        likedUsers
      }
    }
    case GET_ARTICLES: {
      const { articles, likes, likedUsers } = action.payload;

      return {
        ...state,
        articles,
        likes,
        likedUsers
      }}

      case POST_ARTICLE: {
      const { articles, likes, likedUsers } = state;
      const { article, like, likedUser } = action.payload;

      return {
        ...state,
        articles: {...articles, article},
        likes: [...likes, like],
        likedUsers: [...likedUsers, likedUser]
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
