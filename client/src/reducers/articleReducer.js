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
      const { id: _id, like, userId } = action.payload;
      let { likes, likedUsers } = state;
      let isLiked = false;
      let res = [];
      likedUsers = likedUsers.map(({ id, likedUsers }) => {
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
      likes = likes.map(({ id, likes}) => {
        if ( id === _id) {
          return isLiked ? { id, likes: like - 1 } : { id, likes: like + 1 }
        }
        return { id, likes }
      })
      console.log('likes', likes);
      // console.log('isLiked', isLiked);

      return {
        ...state,
        likes,
        likedUsers
      }
    }
    case GET_ARTICLES: {
      // console.log('action.payload', action.payload);
      const { articles } = action.payload;
      let arr = Object.values(articles);
      let likes = arr.map(({ _id, likes }) => { return { id: _id, likes }} );
      let likedUsers = arr.map(({ _id, likedUsers }) => { return { id: _id, likedUsers }} );
      // console.log('GET_ARTICLES', likes)
      return {
        ...state,
        articles,
        likes,
        likedUsers
      }}
      case POST_ARTICLE: {
      // console.log('action.payload', action.payload);
      const { articles, likes } = state;
      const article = action.payload;
        console.log('article!!!!!!!', article);
      const like = {
        id: article._id,
        likes: article.likes,
      }
      console.log('likes',like);
      return {
        ...state,
        articles: {...articles, article},
        likes: [...likes, like],
        likedUsers: []
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
