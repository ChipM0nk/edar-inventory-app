import { addItem, fetchAll } from '../services';

import * as categoryActions from './actions';

export const getAllCategoriesThunk = () => {
  return async (dispatch) => {
    //hack for now
    dispatch(categoryActions.categoryIsLoading());
    try {
      const categories = await fetchAll('category');
      dispatch(categoryActions.categoryFetchSuccess(categories));
    } catch (error) {
      dispatch(categoryActions.categoryHasErrored(error.message, false));
    }
  };
};

export const addCategoryThunk = (addObj) => {
  return async (dispatch) => {
    //hack for now
    dispatch(categoryActions.categoryIsLoading);
    try {
      const category = await addItem('category', addObj);
      dispatch(categoryActions.categoryIsAdded(category));
    } catch (error) {
      dispatch(categoryActions.categoryHasErrored(error.message));
    }
  };
};
