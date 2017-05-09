import { createStore, applyMiddleware, combineReducers } from 'redux';
import { router5Middleware, router5Reducer } from 'redux-router5';

const configureStore = (router, initialState = {}) => {
  // Apply the
  let createStoreWithMiddleware = applyMiddleware(
    router5Middleware(router)
  )(createStore);
  // Create and return the store
  return createStoreWithMiddleware(combineReducers({
    router: router5Reducer,
  }), initialState);
}

export default configureStore;
