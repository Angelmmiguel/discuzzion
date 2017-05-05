import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Peer from 'simple-peer';

// Basic simple peer config
let config = {
  iceServers: [
    { url: 'stun:stun.l.google.com:19302' }
  ]
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
