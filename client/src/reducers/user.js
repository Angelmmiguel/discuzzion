// Get the action names
import actionNames from '../actions/actionNames';

// Initial state
const initialState = {
  // Public part. Known by everyone
  client: {},
  // Private part of the user.
  uuid: undefined,
  // Current Room
  room: {},
  // Client socket
  socket: undefined,
  // PGP keys
  pgp: undefined
}

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionNames.USER_SAVE_CLIENT:
      return Object.assign({}, state, {
        client: action.user.client,
        uuid: action.user.uuid
      });
    case actionNames.USER_JOIN_ROOM:
      return Object.assign({}, state, {
        room: action.room
      });
    case actionNames.USER_GENERATE_KEYS:
      return Object.assign({}, state, {
        pgp: action.pgp
      });
    default:
      return state;
  }
}

export default userReducer;
