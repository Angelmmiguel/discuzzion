import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import './topic_form.css';

class TopicForm extends Component {

  constructor(props) {
    super(props);

    // Binds
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    // State
    this.state = {
      topic: ''
    }
  }

  onChange(e) {
    this.setState({ topic: e.target.value });
  }

  // Submit the form
  // TODO: Validate topic
  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onSubmit(this.state.topic);
  }

  render() {
    return <form className="TopicForm" onSubmit={ this.onSubmit }>
      <input className="input-reset pa2 mb2 db w-100 f6" type="text" placeholder="Your topic"
        onChange={ this.onChange }/>
      <button className="w-100 db pa2 white f6">Submit topic</button>
    </form>
  }
}

TopicForm.PropTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default TopicForm;
