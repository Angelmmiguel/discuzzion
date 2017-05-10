const express = require('express'),
 app = express();

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
