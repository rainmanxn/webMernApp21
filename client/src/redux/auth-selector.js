import { createSelector } from 'reselect';

export const getUser = state => state.auth.user;
export const getAuth = state => state.auth.isAuth;
export const getLoading = state => state.auth.loading;


export const getUserSelector = createSelector(getUser, (user) => user);

export const getIdSelector = createSelector(getUser, (user) => user.id);

export const getNameSelector = createSelector(getUser, (user) => user.name);

export const isAuthSelector = createSelector(getAuth, (isAuth) => isAuth);

export const getUserUrlSelector = createSelector(getUser, (user) => user.url);

export const isLoadingSelector = createSelector(getLoading, (loading) => loading);