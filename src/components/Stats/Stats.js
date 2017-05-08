import React from 'react';
import PropTypes from 'prop-types';

import Title from '../Title';

const Stats = (props) =>
  <section className="Stats mw7 center flex justify-between mt3">
    <div className="tc">
      <p className="b f1 mb3">190</p>
      <Title>Current users</Title>
    </div>
    <div className="tc">
      <p className="b f1 mb3">20</p>
      <Title>Active rooms</Title>
    </div>
    <div className="tc">
      <p className="b f1 mb3">182</p>
      <Title>Topics</Title>
    </div>
  </section>

export default Stats;
