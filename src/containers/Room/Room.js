import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Logo from '../../components/Logo';
import Title from '../../components/Title';
import User from '../../components/User';
import Message from '../../components/Message';
import Footer from '../../components/Footer';
import ChatForm from '../../components/ChatForm';

// Styles
import './Room.css';

// Now, we will use random names.
// TODO: Ask the user for the name
const names = ['Angel', 'Charlie', 'Carlos', 'Cameron', 'Jess', 'Kyle', 'Lane'],
  colors = ['#f39508', '#54a986', '#2679ff', '#ae0adb'];

class Room extends Component {
  // Initialize
  constructor(props) {
    super(props);

    // Binds
    this.onSend = this.onSend.bind(this);

    this.state = {
      me: {
        name: names[Math.floor(Math.random() * names.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
      },
      users: [],
      messages: []
    }
  }

  // Fetch users
  componentDidMount() {
    // Connect!
    this.props.socket.on('connect', () => {
      // Emit himself
      this.props.socket.emit('join room', {
          room: this.props.room,
          user: this.state.me
        });

      this.props.socket.on('user join', (user) => {
        this.setState({
          users: this.state.users.slice().concat([user])
        });
      });

      this.props.socket.on('new message', (message) => {
        this.setState({
          messages: this.state.messages.slice().concat([message])
        });
      });
    });
  }

  // Leave the room
  componentWillUnmount() {
    this.props.socket.emit('leave room', { user: this.state.me });
  }

  // On send
  onSend(text) {
    let message = { user: this.state.me, text };
    // Emit it! :D
    this.props.socket.emit('send message', message);
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
            [this.state.me].concat(this.state.users)
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
    socket: state.socket.socket,
    room: state.router.route.params.room
  }
})(Room);
