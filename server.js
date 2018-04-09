const express = require('express');

const app = express();

let connections = [];
let users = [];

app.use(express.static('./public'));

const server = app.listen(3000);
const io = require('socket.io').listen(server);

io.sockets.on('connection', socket => {
  
  socket.once('disconnect', function () {
    let newUsers = users.filter(user => user.id !== this.id);
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();

    console.log('Disconnected: %s sockets connected', connections.length);
    
    io.emit('disconnect', newUsers);
  });

  socket.on('addMessage', payload => {
    let message = {
      timeStamp: payload.timestamp,
      text: payload.text,
      user: payload.user
    };

    io.emit('messageAdded', message);
  });

  socket.on('userJoin', function (payload) {
    let user = {
      id: this.id,
      name: payload.name
    };
    
    users.push(user);

    io.emit('userJoined', users);
    console.log('User joined: ' + payload.name);
  });
  
  connections.push(socket);

  console.log('Connected: %s sockets connected', connections.length);
});

console.log('Server is running on port 3000');