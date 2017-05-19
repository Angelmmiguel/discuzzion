import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Styles
import './topic.css';

class Topic extends PureComponent {
  render() {
    return <a onClick={ this.props.onClick } className="Topic pa2 f6 shadow-4 mr3 mb3 dib">
      <span className="Topic__hashtag dib pr1">#</span>
      <span className="Topic__name dib pr2 mr2">{ this.props.name }</span>
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
