import { createSelector } from 'reselect';

export const getUser = state => state.auth.user;
export const getAuth = state => state.auth.isAuth;



export const getIdSelector = createSelector(getUser, (user) => user.id);

export const getNameSelector = createSelector(getUser, (user) => user.name);

export const isAuthSelector = createSelector(getAuth, (isAuth) => isAuth)