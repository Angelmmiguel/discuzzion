import { createElement } from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';

// Containers
import Home from '../Home';
import Room from '../Room';
import Join from '../Join';
import NotFound from '../../components/NotFound';

// Containers for routes
const containers = {
  'index': Home,
  'join': Join,
  'room': Room
};

// Basic App routing
const App = props => {
  const { route } = props;
  const segment = route ? route.name.split('.')[0] : undefined;
  // Initialize the component
  return createElement(containers[segment] || NotFound);
}

export default connect((state) => routeNodeSelector(''))(App);
