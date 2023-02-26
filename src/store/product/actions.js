import * as actionTypes from './actionTypes';

export function productFetchSuccess(products) {
  return {
    type: actionTypes.PRODUCT_FETCH_SUCCESS,
    products
  };
}

export function productIsAdded(product) {
  return {
    type: actionTypes.PRODUCT_IS_ADDED,
    product
  };
}

export function productIsUpdated(product) {
  return {
    type: actionTypes.PRODUCT_IS_UPDATED,
    product
  };
}

export function productIsDeleted(productId) {
  return {
    type: actionTypes.PRODUCT_IS_DELETED,
    productId
  };
}

export function productIsLoading() {
  return {
    type: actionTypes.PRODUCT_IS_LOADING
  };
}

/*
CRUD
*/
export function productIsProcessing() {
  return {
    type: actionTypes.PRODUCT_IS_PROCESSING
  };
}
export function productHasErrored(error, isCrud = true) {
  return {
    type: actionTypes.PRODUCT_HAS_ERRORED,
    error: error,
    isCrud: isCrud
  };
}
