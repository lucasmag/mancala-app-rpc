const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("mancala.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const mancalaPackage = grpcObject.mancalapackage

const clientpackageDef = protoLoader.loadSync("client.proto", {})
const grpcClientObject = grpc.loadPackageDefinition(clientpackageDef)
const clientpackage = grpcClientObject.clientpackage


function createClientServer(clientHost) {
    console.log("Tentando criar clientServer: " + clientHost);
    const server = new grpc.Server();
    server.bind(clientHost, grpc.ServerCredentials.createInsecure())
    server.addService(clientpackage.Client.service,
        {
            "updateGameData": updateGameData,
            "updateMessages": updateMessages,
        });

    server.start()
    console.log("gRPC clientHost started! Serving at " + clientHost);
}

function updateGameData(call, callback) {
    console.log(call)

    callback(null, {})
}

function updateMessages(call, callback) {
    console.log(call)

    callback(null, {})
}

function getServerConnection(serverHost) {

    const server = new mancalaPackage.Mancala(serverHost, grpc.credentials.createInsecure())

    return server
}

module.exports = { getServerConnection, createClientServer }