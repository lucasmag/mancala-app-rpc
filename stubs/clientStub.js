const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("mancala.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const mancalaPackage = grpcObject.mancalapackage

const clientpackageDef = protoLoader.loadSync("client.proto", {})
const grpcClientObject = grpc.loadPackageDefinition(clientpackageDef)
const clientpackage = grpcClientObject.clientpackage

const window = require('electron-main-window').getMainWindow();

function createClientServer(clientHost) {
    console.log("Tentando criar clientServer: " + clientHost);
    const server = new grpc.Server();
    server.bind(clientHost, grpc.ServerCredentials.createInsecure())
    server.addService(clientpackage.Client.service,
        {
            "updateState": updateState,
            "broadcastMessages": broadcastMessages,
            "startGame": startGame
        });

    server.start()
    console.log("gRPC clientHost started! Serving at " + clientHost);
}

function updateState(call, callback) {
    window.webContents.send('updateState', call.request)
    callback(null, {})
}

function broadcastMessages(call, callback) {
    window.webContents.send('messages', call.request.messages)
    callback(null, {})
}

function startGame(call, callback) {
    window.webContents.send('startGame', call.request)
    callback(null, {})
}

function getServerConnection(serverHost) {
    const server = new mancalaPackage.Mancala(serverHost, grpc.credentials.createInsecure())
    return server
}

module.exports = { getServerConnection, createClientServer }