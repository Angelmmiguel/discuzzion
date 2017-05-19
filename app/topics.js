// UUID
const UUID = require('uuid/v4');

// Max users
const MAX_USERS = 6;

// Topics class
class Topics {

  // Initialize empty elements
  constructor() {
    this.topics = {};
  }

  // Join an user on a room. This method can create a room too.
  joinRoom(topic, socketId) {
    let room;

    if (this.topics[topic] === undefined) {
      room = this._createRoom(socketId);
      this.topics[topic] = {
        [room.id]: room
      };
    } else {
      room = this._findOrCreateRoom(socketId, topic);
    }

    return room;
  }

  countTopics() {
    return Object.keys(this.topics).length;
  }

  currentTopics(number = 10) {
    let current = [];

    Object.keys(this.topics).slice(0, 10).forEach(t => {
      current.push({
        name: t,
        rooms: Object.keys(this.topics[t]).length
      });
    });

    return current;
  }

  countRooms() {
    let count = 0;
    Object.keys(this.topics).forEach(t => count += Object.keys(this.topics[t]).length);
    return count;
  }

  // Leave the current room
  leaveRoom(topic, roomId, socketId) {
    this.topics[topic][roomId].users = this.roomUsers(topic, roomId, socketId);
    return this.topics[topic][roomId].users;
  }

  // Get the users of the current room
  roomUsers(topic, roomId, excludeId = undefined) {
    let roomUsers = this.topics[topic][roomId].users;
    return excludeId !== undefined ? roomUsers.filter(uid => uid !== excludeId) : roomUsers;
  }

  // Create a new room
  _createRoom(socketId, topic) {
    return {
      id: UUID(),
      users: [socketId],
      topic
    }
  }

  // Try to find a room with a seat or create a new one
  _findOrCreateRoom(socketId, topic) {
    let selectedRoom;

    // Iterate over the rooms
    Object.keys(this.topics[topic]).some(roomId => {
      let room = this.topics[topic][roomId];
      if (room.users.length < MAX_USERS) {
        selectedRoom = room;
        return true;
      } else {
        return false;
      }
    }, this);

    if (selectedRoom) {
      selectedRoom.users.push(socketId);
    } else {
      // All rooms are full
      selectedRoom = this._createRoom(socketId, topic);
      // Add it to the first position of the array. It will be easier for add new people to it
      this.topics[topic].unshift(selectedRoom);
    }

    // Return the room
    return selectedRoom;
  }
}

module.exports = Topics;
