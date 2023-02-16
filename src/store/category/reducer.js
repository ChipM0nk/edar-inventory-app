import * as actionTypes from './actionTypes';

const initialState = {
  data: [],
  loading: false,
  error: ''
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CATEGORY_FETCH_SUCCESS:
      return {
        ...state,
        data: action.categories,
        loading: false,
        error: ''
      };

    case actionTypes.CATEGORY_IS_ADDED:
      return {
        ...state,
        data: [...state.data, action.category],
        loading: false
      };

    case actionTypes.CATEGORY_IS_UPDATED:
      // eslint-disable-next-line no-case-declarations
      const index = state.data.findIndex(
        (category) => category.categoryId === action.category.categoryId
      );
      // eslint-disable-next-line no-case-declarations
      const newCategories = [...state.data];
      newCategories[index] = action.category;
      return {
        ...state,
        data: newCategories,
        loading: false
      };

    case actionTypes.CATEGORY_IS_DELETED:
      return {
        ...state,
        data: state.data.filter((category) => category.categoryId !== action.category.categoryId),
        loading: false
      };

    case actionTypes.CATEGORY_IS_LOADING:
      return {
        ...state,
        data: [],
        loading: true
      };

    case actionTypes.CATEGORY_HAS_ERRORED:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}
