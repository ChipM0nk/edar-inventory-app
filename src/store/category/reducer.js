import * as actionTypes from './actionTypes';

/*
isSucess - for add, update, delete
*/
const initialState = {
  categories: [],
  isLoading: false,
  isProcessing: false,
  error: '',
  crudError: null,
  isSaved: false,
  isDeleted: false
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CATEGORY_IS_LOADING:
      return {
        ...state,
        isLoading: true,
        isDeleted: false,
        error: '',
        crudError: null,
        isSaved: false
      };
    case actionTypes.CATEGORY_FETCH_SUCCESS:
      return {
        ...state,
        categories: action.categories,
        isLoading: false,
        isDeleted: false,
        error: '',
        crudError: action.crudError,
        isSaved: action.isSaved
      };

    case actionTypes.CATEGORY_IS_ADDED:
      return {
        ...state,
        categories: [action.category, ...state.categories],
        isLoading: false,
        isDeleted: false,
        isProcessing: false,
        isSaved: true,
        crudError: null
      };

    case actionTypes.CATEGORY_IS_UPDATED:
      // eslint-disable-next-line no-case-declarations
      const index = state.categories.findIndex(
        (category) => category.categoryId === action.category.categoryId
      );
      // eslint-disable-next-line no-case-declarations
      const newCategories = [...state.categories];
      newCategories[index] = action.category;
      return {
        ...state,
        categories: newCategories,
        isProcessing: false,
        isSaved: true,
        crudError: null
      };

    case actionTypes.CATEGORY_IS_DELETED:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.categoryId !== action.categoryId
        ),
        isProcessing: false,
        crudError: null,
        isSaved: false,
        isDeleted: true
      };

    //for CRUD operations
    case actionTypes.CATEGORY_IS_PROCESSING:
      return {
        ...state,
        isLoading: false,
        isProcessing: true,
        isSaved: false,
        isDeleted: false,
        crudError: null
      };

    case actionTypes.CATEGORY_HAS_ERRORED:
      return {
        ...state,
        isLoading: false,
        isProcessing: false,
        isSaved: false,
        error: action.isCrud ? '' : action.error,
        crudError: action.isCrud ? action.error : ''
      };

    default:
      return state;
  }
}
