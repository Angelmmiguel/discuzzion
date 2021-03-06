import { createStore, applyMiddleware, combineReducers } from 'redux';
import { router5Middleware, router5Reducer } from 'redux-router5';

// Other reducers
import userReducer from '../reducers/user';

const configureStore = (router, initialState = {}) => {
  // Apply the
  let createStoreWithMiddleware = applyMiddleware(
    router5Middleware(router)
  )(createStore);
  // Create and return the store
  return createStoreWithMiddleware(combineReducers({
    router: router5Reducer,
    user: userReducer
  }), initialState);
}

export default configureStore;
