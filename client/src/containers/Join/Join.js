import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { actions } from 'redux-router5';
import { joinRoom } from '../../actions/user';

// Custom fetch
import fetch from '../../shared/fetch';

// Import styles
import './Join.css';

class Join extends Component {

  constructor(props) {
    super(props);

    // Store the errors
    this.state = {
      error: false
    }
  }

  is_client_initialized() {
    return this.props.user.uuid !== undefined;
  }

  componentDidMount() {
    if (this.is_client_initialized()) {
      this.fetchRoom(this.props.user.uuid);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.is_client_initialized() && nextProps.user.uuid !== undefined) {
      this.fetchRoom(nextProps.user.uuid);
    }
  }

  // Get a the room ID
  fetchRoom(uuid) {
    fetch(`/topic/${this.props.topic}/join`, {
      method: 'POST',
      body: { uuid }
    }).then(res => {
      if (!res.error) {
        this.props.dispatch(joinRoom(res.body.room));
        this.props.dispatch(actions.navigateTo('room', { topic: this.props.topic }));
      }
    });
  }

  render() {
    return <section className="Join flex items-center tc vh-100">
      <div className="w-100">
        <p className="Join__Icon mt0 mb2">ᕕ( ᐛ )ᕗ</p>
        <p className="Join__Text">Finding a room for you...</p>
      </div>
    </section>
  }
}

Join.PropTypes = {
  user: PropTypes.object
}

export default connect(state => {
  return {
    user: state.user,
    topic: state.router.route.params.topic
  }
})(Join);
