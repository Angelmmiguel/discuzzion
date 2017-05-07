import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Topic extends PureComponent {
  render() {
    return <a onClick={ this.props.onClick } className="Topic">
      <span className="Topic__name">{ this.props.name }</span>
      <span className="Topic__number">{ this.props.currentNumber }</span>
    </a>
  }
}

// PropTypes
Topic.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  currentNumber: PropTypes.number
}

export default Topic;