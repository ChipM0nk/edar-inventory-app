import * as actionTypes from './actionTypes';

export function loginSuccess(token) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token
  };
}

export function loginLoading() {
  return {
    type: actionTypes.LOGIN_LOADING,
    isLoading: true
  };
}

export function loginError(error) {
  console.log(`error ${error}`);
  return {
    type: actionTypes.LOGIN_ERROR,
    error: error
  };
}

export function logoutSuccess() {
  return {
    type: actionTypes.LOGOUT_SUCCESS
  };
}
