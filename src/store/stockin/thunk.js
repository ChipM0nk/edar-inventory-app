import { addItem, deleteItem, fetchAll } from '../services';

import * as stockinActions from './actions';

export const getAllStockinsThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(stockinActions.stockinIsLoading());
      const stockins = await fetchAll('purchase');
      dispatch(stockinActions.stockinFetchSuccess(stockins));
    } catch (error) {
      dispatch(stockinActions.stockinHasErrored(error.message, false));
    }
  };
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export const addStockinThunk = (addObj) => {
  console.log('stockin');
  return async (dispatch) => {
    try {
      delay(2000);
      dispatch(stockinActions.stockinIsProcessing());
      const stockin = await addItem('purchase', { ...addObj, staff: 1 }); //TODO use userId from token
      dispatch(stockinActions.stockinIsAdded(stockin));
    } catch (error) {
      dispatch(stockinActions.stockinHasErrored(error.message));
    }
  };
};

export const voidStockinThunk = (stockinId) => {
  return async (dispatch) => {
    try {
      dispatch(stockinActions.stockinIsProcessing());
      await deleteItem('purchase', stockinId);
      dispatch(stockinActions.stockinIsVoided(stockinId));
    } catch (error) {
      dispatch(stockinActions.stockinHasErrored(error.message));
    }
  };
};
