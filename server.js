const express = require('express');

const app = express();

let connections = [];
let users = [];

app.use(express.static('./public'));

const server = app.listen(3000);
const io = require('socket.io').listen(server);

io.sockets.on('connection', socket => {
  
  socket.once('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();

    console.log('Disconnected: %s sockets connected', connections.length);
    
    io.emit('disconnect');
  });

  socket.on('addMessage', payload => {
    let message = {
      timeStamp: payload.timestamp,
      text: payload.text
    };

    io.emit('messageAdded', message);
  });
  
  connections.push(socket);

  console.log('Connected: %s sockets connected', connections.length);
});

console.log('Server is running on port 3000');