
const io = require('socket.io')(4113, { serveClient: false });
import { Board } from '../models/Board.js'


let board = new Board()

  // Chatroom
  var room = {
    id: '',
    users: [],
    messages: [

    ]
  };
  var rooms = []

io.on('connection', function (socket) {
    console.log('Mancala server initialized.')
    
    io.emit('startGame', board.getState())

    socket.on('message', (data) => {
        io.to(data.room).emit('message', data)
    });

    socket.on('make move', (holeIndex) => {
      const holesState = board.makeMove(holeIndex)
      io.to(data.room).emit('updateState', holesState)
    });

    socket.on("join", roomName => {
      socket.join(roomName);
    })

});