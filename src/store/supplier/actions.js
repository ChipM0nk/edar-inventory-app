import * as actionTypes from './actionTypes';

export function supplierFetchSuccess(suppliers) {
  return {
    type: actionTypes.SUPPLIER_FETCH_SUCCESS,
    suppliers
  };
}

export function supplierIsAdded(supplier) {
  return {
    type: actionTypes.SUPPLIER_IS_ADDED,
    supplier
  };
}

export function supplierIsUpdated(supplier) {
  return {
    type: actionTypes.SUPPLIER_IS_UPDATED,
    supplier
  };
}

export function supplierIsDeleted(supplierId) {
  return {
    type: actionTypes.SUPPLIER_IS_DELETED,
    supplierId
  };
}

export function supplierIsLoading() {
  return {
    type: actionTypes.SUPPLIER_IS_LOADING
  };
}

/*
CRUD
*/
export function supplierIsProcessing() {
  return {
    type: actionTypes.SUPPLIER_IS_PROCESSING
  };
}
export function supplierHasErrored(error, isCrud = true) {
  return {
    type: actionTypes.SUPPLIER_HAS_ERRORED,
    error: error,
    isCrud: isCrud
  };
}
