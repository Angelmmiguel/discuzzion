import React, { Component } from 'react';

// Components
import Logo from '../../components/Logo';
import Title from '../../components/Title';
import User from '../../components/User';
import Footer from '../../components/Footer';
import ChatForm from '../../components/ChatForm';

// Styles
import './Room.css';

class Room extends Component {
  render() {
    return <div className="Room">
      <div className="mv4">
        <Logo small={ true }/>
      </div>
      <div className="flex justify-between ph4">
        <aside className="Room__Users w-40">
          <Title>Users</Title>
          <User color="#f39508" name="Angel"/>
          <User color="#54a986" name="Carlos"/>
        </aside>
        <main className="Room__Chat w-100 flex justify-between flex-column">
          <Title>Chat</Title>
          <div className="Room__Chat__Box pv3 mb3 flex flex-column justify-end">
            <div className="mb3">
              <span style={ { color: '#f39508'} } className="dib mr3 w3">Angel</span>
              <span>This is a test message</span>
            </div>
            <div className="mb3">
              <span style={ { color: '#54a986'} } className="dib mr3 w3">Carlos</span>
              <span>This is a test message</span>
            </div>
            <div className="mb3">
              <span style={ { color: '#f39508'} } className="dib mr3 w3">Angel</span>
              <span>This is a test message</span>
            </div>
            <div className="mb3">
              <span style={ { color: '#54a986'} } className="dib mr3 w3">Carlos</span>
              <span>This is a test message</span>
            </div>
          </div>
          <ChatForm />
        </main>
      </div>
      <Footer />
    </div>
  }
}

export default Room;
