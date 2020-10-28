<template>
    <div>
        <!-- CREATE NEW ROOM-->
        <md-dialog :md-active.sync="createRoomDialog" class="dialog">
            <md-dialog-title>Criar nova sala</md-dialog-title>

            <h3>{{this.roomId}}</h3>

            <md-field>
                <label>Nome de usuário</label>
                <md-input v-model="username"></md-input>
                <span class="md-helper-text">username</span>
            </md-field>

            <md-dialog-actions>
                <md-button class="md-primary" @click="createRoomDialog = false"
                    >Cancelar</md-button
                >
                <md-button class="md-primary" @click="enterGame()"
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
                <span class="md-helper-text">username</span>
            </md-field>
            <span v-if="!roomExists" class="warning">Sala não existe!</span>

            <md-field>
                <label>Nome de usuário</label>
                <md-input v-model="username"></md-input>
                <span class="md-helper-text">username</span>
            </md-field>

            <md-dialog-actions>
                <md-button class="md-primary" @click="enterRoomDialog = false">Cancelar</md-button>
                <md-button class="md-primary" @click="enterGame()">Entrar</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-button class="md-primary md-raised" @click="createRoom()">Criar sala</md-button>
        <md-button class="md-primary md-raised" @click="enterRoom()">Entrar em sala</md-button>
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
        createRoom: function () {
            this.createRoomDialog = true
            this.roomId = nanoid()
            this.isHost = true
            this.$socket.emit('createRoom', this.roomId)
        },
        enterRoom: function () {
            this.enterRoomDialog = true;
        },
        enterGame: function () {
            if (this.roomExists)
                this.$router.push({name: 'game', params: { username: this.username, roomId: this.roomId, isHost: this.isHost}});
        },
        verifyRoom: function() {
            console.log('changed');
            this.$socket.emit('roomExists', this.roomId)
        }
    },
        sockets: {
            roomExists(data) {
                this.roomExists = data
            },

    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat {
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    background-color: moccasin;
}

.message {
    padding: 0 5px;
    display: flex;
    gap: 4px;
}

.messages {
    height: 100%;
    margin: 0;
    overflow-y: scroll;
    padding: 20px;
}

.input-message {
    margin: 0;
    resize: none;
    width: 100%;
}

.chatArea {
    height: 100%;
    padding-bottom: 60px;
}

.log {
    margin: 5px;
    text-align: start;
}

ul {
    list-style: none;
    overflow-wrap: break-word;
}


.md-dialog /deep/.md-dialog-container {
    max-width: 768px;
    padding: 30px
}

.warning {
    color: rgb(185, 73, 73);
    font-style: oblique;
}
</style>
