<template>
    <div class="chat">
        <div class="chatArea">
            <ul class="messages">
                <li class="log"
                    v-for="message in messages"
                    v-bind:key="message.data">
                    <b>
                        {{ message.user }}:
                    </b> {{ message.data }}
                </li>
            </ul>
        </div>
        <div class="message">
            <md-field>
                <md-textarea v-model="toSend" md-autogrow></md-textarea>
            </md-field>

            <md-button class="md-primary md-raised" @click="sendMessage">Enviar</md-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Chat",
    props: {
        username: String,
        roomId: String,
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
            const data = { "user": this.username, "data": this.toSend, "roomId": this.roomId }
            this.$socket.emit("message", data);
            
        },
    },
    created() {
        console.log('chat criado');
        this.$socket.emit("join", this.roomId);
    },
    sockets: {
        message(data) {
            console.log(data);
            this.messages.push(data);
            this.toSend = "";
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
</style>
