import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import App from './containers/App';
import io from 'socket.io-client';

// Router
import createRouter from './router';
// Redux
import configureStore from './stores';
// Styles
import './index.css';

// Basic simple peer config
// let config = {
//   iceServers: [
//     { url: 'stun:stun.l.google.com:19302' }
//   ]
// };

const socket = io('http://api.discuzzion.docker');

// Redux and router
const router = createRouter();
const store = configureStore(router, {
  // Initial State
  socket: { socket }
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
