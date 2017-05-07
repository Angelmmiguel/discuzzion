import React, { PureComponent, PropTypes } from 'react';

class Topic extends PureComponent {
  render() {
    return <a onClick={ this.props.onClick } className="Topic">
      { this.props.name }
    </a>
  }
}

// PropTypes
Topic.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  currentNumber: PropTypes.number
}