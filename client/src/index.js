import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import App from './containers/App';
import io from 'socket.io-client';
import { saveUser } from './actions/user';

// Router
import createRouter from './router';
// Redux
import configureStore from './stores';
// Styles
import './index.css';

// Initialize the socket information
const socket = io();

// Redux store
let store;

// Store the client info in the reducer
socket.on('ready', (user) => {
  store.dispatch(saveUser(user));
});

// Redux and router
const router = createRouter(true);
store = configureStore(router, {
  // Initial State
  user: { socket }
});


router.start((err, state) => {
  ReactDOM.render(
    <Provider store={ store }>
      <RouterProvider router={ router }>
        <App />
      </RouterProvider>
    </Provider>,
    document.getElementById('root')
  );
});
