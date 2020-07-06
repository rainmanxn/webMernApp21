import { GET_ARTICLES, POST_ARTICLE, LOADING_ARTICLE, STOP_ARTICLE_LOADING, INC_LIKE } from '../actions/types';

const initState = {
  articles: {},
  likes: [],
  loadingArticle: false,
  changeLike: false
};

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case INC_LIKE: {
      const { id: _id, like } = action.payload;
      let { likes } = state;
      // console.log('BEFORE', likes)
      likes = likes.map(({ id, likes}) => {
        if ( id === _id) {
          return { id, likes: like + 1 }
        }
        return { id, likes }
      })
      // console.log('AFTER', likes)
      return {
        ...state,
        likes
      }
    }
    case GET_ARTICLES: {
      // console.log('action.payload', action.payload);
      const { articles } = action.payload;
      let arr = Object.values(articles);
      let likes = arr.map(({ _id, likes }) => { return { id: _id, likes }} );
      // console.log('GET_ARTICLES', likes)
      return {
        ...state,
        articles,
        likes
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
        likes: [...likes, like]
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
