// Main container. It displays the first form of the app
import React, { Component } from 'react';

// Components
import Logo from '../../components/Logo';
import Topic from '../../components/Topic';

class Home extends Component {

  render() {
    return <div>
      <Logo/>
      <Topic name="My topic" currentNumber={ 0 } onClick={ () => {} } />
    </div>
  }
}

export default Home;