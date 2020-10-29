<template>
   <md-dialog :md-active.sync="restartDialog" class="dialog">
            <md-dialog-title style="text-align: center">Reiniciar</md-dialog-title>

            <slot></slot>

            <md-dialog-actions>
                <md-button class="md-primary" @click="restartDialog = false"
                    >Cancelar</md-button
                >
                <md-button class="md-primary" @click="restartGame()"
                    >Reiniciar</md-button
                >
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
export default {
    name: "Chat",
    props: {
        title: String,
        action: String,
    },
    data() {
        return {
            messages: [],
            toSend: "",
            isConnected: false,
        };
    },
    methods: {
        sendMessage: function () {
            const data = { "user": this.username, "message": this.toSend, "roomId": this.roomId }
            this.$socket.emit("message", data);
            
        },
    },
    created() {
        this.$socket.emit("getMessages", this.roomId);
    },
    sockets: {
        message(data) {
            console.log(data);
            this.messages = data
            this.toSend = "";
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(221, 221, 221);
}

.toSend {
    display: flex;
    gap: 4px;
    bottom: 0;
    align-items: center;
    position: absolute;
    width: fit-content;
}

.messages {
    height: 100%;
    margin: 0;
    overflow-y: scroll;
    padding: 20px;
    width: 400px;
}

.input-message {
    margin: 0;
    resize: none;
    width: 100%;
}

.chatArea {
    padding-bottom: 60px;
    height: 100vh;
}

.log {
    margin: 5px;
    text-align: start;
}

ul {
    list-style: none;
    overflow-wrap: break-word;
}
</style>
