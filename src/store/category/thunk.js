import { fetchAll } from '../services';

import * as categoryActions from './actions';

export const getAllCategoriesThunk = () => {
  return async (dispatch) => {
    //hack for now
    dispatch(categoryActions.categoryIsLoading());
    try {
      const categories = await fetchAll('category');
      dispatch(categoryActions.categoryFetchSuccess(categories));
    } catch (error) {
      dispatch(categoryActions.categoryHasErrored(error.message));
    }
  };
};
