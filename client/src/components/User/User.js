import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Styles
import './User.css';

class User extends PureComponent {

  colorStyle() {
    return { backgroundColor: this.props.color };
  }

  boxStyle() {
    return { borderBottomColor: this.props.color };
  }

  render() {
    return <article onClick={ this.props.onClick } className="User pa2 f6 shadow-4 mr3 mb3 dib"
      style={ this.boxStyle() }>
      <span className="User__Color dib mr2" style={ this.colorStyle() }></span>
      <span className="User__Name dib">{ this.props.name }</span>
    </article>
  }
}

// PropTypes
User.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default User;
