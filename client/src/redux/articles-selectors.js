import { createSelector } from 'reselect';

export const getArticlesSelector = state => state.articles.articles;
export const getLikes = state =>  state.articles.likes;
export const getLikedUsers = state =>  state.articles.likedUsers;


export const getArticlesListSelector = createSelector(getArticlesSelector, (articles) => articles);

export const currentArticleSelector = createSelector(getArticlesListSelector,  (articles) => (item) => {
  const arr = Object.values(articles);
  return arr.filter(({ _id }) => _id === item)[0];
})

export const getLikesSelector = createSelector(getLikes, (likes) => likes);

export const getCountLikesSelector = createSelector(getLikes, (likes) => (_id) => {
  return likes.filter(({ id }) => id === _id)[0].likes
});

export const getLikedUsersSelector = createSelector(getLikedUsers, (users) => users);

export const getCurrentArticleLikesCount = createSelector(getLikedUsersSelector, (likedUsers) => (_id) => {
  return likedUsers.filter(({ id: articleID }) => articleID === _id)[0].likedUsers;
})


