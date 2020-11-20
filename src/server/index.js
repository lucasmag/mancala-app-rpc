const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("mancala.proto", {includeDirs: ['../']})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const mancalaPackage = grpcObject.mancalapackage;

const clientpackageDef = protoLoader.loadSync("client.proto", {includeDirs: ['../']})
const grpcClientObject = grpc.loadPackageDefinition(clientpackageDef)
const clientpackage = grpcClientObject.clientpackage

import { Board } from "../models/Board"
import { action } from '../enums/action.js' 

let board = new Board()

// Estrutura da sala
// room: {
//     players: [ 'Lucas', 'Ana' ],
//     messages: [
//         {'user': 'Lucas',
//         'message: 'Olá!',
//         'date: 2020-10-18 13:23:03'}
//     ],
//     gameState: [
//       4, 4, 0, 5, 5, 5,
//       1, 4, 4, 4, 4, 4,
//       4, 0
//     ]]
// }

let room = {}
let messages = []
let players = []
let clients = []

export function createServer(serverAdress) {
    if (serverAdress) {

        const server = new grpc.Server();
        server.bind(serverAdress, grpc.ServerCredentials.createInsecure())
        server.addService(mancalaPackage.Mancala.service,
            {
                "newClient": newClient,
                "sendMessage": sendMessage,
                "makeMove": makeMove,
                "getMessages": getMessages,
                "restartGame": restartGame,
                "giveUpGame": giveUpGame,
            });
    
        server.start()
        console.log("gRPC server started!")
    }
}

//===============================================================

function newClient(call, callback) {

    let client = new clientpackage.Client(call.request["address"], grpc.credentials.createInsecure())

    clients.push(client)
    players.push(call.request.username)

    if (clients.length == 2) {

        room = {
            'players': players, 
            'messages': messages, 
            'gameState': board.getState()
        }
    
        clients.forEach(client => {
            client.startGame(room , () => {})
        });
    }
}

function getDate(){
    let d = new Date()
    let datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    
    return datestring
}

function sendMessage(call, callback) {
    messages.push({
        'user': call.request.user, 
        'message': call.request.message,
        'date': getDate()
    }) 
    console.log(call);

    clients.forEach(client => {
        client.broadcastMessages({"messages": messages} , () => {})
    });
}

function makeMove(call, callback) {
    let result = board.makeMove(call.request.holeIndex)
    
    clients.forEach(client => {
        client.updateState(result , () => {})
    });
}

function getMessages(call, callback) {
    callback(null, {"messages": messages})
}

function restartGame(call, callback) {

    let result = {
        'gameState': board.toInitialState(),
        'action': action.RESTART,
    }

    clients.forEach(client => {
        client.updateState(result , () => {})
    });
}

function giveUpGame(call, callback) {

    let result = {
        'gameState': board.toInitialState(),
        'action': action.GIVE_UP,
    }

    clients.forEach(client => {
        client.updateState(result , () => {})
    })
}