import * as actionTypes from './actionTypes';

/*
isSucess - for add, update, delete
*/
const initialState = {
  products: [],
  isLoading: false,
  isProcessing: false,
  error: '',
  crudError: null,
  isSaved: false,
  isDeleted: false
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PRODUCT_IS_LOADING:
      return {
        ...state,
        isLoading: true,
        isDeleted: false,
        error: '',
        crudError: null,
        isSaved: false
      };
    case actionTypes.PRODUCT_FETCH_SUCCESS:
      // console.log(`Suppliers ::: ${JSON.stringify(action.products)}`);
      return {
        ...state,
        products: action.products,
        isLoading: false,
        isDeleted: false,
        error: '',
        crudError: null,
        isSaved: false
      };

    case actionTypes.PRODUCT_IS_ADDED:
      return {
        ...state,
        products: [action.product, ...state.products],
        isLoading: false,
        isDeleted: false,
        isProcessing: false,
        isSaved: true,
        crudError: null
      };

    case actionTypes.PRODUCT_IS_UPDATED:
      // eslint-disable-next-line no-case-declarations
      const index = state.products.findIndex(
        (product) => product.productId === action.product.productId
      );
      // eslint-disable-next-line no-case-declarations
      const newCategories = [...state.products];
      newCategories[index] = action.product;
      return {
        ...state,
        products: newCategories,
        isProcessing: false,
        isSaved: true,
        crudError: null
      };

    case actionTypes.PRODUCT_IS_DELETED:
      return {
        ...state,
        products: state.products.filter((product) => product.productId !== action.productId),
        isProcessing: false,
        crudError: null,
        isSaved: false,
        isDeleted: true
      };

    //for CRUD operations
    case actionTypes.PRODUCT_IS_PROCESSING:
      return {
        ...state,
        isLoading: false,
        isProcessing: true,
        isSaved: false,
        isDeleted: false,
        crudError: null
      };

    case actionTypes.PRODUCT_HAS_ERRORED:
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
