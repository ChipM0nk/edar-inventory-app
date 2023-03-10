import { addItem, deleteItem, fetchAll } from '../services';

import * as categoryActions from './actions';

export const getAllCategoriesThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(categoryActions.categoryIsLoading());
      const categories = await fetchAll('category');
      dispatch(categoryActions.categoryFetchSuccess(categories));
    } catch (error) {
      dispatch(categoryActions.categoryHasErrored(error.message, false));
    }
  };
};

export const addCategoryThunk = (addObj) => {
  return async (dispatch) => {
    try {
      dispatch(categoryActions.categoryIsProcessing());
      const category = await addItem('category', addObj);
      dispatch(categoryActions.categoryIsAdded(category));
    } catch (error) {
      dispatch(categoryActions.categoryHasErrored(error.message));
    }
  };
};

export const updateCategoryThunk = (updateObj) => {
  return async (dispatch) => {
    try {
      dispatch(categoryActions.categoryIsProcessing());
      const category = await addItem('category', updateObj);
      dispatch(categoryActions.categoryIsUpdated(category));
    } catch (error) {
      dispatch(categoryActions.categoryHasErrored(error.message));
    }
  };
};

export const deleteCategoryThunk = (categoryId) => {
  return async (dispatch) => {
    try {
      //hack for now
      dispatch(categoryActions.categoryIsProcessing());
      // const category = await addItem('category', addObj);
      // await new Promise((res) => setTimeout(res, 1000));
      await deleteItem('category', categoryId);
      dispatch(categoryActions.categoryIsDeleted(categoryId));
    } catch (error) {
      dispatch(categoryActions.categoryHasErrored(error.message));
    }
  };
};
