var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/serviceWorker.js");
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});


// Detects if device is on iOS 
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test( userAgent );
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && isInStandaloneMode ) {
  this.setState({ showInstallMessage: true });

  document.body.innerHTML = "<div id='popup'><div class='popup-close-icon'>&times;</div><h4>Add Our App?</h4><p>Tap below to add an icon to your home screen for quick access!</p></div>"
}



