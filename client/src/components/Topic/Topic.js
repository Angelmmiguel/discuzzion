import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import { Link } from 'react-router5';

// Styles
import './topic.css';

class Topic extends PureComponent {
  render() {
    return <Link routeName="join" routeParams={ { topic: this.props.name } }
      className="Topic pa2 f6 shadow-4 mr3 mb3 dib link">
      <span className="Topic__hashtag dib pr1">#</span>
      <span className="Topic__name dib pr2 mr2">{ this.props.name }</span>
      <span className="Topic__number">{ this.props.rooms }</span>
    </Link>
  }
}

// PropTypes
Topic.propTypes = {
  name: PropTypes.string.isRequired,
  rooms: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}

export default Topic;
