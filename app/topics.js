// UUID
const UUID = require('uuid/v4');

// Max number of users per room
const MAX_USERS = 6;


// Now, we're going to store the current topics and users in memory. This is a POC and we will improve
// the reconnection system on a restart. Also, we want to avoid store any information about the message,
// so this is a good starting point ;)
let topics = {},
  users = {};

// This file includes a collection of functions for topics. All the methods are pure

// Create a new room
const createRoom = (userId) => {
  return {
    id: UUID(),
    users: [userId]
  }
} 

// Try to find a room with a seat or create a new one
const findOrCreateRoom = (userId, topic) => {
  let selectedRoom;

  // Iterate over the rooms
  topics[topic].some(room => {
    if (room.users.length < MAX_USERS) {
      selectedRoom = room;
      return true;
    } else {
      return false;
    }
  }, this);

  if (selectedRoom) {
    selectedRoom.users.push(userId); 
  } else {
    // All rooms are full
    selectedRoom = createRoom(userId);
  }

  // Return the room
  return selectedRoom;
}

// Get a room for the given topic
const joinRoom = (userId, topic) => {
  let room;

  if (topics[topic] === undefined) {
    room = createRoom(userId);
    topics[topic] = [room];
  } else {
    room = findOrCreateRoom(userId, topic);
  }

  return room;
}

module.exports = {
  joinRoom: joinRoom
}