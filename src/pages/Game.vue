<template>
  <div class="base">
      <Mancala></Mancala>
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
  props: ['username', "roomId"],
  data() {
    console.log("aaaaaaaa" + this.username +  this.roomId)
    return { 

    }
  }
}
</script>

<style scoped>
  .base {
    display: flex;
  } 

</style>
