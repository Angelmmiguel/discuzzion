import React from 'react';

// Components
import Title from '../Title';

const Stats = props => {
  // Method to get the value
  const getState = name => props.stats[name] || 0;

  return <section className="Stats mw7 center flex justify-between mt3">
    <div className="tc">
      <p className="b f1 mb3">{ getState('users') }</p>
      <Title>Current users</Title>
    </div>
    <div className="tc">
      <p className="b f1 mb3">{ getState('rooms') }</p>
      <Title>Active rooms</Title>
    </div>
    <div className="tc">
      <p className="b f1 mb3">{ getState('topics') }</p>
      <Title>Topics</Title>
    </div>
  </section>
}

export default Stats;
