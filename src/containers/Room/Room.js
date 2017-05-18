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

class Room extends Component {
  // Initialize
  constructor(props) {
    super(props);

    // Binds
    this.onSend = this.onSend.bind(this);

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

  // Fetch users
  componentDidMount() {
    if (this.room && this.room.id !== undefined) {
      // Emit himself
      this.socket.emit('join room', {
        room: this.room.id
      });

      this.socket.on('user join', (user) => {
        this.setState({
          users: this.state.users.slice().concat([user])
        });
      });

      this.socket.on('new message', (message) => {
        this.setState({
          messages: this.state.messages.slice().concat([message])
        });
      });
    } else {
      // Redirect user. They can't go to a room directly
      this.props.dispatch(actions.navigateTo('join', { topic: this.props.topic }));
    }
  }

  // Leave the room
  componentWillUnmount() {
    this.socket.emit('leave room');
  }

  // On send
  onSend(text) {
    // Emit it! :D
    this.socket.emit('send message', { text });
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
