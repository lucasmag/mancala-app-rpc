
const io = require('socket.io')(4113, { serveClient: false });
import { Board } from './models/Board.js'
import { action } from './enums/action.js'

// Estrutura de uma sala
//  "D0R3C": {
//     players: [ 'Lucas', 'Ana' ],
//     messages: [
//         {'user': 'Lucas',
//         'message: 'Olá!',
//         'date: 2020-10-18 13:23:03'
//     ],
//     gameState: [
//       4, 4, 0, 5, 5, 5,
//       1, 4, 4, 4, 4, 4,
//       4, 0
//     ]
//   }

let rooms = {}
let boards = {}

function getDate(){
    let d = new Date()
    let datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    
    return datestring
}

io.on('connection', function (socket) {    

    socket.on('message', (data) => {
        rooms[data.roomId].messages.push({
            'user': data.user, 
            'message': data.message,
            'date': getDate()
        })
        io.to(data.roomId).emit('message', rooms[data.roomId].messages)
    });

    socket.on('makeMove', (data) => {
      const result = boards[data.roomId].makeMove(data.holeIndex)
      console.log (result)
      io.to(data.roomId).emit('updateState', result)
    });

    socket.on('roomExists', (roomId) => {
        const roomExists = roomId in rooms
        io.emit('roomExists', roomExists)
    });

    socket.on('enterRoom', (data) => {
        console.log(rooms);
        console.log(rooms[data.roomId].players.length)
        if (rooms[data.roomId].players.length < 2) {
            rooms[data.roomId].players.push(data.player)
            console.log(rooms)
    
            socket.join(data.roomId);
            if (rooms[data.roomId].players.length == 2) 
                io.emit('startGame', rooms[data.roomId])
        } else {
            io.emit('roomIsFull', data.roomId)
        }
    });

    socket.on('createRoom', (roomId) => {
        let board = new Board()

        rooms[roomId] = {
            'players': [], 
            'messages': [], 
            'gameState': board.getState()
        }

        boards[roomId] = board

        io.emit('roomExists', true)
    });

    socket.on("getMessages", roomId => {
        io.to(roomId).emit('message', rooms[roomId].messages)
    })

    socket.on("restartGame", roomId => {
        let gameState = boards[roomId].toInitialState()

        let result = {
            'gameState': gameState,
            'action': action.RESTART,
        }

        io.to(roomId).emit('updateState', result)
    })

    socket.on("giveUpGame", roomId => {
        let gameState = boards[roomId].toInitialState()

        let result = {
            'gameState': gameState,
            'action': action.GIVE_UP,
        }

        io.to(roomId).emit('updateState', result)
    })
});