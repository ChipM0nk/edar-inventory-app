import * as actionTypes from './actionTypes';

export function categoryFetchSuccess(categories) {
  return {
    type: actionTypes.CATEGORY_FETCH_SUCCESS,
    categories,
    crudError: null,
    isSaved: false
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

export function categoryIsDeleted(categoryId) {
  return {
    type: actionTypes.CATEGORY_IS_DELETED,
    categoryId
  };
}

export function categoryIsLoading() {
  return {
    type: actionTypes.CATEGORY_IS_LOADING
  };
}

/*
CRUD
*/
export function categoryIsProcessing() {
  return {
    type: actionTypes.CATEGORY_IS_PROCESSING
  };
}
export function categoryHasErrored(error, isCrud = true) {
  return {
    type: actionTypes.CATEGORY_HAS_ERRORED,
    error: error,
    isCrud: isCrud
  };
}
