import * as actionTypes from './actionTypes';

/*
isSucess - for add, update, delete
*/
const initialState = {
  stockins: [],
  isLoading: false,
  isProcessing: false,
  error: '',
  crudError: null,
  isSaved: false,
  isDeleted: false
};

export default function stockinReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.STOCKIN_IS_LOADING:
      return {
        ...state,
        isLoading: true,
        isDeleted: false,
        error: '',
        crudError: null,
        isSaved: false
      };
    case actionTypes.STOCKINS_FETCH_SUCCESS:
      // console.log(`Suppliers ::: ${JSON.stringify(action.stockins)}`);
      return {
        ...state,
        stockins: action.stockins,
        isLoading: false,
        isDeleted: false,
        error: '',
        crudError: null,
        isSaved: false
      };

    case actionTypes.STOCKIN_IS_ADDED:
      return {
        ...state,
        stockins: [action.stockin, ...state.stockins],
        isLoading: false,
        isDeleted: false,
        isProcessing: false,
        isSaved: true,
        crudError: null
      };
    case actionTypes.STOCKIN_IS_VOIDED:
      return {
        ...state,
        stockins: state.stockins.filter((stockin) => stockin.stockinId !== action.stockinId),
        isProcessing: false,
        crudError: null,
        isSaved: false,
        isDeleted: true
      };

    //for CRUD operations
    case actionTypes.STOCKIN_IS_PROCESSING:
      return {
        ...state,
        isLoading: false,
        isProcessing: true,
        isSaved: false,
        isDeleted: false,
        crudError: null
      };

    case actionTypes.STOCKIN_HAS_ERRORED:
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
