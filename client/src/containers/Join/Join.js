import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { actions } from 'redux-router5';
import { joinRoom, generateKeys } from '../../actions/user';

// Custom fetch
import fetch from '../../shared/fetch';

// Keys
import kbpgp from 'kbpgp';

// Import styles
import './Join.css';

// Constants from OpenPGP
const F = kbpgp['const'].openpgp;

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
    if (o.what !== this.state.keyStatus) {
      this.setState({
        keyStatus: o.what
      });
    }
  }

  generateKey(uuid) {
    if (!this.state.keyGenerating) {
      this.setState({
        keyGenerating: true
      });

      const opts = this.keyOptions(uuid);

      kbpgp.KeyManager.generate_rsa(opts, (err, user) => {
        user.sign({}, (err) => {
          this.props.dispatch(generateKeys(user));
        });
      });
    }
  }

  keyOptions(uuid) {
    const asp = new kbpgp.ASP({
      progress_hook: this.updateKeyGenerationState
    });

    return {
      asp,
      userid: uuid,
      primary: {
        nbits: 1024,
        flags: F.certify_keys | F.sign_data | F.auth | F.encrypt_comm | F.encrypt_storage,
        expire_in: 0  // never expire
      },
      subkeys: [
        {
          nbits: 1024,
          flags: F.sign_data,
          expire_in: 86400 * 365 * 8 // 8 years
        }, {
          nbits: 1024,
          flags: F.encrypt_comm | F.encrypt_storage,
          expire_in: 86400 * 365 * 8
        }
      ]
    };
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

  convertStatus(status) {
    switch(status) {
      case 'guess':
        return 'Doing some maths 🔢';
      case 'fermat':
        return 'Finding unicorns 🦄';
      case 'mr':
        return 'Validating stuff 🤓';
      default:
        return 'Running some scripts 👻';
    }
  }

  renderText() {
    if (this.state.keyGenerating) {
      return this.convertStatus(this.state.keyStatus);
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
