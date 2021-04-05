const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;


/*
* Redirect to https 
*/
/*app.get('/', function(req, res) {  
  res.redirect('https://' + req.headers.host + req.url);
})*/

app.all("*", function (req, resp, next) {
  resp.sendFile(__dirname + '/frontend/' + req.params[0]); // router
});



io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);

  // Detects if device is on iOS 
  const isIos = () => {
    console.log("ios")
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent );
  }
  // Detects if device is in standalone mode
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

  // Checks if should display install popup notification:
  if (isIos() && !isInStandaloneMode()) {
    this.setState({ showInstallMessage: true });
  }
});


