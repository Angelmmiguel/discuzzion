const express = require('express'),
  basicAuth = require('express-basic-auth'),
  app = express(),
  http = require('http').Server(app),
  bodyParser = require('body-parser'),
  UUID = require('uuid/v4'),
  io = require('socket.io')(http),
  // Project files
  Topics = require('./app/topics.js'),
  Random = require('./app/random.js');

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

// Initialize topics and users!
const users = {},
  topics = new Topics(users);

// Port
const port = process.env.PORT || 3001;

// Static files
app.use(express.static('client/build'));

// Parse JSON body
app.use(bodyParser.json())

// Health
app.get('/api/status.json', (req, res) => {
  res.json({ status: 'ok' });
});

// Join a topic :D
app.post('/api/topic/:topic/join', (req, res) => {
  let topic = req.params.topic,
    clientId = req.body.clientId;

  // Join a room
  // TODO: Validate clientId
  let room = topics.joinRoom(clientId, topic);
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
  res.sendfile(__dirname + '/build/index.html');
});

const buildUser = socket => {
  let id = UUID();
  return {
    client: {
      id,
      name: Random.name(),
      color: Random.color(),
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
  socket.emit('ready', { client: user.client });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    // Notify room
    let user = users[socket.id];
    if (user && user.room && user.room.id !== undefined) {
      // Notify users
      io.sockets.in(user.room.id).emit('leave room', user.client);
      topics.leaveRoom(user);
    }

    // Remove the user
    delete users[socket.userUUID];
  });

  socket.on('join room', (data) => {
    console.log('New user in the room: ' + data.room);
    let user = users[socket.id];
    user.room = { id: data.room };
    // Emit new user
    io.sockets.in(user.room.id).emit('user join', user.client);
    // Join current one
    socket.join(user.room.id);
  });

  socket.on('leave room', () => {
    let user = users[socket.id];
    console.log('New user in the room: ' + user.room.id);
    socket.leave(user.room.id);
    // Emit new user
    io.sockets.in(user.room.id).emit('user leave', user.client);
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
