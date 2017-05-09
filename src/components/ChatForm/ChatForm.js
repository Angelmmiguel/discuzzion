import React, { Component } from 'react';

// Styles
import './ChatForm.css';

class ChatForm extends Component {
  render() {
    return <form className="ChatForm flex">
      <textarea className="input-reset pa2 mb2 db w-100 f6 h3"></textarea>
      <button className="db pa2 white f6 h3 w-20">Send</button>
    </form>
  }
}

export default ChatForm;
