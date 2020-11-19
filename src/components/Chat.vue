<template>
    <div class="chat">
        <div class="chatArea">
            <ul class="messages">
                <li class="log"
                    v-for="message in messages"
                    v-bind:key="message.message">
                    <div style="margin-bottom: 3px">
                    <span style="font-size: 12px; margin-right: 5px; color: #888"> {{ message.date }} </span>
                    <b>{{ message.user }}:</b> {{ message.message }}
                    </div>

                </li>
            </ul>
        </div>
        <div class="toSend">
            <md-field>
                <md-textarea v-model="toSend" md-autogrow></md-textarea>
            </md-field>

            <md-button class="md-primary" @click="sendMessage">Enviar</md-button>
        </div>
    </div>
</template>

<script>
const ipc = window.require('electron').ipcRenderer


export default {
    name: "Chat",
    props: ["username", "conn"],
    data() {
        return {
            messages: [],
            toSend: "",
            isConnected: false,
        };
    },
    methods: {
        sendMessage: function () {
            if (this.toSend !== ''){
                const data = { "user": this.username, "message": this.toSend }

                this.conn.sendMessage(data, () => {})

                this.toSend = ''
            }            
        },
    },
    created() {
        this.conn.getMessages({}, (err, response) => {
            this.messages = response.messages
        })

        ipc.on('messages', (event, data) => {
            console.log(data);
            this.messages = data
        })

    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(230, 230, 230);
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
