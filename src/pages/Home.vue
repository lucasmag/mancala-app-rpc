<template>
    <div class="main">
        <h1 style="padding: 50px 0">Mancala</h1>

        <div class="options">
            <md-switch v-model="createServer">Criar servidor</md-switch>
            <md-field style="margin: 10px 0">
                <label>Endereço do servidor</label>
                <md-input v-model="serverURI" placeholder="localhost:40000"></md-input>
            </md-field>
            <span v-if="serverInUse" class="warning" style="margin-bottom: 10px">Endereço e porta estão em uso!</span>
            <span v-if="serverError" class="warning" style="margin-bottom: 10px">Erro no formato do URI!</span>
            <span v-if="serverDoesntExists" class="warning" style="margin-bottom: 10px">Servidor não existe!</span>


            <md-field style="margin: 10px 0">
                <label>Endereço desde jogo</label>
                <md-input v-model="clientURI" placeholder="Digite o endereço desde cliente" ></md-input>
            </md-field>
            <span v-if="clientInUse" class="warning" style="margin-bottom: 10px">Endereço e porta estão em uso!</span>
            <span v-if="clientError" class="warning" style="margin-bottom: 10px">Erro no formato do URI!</span>


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
            serverInUse: false,
            clientInUse: false,
            serverError: false,
            clientError: false,
            serverDoesntExists: false,
            serverURI: 'localhost:40000',
            clientURI: '',
            username: '',
            createServer: true,

        };
    },
    computed: {
        serverPort: function () { return parseInt(this.serverURI.split(':')[1]) },
        serverAdress: function () { return this.serverURI.split(':')[0] },
        clientPort: function () { return parseInt(this.clientURI.split(':')[1]) },
        clientAddress: function () { return this.clientURI.split(':')[0] }
    },
    methods: {
        checkServer: async function(port, address) {
            const thisVue = this
            console.log(port, address);
            if (port && address) {
                this.serverError = false
                await this.$tcpPortUsed.check(port, address).then(function(inUse) {
                    thisVue.serverInUse = inUse
                }, function(err) { console.error('Error on check:', err.message) });
            } else 
                this.serverError = true

        },
        checkClient: async function(port, address) {
            const thisVue = this
            console.log(port, address);
            if (port && address) {
                this.clientError = false
                await this.$tcpPortUsed.check(port, address).then(function(inUse) {
                    thisVue.clientInUse = inUse
                }, function(err) { console.error('Error on check:', err.message) });
            } else
                this.clientError = true
        },
        startGame: async function () {

            await this.checkServer(this.serverPort, this.serverAdress)
            await this.checkClient(this.clientPort, this.clientAddress)

            if (this.clientInUse) return

            if (this.serverError || this.clientError) return

            if (this.createServer && !this.serverInUse) {
                this.isHost = true
                // this.$server.createServer(this.serverAddress)
                this.$server.sendSync('startServer', this.serverURI)
            } else if (!this.createServer && !this.serverInUse) {
                this.serverDoesntExists = true
             
             return
            }


            //Cria clientServer
            const clientStub = this.$clientStub
            clientStub.createClientServer(this.clientURI)

            const conn = clientStub.getServerConnection(this.serverURI)
            this.$server = conn

            conn.newClient({"address": this.clientURI, "username": this.username}, () => {})

            this.$router.push({name: 'game', params: { 'username': this.username, 'isHost': this.isHost, 'conn': conn}});
            

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
