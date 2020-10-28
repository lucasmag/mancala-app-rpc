
const io = require('socket.io')(4113, { serveClient: false });
import { Board } from '../models/Board.js'


let board = new Board()
let totalPlayers = 0

let rooms = []


io.on('connection', function (socket) {
    console.log('Mancala server initialized.')
    

    socket.on('message', (data) => {
        
        io.to(data.roomId).emit('message', data)
    });

    socket.on('makeMove', (data) => {
      const result = board.makeMove(data.holeIndex)
      console.log (result)
      io.to(data.roomId).emit('updateState', result)
    });

    socket.on('roomExists', (roomId) => {
        const roomExists = rooms.includes(roomId)
        io.emit('roomExists', roomExists)
    });

    socket.on('createRoom', (data) => {
        console.log('sala criada' + data)
        rooms.push(data)
        io.emit('roomExists', true)
    });

    socket.on("join", data => {
        socket.join(data);

        totalPlayers++
        if (totalPlayers == 2) io.emit('startGame', board.getState())
    })

    socket.on("joinGame", data => {
        socket.join(data);
    })

});