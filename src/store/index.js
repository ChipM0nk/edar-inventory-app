import { applyMiddleware, combineReducers, createStore } from 'redux';
import categoryReducer from './category/reducer';
import supplierReducer from './supplier/reducer';
import productReducer from './product/reducer';
import authenticateReducer from './authenticate/reducer';
import stockinReducer from './stockin/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
  category: categoryReducer,
  supplier: supplierReducer,
  product: productReducer,
  authenticate: authenticateReducer,
  stockin: stockinReducer
});

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
