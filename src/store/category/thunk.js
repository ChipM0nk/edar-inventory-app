import { addItem, fetchAll } from '../services';

import * as categoryActions from './actions';

export const getAllCategoriesThunk = () => {
  return async (dispatch) => {
    try {
      //hack for now
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
      //hack for now
      console.log('Dispatch category loading');
      dispatch(categoryActions.categoryIsLoading);
      console.log('Dispatch category loading end');
      const category = await addItem('category', addObj);
      dispatch(categoryActions.categoryIsAdded(category));
    } catch (error) {
      dispatch(categoryActions.categoryHasErrored(error.message));
    }
  };
};
