import React from 'react';
import PropTypes from 'prop-types';

const Message = props => {
  let messageStyle = { color: props.user.color };

  return <div className="mb3">
    <span style={ messageStyle } className="dib mr3 w3">{ props.user.name }</span>
    <span>{ props.text }</span>
  </div>
}

// PropTypes
Message.PropTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }),
  text: PropTypes.string.isRequired
}

export default Message;
