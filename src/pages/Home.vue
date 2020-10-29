<template>
    <div class="main">
        <h1 style="padding: 50px 0">Mancala</h1>

        <div class="options">
            <md-button class="md-primary md-raised button" @click="showCreateRoomDialog()">Criar sala</md-button>
            <md-button class="md-primary md-raised button" @click="showEnterRoomDialog()">Entrar em sala</md-button>
        </div>

        <!-- CREATE NEW ROOM-->
        <md-dialog :md-active.sync="createRoomDialog" class="dialog">
            <md-dialog-title style="text-align: center">Criar nova sala</md-dialog-title>

            <h3 style="text-align: center">{{this.roomId}}</h3>

            <md-field>
                <label>Nome de usuário</label>
                <md-input v-model="username"></md-input>
            </md-field>

            <md-dialog-actions>
                <md-button class="md-primary" @click="createRoomDialog = false"
                    >Cancelar</md-button
                >
                <md-button class="md-primary" @click="createAndEnterGame()"
                    >Criar</md-button
                >
            </md-dialog-actions>
        </md-dialog>

        <!-- ENTER EXISTING NEW ROOM-->

        <md-dialog :md-active.sync="enterRoomDialog"  class="dialog">
            <md-dialog-title>Entrar em sala existente</md-dialog-title>
            
            <md-field>
                <label>Código da sala</label>
                <md-input v-model="roomId" @change="verifyRoom"></md-input>
            </md-field>
            <span v-if="!roomExists && this.roomId" class="warning">Sala não existe!</span>

            <md-field>
                <label>Nome de usuário</label>
                <md-input v-model="username"></md-input>
            </md-field>

            <md-dialog-actions>
                <md-button class="md-primary" @click="enterRoomDialog = false">Cancelar</md-button>
                <md-button class="md-primary" @click="enterGame()">Entrar</md-button>
            </md-dialog-actions>
        </md-dialog>
        </div>
</template>

<script>
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890ABCDEF', 5)

export default {
    name: "Home",
    data() {
        return {
            enterRoomDialog: false,
            createRoomDialog: false,
            username: '',
            roomId: '',
            isHost: false,
            roomExists: false
        };
    },
    methods: {
        showCreateRoomDialog: function () {
            this.createRoomDialog = true
            this.roomId = nanoid()
        },
        showEnterRoomDialog: function () {
            this.enterRoomDialog = true;
        },
        createAndEnterGame: function() {
            this.isHost = true

            this.$socket.emit('createRoom', this.roomId)
            this.$socket.emit('enterRoom', {'roomId': this.roomId, 'player':this.username})

            this.$router.push({name: 'game', params: { username: this.username, roomId: this.roomId, isHost: this.isHost}});
        },
        enterGame: function () {
            if (this.roomExists) {
                console.log('tomar no cu');
                this.$socket.emit('enterRoom', {'roomId': this.roomId, 'player':this.username})
                this.$router.push({name: 'game', params: { 'username': this.username, roomId: this.roomId, isHost: this.isHost}});
            }
        },
        verifyRoom: function() {
            this.$socket.emit('roomExists', this.roomId)
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
    position: absolute;
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
