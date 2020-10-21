const io = require('socket.io')(4113, { serveClient: false });


  // Chatroom
  var room = {
    users: [],
    messages: []
  };


io.on('connection', function (socket) {
    console.log('Mancala server initialized.')

    console.log(socket.user)

    socket.on('message', (msg) => {
        io.emit('message', msg);
    });
});