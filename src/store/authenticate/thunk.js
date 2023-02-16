import { authenticate } from 'store/services';
import * as loginActions from './actions';

export const loginThunk = (credentials) => {
  return async (dispatch) => {
    try {
      dispatch(loginActions.loginLoading());
      const token = await authenticate(credentials);
      dispatch(loginActions.loginSuccess(token));
    } catch (error) {
      dispatch(loginActions.loginError(error.message));
    }
  };
};

/*
export const loginThunk = (credentials) => {
  return async (dispatch) => {
    dispatch(loginActions.loginLoading());
    authenticate(credentials)
      .then((token) => dispatch(loginActions.loginSuccess(token)))
      .catch((error) => dispatch(loginActions.loginError(error)));
  };
};

*/
export const logoutThunk = () => {
  return async (dispatch) => {
    dispatch(loginActions.logoutSuccess());
  };
};
