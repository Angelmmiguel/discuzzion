const express = require('express'),
  basicAuth = require('express-basic-auth'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  bodyParser = require('body-parser'),
  UUID = require('uuid/v4'),
  Topics = require('./app/topics.js');

// Add authentication only if the ENV variable is present
// The format must be user1=password1,user2=password2...
if (process.env.BASIC_AUTH_USERS) {
  let users = {};

  process.env.BASIC_AUTH_USERS.split(',').forEach(userString => {
    let user = userString.split(':');
    users[user[0]] = user[1];
  }, this);

  // Apply the middleware
  app.use(basicAuth({
    users: users,
    challenge: true,
    realm: process.env.BASIC_AUTH_REALM
  }));
}

// Port
const port = process.env.PORT || 3001;

// Static files
app.use(express.static('build'));

// Parse JSON body
app.use(bodyParser.json())

// Health
app.get('/status.json', (req, res) => {
  res.json({ status: 'ok' });
});

// Join a topic :D
app.post('/topic/:topic/join', (req, res) => {
  let topic = req.params.topic,
    userId = res.body.userId;
  
  // Join a room
  let room = Topics.joinRoom(userId, topic);
  res.json({ room: room.id });
});

// Don't allow users to join directly
app.get('/topic/:topic/chat', (req, res) => {
  res.redirect('/topic/:topic');
});

app.get('*', (req, res) => {
  res.sendfile(__dirname + '/build/index.html');
});

// Chat section
const getCurrentRoom = socket => {
  // Select the last room
  // TODO: Confirm the room
  let rooms = Object.keys(socket.rooms);
  return socket.rooms[rooms[rooms.length - 1]];
}

io.on('connection', socket => {
  // Return the socket
  socket.emit('ready', { uuid: UUID() });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    // Notify rooms
  });

  socket.on('join room', (data) => {
    console.log('New user in the room: ' + data.room);
    // Emit new user
    io.sockets.in(data.room).emit('user join', data.user);
    // Join current one
    socket.join(data.room);
  });

  socket.on('leave room', (data) => {
    let room = getCurrentRoom(socket);
    console.log('New user in the room: ' + room);
    socket.leave(room);
    // Emit new user
    io.sockets.in(room).emit('user leave', data.user);
  });

  socket.on('send message', (data) => {
    console.log(getCurrentRoom(socket));
    io.sockets.in(getCurrentRoom(socket)).emit('new message', data);
  });
});

// Create the server
http.listen(port, () => {
  console.log('Our app is running on http://localhost:' + port);
});
