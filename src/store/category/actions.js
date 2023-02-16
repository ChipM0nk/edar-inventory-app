import * as actionTypes from './actionTypes';

export function categoryFetchSuccess(categories) {
  return {
    type: actionTypes.CATEGORY_FETCH_SUCCESS,
    categories
  };
}

export function categoryIsAdded(category) {
  return {
    type: actionTypes.CATEGORY_IS_ADDED,
    category
  };
}

export function categoryIsUpdated(category) {
  return {
    type: actionTypes.CATEGORY_IS_UPDATED,
    category
  };
}

export function categoryIsLoading() {
  return {
    type: actionTypes.CATEGORY_IS_LOADING,
    isLoading: true
  };
}

export function categoryHasErrored(error) {
  return {
    type: actionTypes.CATEGORY_HAS_ERRORED,
    error: error
  };
}
