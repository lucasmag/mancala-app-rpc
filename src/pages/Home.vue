<template>
    <div class="main">
        <h1 style="padding: 50px 0">Mancala</h1>

        <div class="options">
            <md-field>
                <label>Endereço do servidor</label>
                <md-input v-model="serverAddress" placeholder="localhost:40000"></md-input>
            </md-field>
            <md-button class="md-primary md-raised button" @click="startServer()">Criar servidor</md-button>

            <md-field>
                <label>Endereço desde jogo</label>
                <md-input v-model="clientAddress" placeholder="Digite o endereço desde cliente" ></md-input>
            </md-field>

            <md-field>
                <label>Nome do jogador</label>
                <md-input v-model="username"></md-input>
            </md-field>

            <md-button class="md-primary md-raised button" @click="startGame()">Entrar</md-button>
        </div>

    </div>
</template>

<script>

export default {
    name: "Home",
    data() {
        return {
            isHost: false,
            addressExists: false,
            serverAddress: 'localhost:40000',
            clientAddress: '',
            username: ''
        };
    },
    methods: {
        startServer: function () {
            this.isHost = true
            console.log("ehhehehehe")
            // this.$server.createServer(this.serverAddress)
            this.$server.sendSync('startServer', this.serverAddress)
        },
        startGame: function () {

            //Cria clientServer
            const clientStub = this.$clientStub
            console.log("cliente: " + this.clientAddress)
            clientStub.createClientServer(this.clientAddress)

            const conn = clientStub.getServerConnection(this.serverAddress)

            conn.newClient({"address": this.clientAddress }, (err, response) => {
                console.log(err)
                console.log("Dados do jogo: " + JSON.stringify(response));
            })

            // if (this.roomExists) {
            //     this.$socket.emit('enterRoom', {'roomId': this.roomId, 'player':this.username})
            //     this.$router.push({name: 'game', params: { 'username': this.username, isHost: this.isHost}});
            // }
        },
        verifyAdress: function() {
            this.addressExists = true
        }
    },
        sockets: {
            roomExists(exists) {
                this.roomExists = exists
            },
            roomIsFull(roomId) {
                console.log(roomId + ' sala tá cheia');
            }

    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.options {
    padding: 0;
    height:-webkit-fill-available;
    width: 300px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}


.md-dialog /deep/.md-dialog-container {
    max-width: 768px;
    padding: 30px
}

.warning {
    color: rgb(185, 73, 73);
    font-style: oblique;
}

.button {
    margin: 0px;
}
</style>
