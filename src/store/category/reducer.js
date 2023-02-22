import * as actionTypes from './actionTypes';

/*
isSucess - for add, update, delete
*/
const initialState = {
  data: [],
  loading: false,
  processing: false,
  error: '',
  cruderror: '',
  isSaved: false,
  isDeleted: false
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CATEGORY_FETCH_SUCCESS:
      return {
        ...state,
        data: action.categories,
        loading: false,
        processing: false,
        error: ''
      };

    case actionTypes.CATEGORY_IS_ADDED:
      return {
        ...state,
        data: [action.category, ...state.data],
        loading: false,
        processing: false,
        isSaved: true,
        cruderror: ''
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
        processing: false,
        isSaved: true,
        cruderror: null
      };

    case actionTypes.CATEGORY_IS_DELETED:
      return {
        ...state,
        data: state.data.filter((category) => category.categoryId !== action.categoryId),
        processing: false,
        cruderror: null,
        isDeleted: true
      };

    case actionTypes.CATEGORY_IS_LOADING:
      return {
        ...state,
        loading: true,
        processing: false,
        isSaved: false,
        error: ''
      };

    case actionTypes.CATEGORY_IS_PROCESSING:
      return {
        ...state,
        loading: false,
        processing: true,
        isSaved: false,
        isDeleted: false,
        cruderror: null
      };

    case actionTypes.CATEGORY_HAS_ERRORED:
      return {
        ...state,
        loading: false,
        processing: false,
        isSaved: false,
        error: action.isCrud ? '' : action.error,
        crudError: action.isCrud ? action.error : ''
      };

    default:
      return state;
  }
}
