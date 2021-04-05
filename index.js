const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.all("*", function (req, resp, next) {
  resp.sendFile(__dirname + '/frontend/' + req.params[0]); // router
  res.redirect('https://' + req.headers.host + req.url);
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
