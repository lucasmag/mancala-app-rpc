<template>
  <div class="base">
      <Mancala class="mancala" :isHost="isHost" :roomId="roomId" :player="username"></Mancala>
      <Chat class="chat" :username="username" :roomId="roomId"></Chat>
  </div>
</template>

<script>
import Mancala from '../components/Mancala'
import Chat from '../components/Chat'


export default {
  name: 'Game',
  components: {
    Mancala,
    Chat
  },
  props: ['username', 'roomId', 'isHost'],
}
</script>

<style scoped>
.mancala {
    width: -webkit-fill-available;
}
  .base {
    align-items: center;
    display: flex;
    width: 100%;
    height: 100%;
  } 

  .chat {
      height: -webkit-fill-available;
  }

</style>
