// App prefix
const prefix = 'discuzzion';

// Define the actions for the application
const actions = [
  'USER_SAVE_CLIENT',
  'USER_JOIN_ROOM'
]

// Export them with a prefix to isolate our app in Redux
const actionFormatter = actions => {
  let formatted = {};

  actions.forEach(action => {
    formatted[action] = `${prefix}@${action}`;
  }, this);

  return formatted;
}

// Export formatted actions
const actionNames = actionFormatter(actions);
export default actionNames;
