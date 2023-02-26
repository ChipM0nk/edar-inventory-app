import * as actionTypes from './actionTypes';

/*
isSucess - for add, update, delete
*/
const initialState = {
  suppliers: [],
  isLoading: false,
  isProcessing: false,
  error: '',
  crudError: null,
  isSaved: false,
  isDeleted: false
};

export default function supplierReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SUPPLIER_IS_LOADING:
      return {
        ...state,
        isLoading: true,
        isDeleted: false,
        error: '',
        crudError: null,
        isSaved: false
      };
    case actionTypes.SUPPLIER_FETCH_SUCCESS:
      // console.log(`Suppliers ::: ${JSON.stringify(action.suppliers)}`);
      return {
        ...state,
        suppliers: action.suppliers,
        isLoading: false,
        isDeleted: false,
        error: '',
        crudError: null,
        isSaved: false
      };

    case actionTypes.SUPPLIER_IS_ADDED:
      return {
        ...state,
        suppliers: [action.supplier, ...state.suppliers],
        isLoading: false,
        isDeleted: false,
        isProcessing: false,
        isSaved: true,
        crudError: null
      };

    case actionTypes.SUPPLIER_IS_UPDATED:
      // eslint-disable-next-line no-case-declarations
      const index = state.suppliers.findIndex(
        (supplier) => supplier.supplierId === action.supplier.supplierId
      );
      // eslint-disable-next-line no-case-declarations
      const newCategories = [...state.suppliers];
      newCategories[index] = action.supplier;
      return {
        ...state,
        suppliers: newCategories,
        isProcessing: false,
        isSaved: true,
        crudError: null
      };

    case actionTypes.SUPPLIER_IS_DELETED:
      return {
        ...state,
        suppliers: state.suppliers.filter((supplier) => supplier.supplierId !== action.supplierId),
        isProcessing: false,
        crudError: null,
        isSaved: false,
        isDeleted: true
      };

    //for CRUD operations
    case actionTypes.SUPPLIER_IS_PROCESSING:
      return {
        ...state,
        isLoading: false,
        isProcessing: true,
        isSaved: false,
        isDeleted: false,
        crudError: null
      };

    case actionTypes.SUPPLIER_HAS_ERRORED:
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
