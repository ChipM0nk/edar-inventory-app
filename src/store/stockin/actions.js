import * as actionTypes from './actionTypes';

export function stockinFetchSuccess(stockins) {
  return {
    type: actionTypes.STOCKINS_FETCH_SUCCESS,
    stockins
  };
}

export function stockinIsAdded(stockin) {
  return {
    type: actionTypes.STOCKIN_IS_ADDED,
    stockin
  };
}

export function stockinIsVoided(stockinId) {
  return {
    type: actionTypes.STOCKIN_IS_VOIDED,
    stockinId
  };
}

export function stockinIsLoading() {
  return {
    type: actionTypes.STOCKIN_IS_LOADING
  };
}

/*
CRUD
*/
export function stockinIsProcessing() {
  return {
    type: actionTypes.STOCKIN_IS_PROCESSING
  };
}
export function stockinHasErrored(error, isCrud = true) {
  return {
    type: actionTypes.STOCKIN_HAS_ERRORED,
    error: error,
    isCrud: isCrud
  };
}
