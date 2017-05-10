const express = require('express'),
 app = express();

// Static files
app.use(express.static('build'));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/status.json', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('*', function(req, res) {
  res.sendfile(__dirname + '/build/index.html');
});

// Create the server
app.listen(3001);
