// Main container. It displays the first form of the app
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'redux-router5';

// Components
import Logo from '../../components/Logo';
import Topic from '../../components/Topic';
import TopicForm from '../../components/TopicForm';
import Stats from '../../components/Stats';
import Title from '../../components/Title';
import Footer from '../../components/Footer';

// Custom fetch
import fetch from '../../shared/fetch';

// Styles
import './home.css';

// Default topics
const defaultTopics = [
  {
    name: 'videogames',
    rooms: '-'
  },
  {
    name: 'society',
    rooms: '-'
  },
  {
    name: 'coding',
    rooms: '-'
  },
  {
    name: 'tv',
    rooms: '-'
  },
  {
    name: 'tvseries',
    rooms: '-'
  },
  {
    name: 'random',
    rooms: '-'
  }
];

class Home extends Component {

  constructor(props) {
    super(props);

    // Bind
    this.onSubmit = this.onSubmit.bind(this);
    this.combineTopics = this.combineTopics.bind(this);

    // State
    this.state = {
      stats: {},
      // Add some examples
      currentTopics: defaultTopics
    }
  }

  componentDidMount() {
    fetch(`/status`).then(res => {
      if (!res.error) {
        this.setState({
          stats: res.body.stats,
          currentTopics: this.combineTopics(res.body.currentTopics)
        });
      }
    });
  }

  combineTopics(newTopics) {
    let currentNames = this.state.currentTopics.map(t => t.name),
      currentTopics = this.state.currentTopics.slice();
    // Combine it with the current topics
    newTopics.forEach(t => {
      let i = currentNames.indexOf(t.name);
      if (i > -1) {
        // We already have it
        currentTopics[i].rooms = t.rooms;
      } else {
        // New one
        currentTopics.push(t);
      }
    });
    return currentTopics;
  }

  onSubmit(topic) {
    this.props.dispatch(actions.navigateTo('join', { topic }));
  }

  render() {
    return <div className="Home">
      <div className="mv5">
        <Logo/>
      </div>
      <main className="Home__main">
        <div className="mw7 center cf">
          <div className="fl w-70">
            <Title>
              Current topics
            </Title>
            {
              this.state.currentTopics.map((topic, i) => <Topic key={ i } { ...topic } />)
            }
          </div>
          <div className="fl w-30">
            <Title>
              Create or join a topic
            </Title>
            <TopicForm onSubmit={ this.onSubmit }/>
          </div>
        </div>
        <Stats stats={ this.state.stats }/>
      </main>
      <Footer />
    </div>
  }
}

export default connect(state => {
  return {
    router: state.router
  }
})(Home);
