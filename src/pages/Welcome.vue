<template>
  <div class="">
      <h1>Mancala</h1>
      <form>
          <input type="text" placeholder="usuário" min="3" required v-model="username">
          <input type="submit" v-on:click="login()">
          <router-link to="/game">Mancala</router-link>
      </form>
  </div>
</template>

<script>


export default {
  name: 'Welcome',
  data() {
    return { 
        username: String
    }
  },
  methods: {
    login: function() {
      console.log("hehehe");

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
  .base {
    display: flex;
  } 

</style>
