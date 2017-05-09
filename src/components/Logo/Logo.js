import React from 'react';
import logo from './logo.svg';
import './logo.css';

const Logo = (props) => {
  let cssClasses = "Logo tc"

  if (props.small === true) {
    cssClasses += " Logo--small"
  }

  return <div className={ cssClasses }>
    <img src={logo} alt="Discuzzion logo" />
  </div>;
}

export default Logo;
