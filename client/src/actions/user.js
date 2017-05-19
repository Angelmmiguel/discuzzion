// Get the action names
import actionNames from './actionNames';

// Store the client information of the user
export const saveUser = user => {
  return {
    type: actionNames.USER_SAVE_CLIENT,
    user
  }
}

// Store the room
export const joinRoom = room => {
  return {
    type: actionNames.USER_JOIN_ROOM,
    room
  }
}
