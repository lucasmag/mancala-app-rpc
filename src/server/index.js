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
    console.log("Client trying to connect: " + call.request.address)

    let client = new clientpackage.Client(call.request["address"], grpc.credentials.createInsecure())

    clients.push(client)
    players.push(call.request["username"])

    // if (clients.length == 2) {
    //     let board = new Board()

    //     room = {
    //         'players': players, 
    //         'messages': messages, 
    //         'gameState': board.getState()
    //     }
    
    //     clients.forEach(client => {
    //         client.sendMessages({"startGame": room} , (err, response) => {
    //             console.log(err)
    //         })
    //     });
    // }
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

    clients.forEach(client => {
        client.broadcastMessages({"messages": messages} , (err, response) => {
            console.log(err)
        })
    });
}

function makeMove(Hole) {

}

function getMessages(call, callback) {
    callback(null, {"messages": messages})
}

function restartGame(None) {

}

function giveUpGame(None) {

}