import { addItem, deleteItem, fetchAll } from '../services';

import * as productActions from './actions';

export const getAllProductsThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(productActions.productIsLoading());
      const products = await fetchAll('product');
      dispatch(productActions.productFetchSuccess(products));
    } catch (error) {
      dispatch(productActions.productHasErrored(error.message, false));
    }
  };
};

export const addProductThunk = (addObj) => {
  return async (dispatch) => {
    try {
      dispatch(productActions.productIsProcessing());
      const product = await addItem('product', addObj);
      dispatch(productActions.productIsAdded(product));
    } catch (error) {
      dispatch(productActions.productHasErrored(error.message));
    }
  };
};

export const updateProductThunk = (updateObj) => {
  return async (dispatch) => {
    try {
      dispatch(productActions.productIsProcessing());
      const product = await addItem('product', updateObj);
      dispatch(productActions.productIsUpdated(product));
    } catch (error) {
      dispatch(productActions.productHasErrored(error.message));
    }
  };
};

export const deleteProductThunk = (productId) => {
  return async (dispatch) => {
    try {
      //hack for now
      dispatch(productActions.productIsProcessing());
      // const product = await addItem('product', addObj);
      // await new Promise((res) => setTimeout(res, 1000));
      await deleteItem('product', productId);
      dispatch(productActions.productIsDeleted(productId));
    } catch (error) {
      dispatch(productActions.productHasErrored(error.message));
    }
  };
};
