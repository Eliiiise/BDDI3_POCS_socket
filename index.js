const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

app.get('/styles/index.css', (req, res) => {
  res.sendFile(__dirname + '/frontend/styles/index.css');
});

app.get('/scripts/index.js', (req, res) => {
  res.sendFile(__dirname + '/frontend/scripts/index.js');
});

app.get('/manifest.json', (req, res) => {
  res.sendFile(__dirname + '/frontend/manifest.json');
});

app.get('/serviceWorker.js', (req, res) => {
  res.sendFile(__dirname + '/frontend/serviceWorker.js');
});


io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
