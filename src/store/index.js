import { applyMiddleware, combineReducers, createStore } from 'redux';
import categoryReducer from './category/reducer';
import authenticateReducer from './authenticate/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
  category: categoryReducer,
  authenticate: authenticateReducer
});

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
