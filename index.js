const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');

/*
* Redirect to https
*/
/*app.get('/', function(req, res) {
  res.redirect('https://' + req.headers.host + req.url);
})*/

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.all("*", function (req, resp, next) {
  if (req.params[0].substr(-5,5) === '.html') return

  resp.sendFile(__dirname + req.params[0]); // router
});


io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
