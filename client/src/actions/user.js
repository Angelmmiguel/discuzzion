// Get the action names
import actionNames from './actionNames';

// Store the client information of the user
export const saveClient = client => {
  return {
    type: actionNames.USER_SAVE_CLIENT,
    client
  }
}

// Store the room
export const joinRoom = room => {
  return {
    type: actionNames.USER_JOIN_ROOM,
    room
  }
}
