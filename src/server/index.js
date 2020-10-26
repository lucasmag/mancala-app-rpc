
const io = require('socket.io')(4113, { serveClient: false });
import { Board } from '../models/Board.js'


let board = new Board()

  // Chatroom
  var room = {
    users: [],
    messages: []
  };

io.on('connection', function (socket) {
    console.log('Mancala server initialized.')
    
    io.emit('startGame', board.getState())

    socket.on('message', (msg) => {
        io.emit('message', msg)
    });

    socket.on('makeMove', (holeIndex) => {
      const holesState = board.makeMove(holeIndex)
      io.emit('updateState', holesState)
    });
});