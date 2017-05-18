// Get the action names
import actionNames from '../actions/actionNames';

// Initial state
const initialState = {
  client: {},
  room: {},
  socket: undefined
}

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionNames.USER_SAVE_CLIENT:
      return Object.assign({}, state, {
        client: action.client
      });
    case actionNames.USER_JOIN_ROOM:
      return Object.assign({}, state, {
        room: action.room
      });
    default:
      return state;
  }
}

export default userReducer;
