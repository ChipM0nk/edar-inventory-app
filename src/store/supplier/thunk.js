import { addItem, deleteItem, fetchAll } from '../services';

import * as supplierActions from './actions';

export const getAllSuppliersThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(supplierActions.supplierIsLoading());
      const suppliers = await fetchAll('supplier');
      dispatch(supplierActions.supplierFetchSuccess(suppliers));
    } catch (error) {
      dispatch(supplierActions.supplierHasErrored(error.message, false));
    }
  };
};

export const addSupplierThunk = (addObj) => {
  return async (dispatch) => {
    try {
      dispatch(supplierActions.supplierIsProcessing());
      const supplier = await addItem('supplier', addObj);
      dispatch(supplierActions.supplierIsAdded(supplier));
    } catch (error) {
      dispatch(supplierActions.supplierHasErrored(error.message));
    }
  };
};

export const updateSupplierThunk = (updateObj) => {
  return async (dispatch) => {
    try {
      dispatch(supplierActions.supplierIsProcessing());
      const supplier = await addItem('supplier', updateObj);
      dispatch(supplierActions.supplierIsUpdated(supplier));
    } catch (error) {
      dispatch(supplierActions.supplierHasErrored(error.message));
    }
  };
};

export const deleteSupplierThunk = (supplierId) => {
  return async (dispatch) => {
    try {
      //hack for now
      dispatch(supplierActions.supplierIsProcessing());
      // const supplier = await addItem('supplier', addObj);
      // await new Promise((res) => setTimeout(res, 1000));
      await deleteItem('supplier', supplierId);
      dispatch(supplierActions.supplierIsDeleted(supplierId));
    } catch (error) {
      dispatch(supplierActions.supplierHasErrored(error.message));
    }
  };
};
