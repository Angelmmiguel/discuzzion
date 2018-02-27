import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { actions } from 'redux-router5';

// Components
import Logo from '../../components/Logo';
import Title from '../../components/Title';
import User from '../../components/User';
import Message from '../../components/Message';
import Footer from '../../components/Footer';
import ChatForm from '../../components/ChatForm';

// Styles
import './Room.css';

// Keys
import kbpgp from 'kbpgp';

class Room extends Component {
  // Initialize
  constructor(props) {
    super(props);

    // Binds
    this.onSend = this.onSend.bind(this);
    this.loadUser = this.loadUser.bind(this);

    this.state = {
      users: [],
      messages: []
    }
  }

  get room() {
    return this.props.user.room;
  }

  get socket() {
    return this.props.user.socket;
  }

  get pgp() {
    return this.props.user.pgp;
  }

  // Fetch users
  componentDidMount() {
    if (this.room && this.room.id !== undefined && this.pgp !== undefined) {
      // Emit himself
      this.pgp.export_pgp_public({}, (err, pgpPublic) => {
        if (err) {
          console.error(err);
        } else {
          this.socket.emit('join room', {
            room: this.room.id,
            topic: this.props.topic,
            publicKey: pgpPublic
          });
        }
      });

      this.socket.on('current users', (users) => {
        users.forEach(this.loadUser);
      });

      this.socket.on('user join', (user) => {
        this.loadUser(user);
      });

      this.socket.on('new message', (message) => {
        this.decryptMessage(message);
      });

      this.socket.on('user leave', (user) => {
        this.setState({
          users: this.state.users.slice().filter(currentUser => currentUser.id !== user.id)
        });
      });
    } else {
      // Redirect user. They can't go to a room directly
      this.props.dispatch(actions.navigateTo('join', { topic: this.props.topic }));
    }
  }

  // Leave the room
  componentWillUnmount() {
    if (this.room && this.room.id !== undefined) {
      this.socket.emit('leave room');
    }
  }

  loadUser(user) {
    kbpgp.KeyManager.import_from_armored_pgp({
      armored: user.publicKey
    }, (err, pgp) => {
      if (!err) {
        const loadedUser = {
          ...user, pgp
        }

        this.setState((prevState) => ({
          users: prevState.users.slice().concat([loadedUser])
        }));
      } else {
        console.error(err);
      }
    });
  }

  decryptMessage(message) {
    const ring = new kbpgp.keyring.KeyRing();
    ring.add_key_manager(this.pgp);
    this.state.users.forEach((u) => ring.add_key_manager(u.pgp));

    kbpgp.unbox({keyfetch: ring, armored: message.text }, (err, literals) => {
      if (err != null) {
        return console.log("Problem: " + err);
      } else {
        console.log("decrypted message");
        message.original = message.text;
        message.text = literals[0].toString();
        this.setState({
          messages: this.state.messages.slice().concat([message])
        });
        // Verification
        // var ds = km = null;
        // ds = literals[0].get_data_signer();
        // if (ds) { km = ds.get_key_manager(); }
        // if (km) {
        //   console.log("Signed by PGP fingerprint");
        //   console.log(km.get_pgp_fingerprint().toString('hex'));
        // }
      }
    });
  }

  // On send
  onSend(text) {
    // Emit it! :D
    const params = {
      msg:         text,
      encrypt_for: (this.state.users.map((u) => u.pgp)).concat([this.pgp]),
      sign_with:   this.pgp
    };

    kbpgp.box (params, (err, result_string, result_buffer) => {
      if (!err) {
        this.socket.emit('send message', { text: result_string });
      } else {
        console.error(err);
      }
    });
  }

  render() {
    return <div className="Room">
      <div className="mv4">
        <Logo small={ true }/>
      </div>
      <div className="flex justify-between ph4">
        <aside className="Room__Users w-40">
          <Title>Users</Title>
          {
            [this.props.user.client].concat(this.state.users)
              .map((user, i) => <User key={ i } { ...user } />)
          }
        </aside>
        <main className="Room__Chat w-100 flex justify-between flex-column">
          <Title>Chat</Title>
          <div className="Room__Chat__Box pv3 mb3 flex flex-column justify-end">
            {
              this.state.messages.map((message, i) => <Message key={ i } { ...message } />)
            }
          </div>
          <ChatForm onSend={ this.onSend } />
        </main>
      </div>
      <Footer />
    </div>
  }
}

export default connect((state) => {
  return {
    user: state.user,
    topic: state.router.route.params.topic
  }
})(Room);
