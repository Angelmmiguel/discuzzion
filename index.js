const express = require('express'),
  app = express(),
  path = require('path'),
  http = require('http').Server(app),
  bodyParser = require('body-parser'),
  UUID = require('uuid/v4'),
  io = require('socket.io')(http),
  // Project files
  Topics = require('./app/topics.js'),
  Random = require('./app/random.js');

// Initialize topics and users!
const users = {},
  topics = new Topics();

// Port
const port = process.env.PORT || 3001;

// Static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Parse JSON body
app.use(bodyParser.json())

// Health
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    stats: {
      topics: topics.countTopics(),
      rooms: topics.countRooms(),
      users: Object.keys(users).length
    },
    currentTopics: topics.currentTopics()
  });
});

// Join a topic :D
app.post('/api/topic/:topic/join', (req, res) => {
  let topic = req.params.topic,
    socketId = req.body.uuid;

  // Join a room
  // TODO: Validate clientId
  let room = topics.joinRoom(topic, socketId);
  res.json({
    room: {
      id: room.id
    }
  });
});

// Don't allow users to join directly
app.get('/api/topic/:topic/chat', (req, res) => {
  res.redirect('/topic/:topic');
});

app.get('*', (req, res) => {
  res.sendfile(path.join(__dirname, 'client/build', 'index.html'));
});

const buildUser = socket => {
  let id = UUID();
  return {
    client: {
      id,
      name: Random.name(),
      color: Random.color(),
      publicKey: undefined
    },
    socket,
    room: {}
  }
}

io.on('connection', socket => {
  // Return the socket
  let user = buildUser(socket);
  socket.clientId = user.client.id;
  users[socket.id] = user;

  // Emit the information of the user
  socket.emit('ready', { client: user.client, uuid: socket.id });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    // Notify room
    let user = users[socket.id];
    if (user && user.room && user.room.id !== undefined) {
      // Notify users
      topics.leaveRoom(user.room.topic, user.room.id, socket.id);
      // Emit users
      io.sockets.in(user.room.id).emit('user leave', user.client);
    }

    // Remove the user
    delete users[socket.id];
  });

  socket.on('join room', (data) => {
    console.log('New user in the room: ' + data.room);
    let user = users[socket.id];
    user.room = { id: data.room, topic: data.topic };
    user.client = Object.assign({}, user.client, { publicKey: data.publicKey });
    // Emit new user
    io.sockets.in(user.room.id).emit('user join', user.client);
    // Emit current users
    socket.emit('current users',
      topics.roomUsers(user.room.topic, user.room.id, socket.id).map(socketId => {
        return users[socketId].client;
      })
    );
    // Join current one
    socket.join(user.room.id);
  });

  socket.on('leave room', () => {
    let user = users[socket.id];
    console.log('User left room: ' + user.room.id);

    if (user && user.room && user.room.id !== undefined) {
      socket.leave(user.room.id);
      topics.leaveRoom(user.room.topic, user.room.id, socket.id);

      // Emit new user
      io.sockets.in(user.room.id).emit('user leave', user.client);
    }
  });

  socket.on('send message', (data) => {
    let user = users[socket.id],
      message = { text: data.text, user: user.client };
    io.sockets.in(user.room.id).emit('new message', message);
  });
});

// Create the server
http.listen(port, () => {
  console.log('Our app is running on http://localhost:' + port);
});
