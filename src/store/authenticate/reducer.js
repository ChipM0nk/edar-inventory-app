import * as actionTypes from './actionTypes';

const initialState = {
  data: [],
  loading: false,
  error: '',
  isLoggedIn: false
};

export default function authenticateReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        data: action.token,
        loading: false,
        isLoggedIn: true,
        error: ''
      };
    case actionTypes.LOGIN_LOADING:
      return {
        ...state,
        data: [],
        loading: true,
        error: ''
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.error
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        data: [],
        isLoggedIn: false
      };
    default:
      return state;
  }
}
