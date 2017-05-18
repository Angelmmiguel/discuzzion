// UUID
const UUID = require('uuid/v4');

// Max users
const MAX_USERS = 6;

// Topics class
class Topics {

  // Initialize empty elements
  constructor(users) {
    this.topics = {};
    this.users = users;
  }

  // Join an user on a room. This method can create a room too.
  joinRoom(clientId, topic) {
    let room;

    if (this.topics[topic] === undefined) {
      room = this._createRoom(clientId);
      this.topics[topic] = [room];
    } else {
      room = this._findOrCreateRoom(clientId, topic);
    }

    return room;
  }

  // Leave the current room
  // TODO: Implement this method
  leaveRoom(clientId) {

  }

  // Create a new room
  _createRoom(clientId) {
    return {
      id: UUID(),
      users: [clientId]
    }
  }

  // Try to find a room with a seat or create a new one
  _findOrCreateRoom(clientId, topic) {
    let selectedRoom;

    // Iterate over the rooms
    this.topics[topic].some(room => {
      if (room.users.length < MAX_USERS) {
        selectedRoom = room;
        return true;
      } else {
        return false;
      }
    }, this);

    if (selectedRoom) {
      selectedRoom.users.push(clientId);
    } else {
      // All rooms are full
      selectedRoom = this._createRoom(clientId);
      // Add it to the first position of the array. It will be easier for add new people to it
      this.topics[topic].unshift(selectedRoom);
    }

    // Return the room
    return selectedRoom;
  }
}

module.exports = Topics;
