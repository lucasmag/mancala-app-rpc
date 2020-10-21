<template>
  <div>
      <Mancala></Mancala>
    
  </div>
</template>

<script>
import Mancala from './Mancala.vue'

export default {
  name: 'Home',
  components: {
    Mancala
  },
  data() {
    return { 

    }
  },
  methods: {
    sendMessage: function() {
      
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

<style scoped>

</style>
