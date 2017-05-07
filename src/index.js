import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/Home';
import Peer from 'simple-peer';
import './index.css';

// Basic simple peer config
let config = {
  iceServers: [
    { url: 'stun:stun.l.google.com:19302' }
  ]
};

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);
