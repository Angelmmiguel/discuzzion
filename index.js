const express = require('express'),
  app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/status.json', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3001);