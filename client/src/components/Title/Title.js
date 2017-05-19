import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './title.css';

const Title = (props) =>
  <h1 className="Title f7 ttu mb3">
    { props.children }
  </h1>

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.node
  ])
}

export default Title;
