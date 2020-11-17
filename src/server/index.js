const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("mancala.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const mancalaPackage = grpcObject.mancalapackage;

const clientpackageDef = protoLoader.loadSync("client.proto", {})
const grpcClientObject = grpc.loadPackageDefinition(clientpackageDef)
const clientpackage = grpcClientObject.clientpackage

import { Board } from "../models/Board"
import { action } from '../enums/action.js' 


let room = []
let board = {}
let clients = []

export function createServer(serverAdress) {
    if (serverAdress) {

        const server = new grpc.Server();
        server.bind(serverAdress, grpc.ServerCredentials.createInsecure())
        server.addService(mancalaPackage.Mancala.service,
            {
                "newClient": newClient,
                "createRoom": createRoom,
                "sendMessage": sendMessage,
                "makeMove": makeMove,
                "getMessages": getMessages,
                "restartGame": restartGame,
                "giveUpGame": giveUpGame,
            });
    
        server.start()
        createRoom()
        console.log("gRPC server started!")
    }
}

//===============================================================


function createRoom() {
    let newBoard = new Board()

    room = {
        'players': [], 
        'messages': [], 
        'gameState': newBoard.getState()
    }
    console.log(room);

    board = newBoard
}

function newClient(call, callback) {
    console.log("Client trying to connect: " + call.request.address)

    let client = new clientpackage.Client(call.request["address"], grpc.credentials.createInsecure())
    clients.push(client)
    console.log(clients);

    let gameData = {
        "gameState": board.getState(),
        "action": action.PLAY_AGAIN
    }

    callback(null, gameData)
}

function sendMessage(Message) {
    
}

function makeMove(Hole) {

}

function getMessages(None) {

}

function restartGame(None) {

}

function giveUpGame(None) {

}