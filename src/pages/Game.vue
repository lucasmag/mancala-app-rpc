<template>
  <div class="base">
      <Mancala :isHost="isHost" :roomId="roomId"></Mancala>
      <Chat :username="username" :roomId="roomId"></Chat>
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
  .base {
    display: flex;
  } 

</style>
