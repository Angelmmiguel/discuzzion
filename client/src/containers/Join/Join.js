import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { actions } from 'redux-router5';
import { joinRoom, generateKeys } from '../../actions/user';

// Custom fetch
import fetch from '../../shared/fetch';

// Keys
// import kbpgp from 'kbpgp';
import generatePGPKeys from '../../shared/pgp';

// Import styles
import './Join.css';

class Join extends Component {

  constructor(props) {
    super(props);

    // Binds
    this.updateKeyGenerationState = this.updateKeyGenerationState.bind(this);

    // Store the errors
    this.state = {
      keyStatus: '',
      keyGenerating: false,
      keyGenerated: this.props.user.pgp !== undefined,
      error: false
    }
  }

  isKeyGenerated() {
    return this.props.user.pgp !== undefined;
  }

  isUuid() {
    return this.props.user.uuid !== undefined;
  }

  isClientInitialized() {
    return this.isUuid() && this.isKeyGenerated();
  }

  componentDidMount() {
    if (this.isClientInitialized()) {
      this.fetchRoom(this.props.user.uuid);
    } else if (this.isUuid() && !this.isKeyGenerated()) {
      this.generateKey(this.props.user.uuid);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.isClientInitialized() && nextProps.user.uuid !== undefined &&
        nextProps.user.pgp !== undefined) {
      this.fetchRoom(nextProps.user.uuid);
    } else if (nextProps.user.uuid !== undefined) {
      this.generateKey(nextProps.user.uuid);
    }
  }

  updateKeyGenerationState(o) {
    this.setState(() => ({
      keyStatus: this.convertStatus(o)
    }));
  }

  generateKey(uuid) {
    if (!this.state.keyGenerating) {
      this.setState({
        keyGenerating: true
      });

      generatePGPKeys(uuid, this.updateKeyGenerationState).then((user) => {
        this.props.dispatch(generateKeys(user));
      });
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

  convertStatus(o) {
    switch(o.what) {
      case 'guess':
        return 'Doing some maths 🔢';
      case 'fermat':
        return `Finding unicorns 🦄 [${o.p.toString().slice(-3)}]`;
      case 'found':
        return `Unicorn found! 🦄`
      case 'mr':
        return `Validating stuff 🤓 [${~~(100 * o.i / o.total)}%]`;
      default:
        return 'Running some scripts 👻';
    }
  }

  renderText() {
    if (this.state.keyGenerating) {
      return this.state.keyStatus;
    } else {
      return 'Finding a room for you...';
    }
  }

  render() {
    return <section className="Join flex items-center tc vh-100">
      <div className="w-100">
        <p className="Join__Icon mt0 mb2">ᕕ( ᐛ )ᕗ</p>
        <p className="Join__Text">{ this.renderText() }</p>
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
