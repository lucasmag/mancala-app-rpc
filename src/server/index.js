
const io = require('socket.io')(4113, { serveClient: false });


  // Chatroom
  var room = {
    users: [],
    messages: []
  };

  let holes = {
    0: {"class": "zero", "isBase": false, "beansQtt": 4},
    1: {"class": "one", "isBase": false, "beansQtt": 4},
    2: {"class": "two", "isBase": false, "beansQtt": 4},
    3: {"class": "three", "isBase": false, "beansQtt": 4},
    4: {"class": "four", "isBase": false, "beansQtt": 4},
    5: {"class": "five", "isBase": false, "beansQtt": 4},
    6: {"class": "six", "isBase": true, "beansQtt": 0},
    7: {"class": "seven", "isBase": false, "beansQtt": 4},
    8: {"class": "eight", "isBase": false, "beansQtt": 4},
    9: {"class": "nine", "isBase": false, "beansQtt": 4},
    10: {"class": "ten", "isBase": false, "beansQtt": 4},
    11:{"class": "eleven", "isBase": false, "beansQtt": 4},
    12: {"class": "twelve", "isBase": false, "beansQtt": 4},
    13: {"class": "thirteen", "isBase": true, "beansQtt": 0},
  }


io.on('connection', function (socket) {
    console.log('Mancala server initialized.')
    io.emit('startGame', holes)

    socket.on('message', (msg) => {
        io.emit('message', msg);
    });

    socket.on('makeMove', (move) => {
      io.emit('makeMove', move);
    });
});