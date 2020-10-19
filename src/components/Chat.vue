<template>
  <div class="hello">
    <h1>Mancala</h1>
    <p>{{ message }}</p>
    <div class="message">
      <textarea rows="2" v-model="toSend" class="input-message"></textarea>
      <button class="send" v-on:click="sendMessage">Enviar</button>
    </div>      
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return { 
      message: "",
      toSend: "",
      isConnected: false,
      socketMessage: ''
    }
  },
  methods: {
    sendMessage: function() {
      this.$socket.emit('message', this.toSend)
    }
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    message(data) {
      this.socketMessage = data

      this.message = this.socketMessage
    }
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .message {
    bottom: 0;
    position: absolute;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .input-message {
    margin: 0;
    resize: none;
  }
</style>
