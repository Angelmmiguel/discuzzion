import React, { Component } from 'react';

// Styles
import './topic_form.css';

class TopicForm extends Component {
  render() {
    return <form className="TopicForm">
      <input className="input-reset pa2 mb2 db w-100 f6" type="text" placeholder="Your topic" />
      <button className="w-100 db pa2 white f6">Submit topic</button>
    </form>
  }
}

export default TopicForm;
