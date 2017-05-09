import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import App from './containers/App';

// Router
import createRouter from './router';
// Redux
import configureStore from './stores';
// Styles
import './index.css';

// Basic simple peer config
let config = {
  iceServers: [
    { url: 'stun:stun.l.google.com:19302' }
  ]
};

// Redux and router
const router = createRouter();
const store = configureStore(router);

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
