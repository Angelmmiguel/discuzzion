import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import './ChatForm.css';

class ChatForm extends Component {

  constructor(props) {
    super(props);

    // Binds
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      value: ''
    }
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    // Send
    this.props.onSend(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return <form className="ChatForm flex" onSubmit={ this.onSubmit }>
      <input className="input-reset ph3 pv0 mb2 db w-100 f6 h3"
        value={ this.state.value } onChange={ this.onChange }></input>
      <button className="db pa2 white f6 h3 w-20">Send</button>
    </form>
  }
}

ChatForm.PropTypes = {
  onSend: PropTypes.func.isRequired
}

export default ChatForm;
