const express = require('express'),
  basicAuth = require('express-basic-auth'),
  app = express();

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

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/status.json', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('*', (req, res) => {
  res.sendfile(__dirname + '/build/index.html');
});

// Create the server
app.listen(port, () => {
  console.log('Our app is running on http://localhost:' + port);
});
