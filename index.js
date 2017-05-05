const express = require('express'),
  app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/status.json', (req, res) => {
  res.json({ status: 'ok' });
});

// Create the server
const server = app.listen(3001);