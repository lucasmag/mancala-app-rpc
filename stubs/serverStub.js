const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("mancala.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const mancalaPackage = grpcObject.mancalapackage;

const clientpackageDef = protoLoader.loadSync("client.proto", {})
const grpcClientObject = grpc.loadPackageDefinition(clientpackageDef)
const clientpackage = grpcClientObject.clientpackage

const Board = require("../src/models/Board")


let room = []
let board = {}
let clients = []

function createServer(serverAdress) {
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
                "newClient": newClient,
            });
    
        server.start()
        createRoom()
        console.log("gRPC server started!")
    }
}

//===============================================================


function createRoom() {
    let newBoard = Board
    newBoard.toInitialState()

    room = {
        'players': [], 
        'messages': [], 
        'gameState': newBoard.getState()
    }
    console.log(room);

    board = newBoard
}

function newClient(call, callback) {
    console.log("Client trying to connect: " + call)
    // const client = new clientpackage.client(address, grpc.credentials.createInsecure())
    clients.push(client)


    callback(null, {"connected": true})
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


module.exports = { createServer }
