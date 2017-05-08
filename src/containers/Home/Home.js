// Main container. It displays the first form of the app
import React, { Component } from 'react';

// Components
import Logo from '../../components/Logo';
import Topic from '../../components/Topic';
import TopicForm from '../../components/TopicForm';
import Stats from '../../components/Stats';
import Title from '../../components/Title';
import Footer from '../../components/Footer';

// Styles
import './home.css';

class Home extends Component {

  render() {
    return <div className="Home">
      <Logo/>
      <main className="Home__main">
        <div className="mw7 center cf">
          <div className="fl w-70">
            <Title>
              Trending topics
            </Title>
            <Topic name="My topic" currentNumber={ 0 } onClick={ () => {} } />
            <Topic name="videogames" currentNumber={ 1 } onClick={ () => {} } />
            <Topic name="My topic" currentNumber={ 34 } onClick={ () => {} } />
            <Topic name="My topic" currentNumber={ 3 } onClick={ () => {} } />
            <Topic name="topic" currentNumber={ 12 } onClick={ () => {} } />
            <Topic name="My topic" currentNumber={ 2 } onClick={ () => {} } />
            <Topic name="My topic" currentNumber={ 54 } onClick={ () => {} } />
            <Topic name="topic" currentNumber={ 1 } onClick={ () => {} } />
            <Topic name="My topic" currentNumber={ 9 } onClick={ () => {} } />
          </div>
          <div className="fl w-30">
            <Title>
              Create or join a topic
            </Title>
            <TopicForm />
          </div>
        </div>
        <Stats/>
      </main>
      <Footer />
    </div>
  }
}

export default Home;
