import { createSelector } from 'reselect';

export const getErrors = state => state.errors;

export const getErrorsSelector = createSelector(getErrors, (errors) => errors);