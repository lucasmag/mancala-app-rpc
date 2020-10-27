<template>
    <div class="board">
        <Bean/>
        <div class="grid-container">
            <div 
                v-for="(hole, index) in holes" 
                :key="hole.class" 
                :class="hole.class"
                v-on:click="makeMove(index)"
            >
                <Hole :isBase="hole.isBase" :beansQuantity="holesState[index]" :index="index"/>
            </div>
        </div>
    </div>
</template>

<script>
import Hole from "./Hole.vue";
import Bean from "./Bean.vue";


export default {
    name: "Mancala",
    components: {
        Hole,
        Bean
    },
    data() {
        return {
            holes: [
                {"class": "zero", "isBase": false },
                 {"class": "one", "isBase": false },
                 {"class": "two", "isBase": false },
                 {"class": "three", "isBase": false },
                 {"class": "four", "isBase": false },
                 {"class": "five", "isBase": false },
                 {"class": "six", "isBase": true },
                 {"class": "seven", "isBase": false },
                 {"class": "eight", "isBase": false },
                 {"class": "nine", "isBase": false },
                 {"class": "ten", "isBase": false },
                 {"class": "eleven", "isBase": false },
                 {"class": "twelve", "isBase": false },
                 {"class": "thirteen", "isBase": true },
            ],
            holesState: [],
            baseIndex: Number
        };
    },
    methods: {
        move: function() {
            const position = this.$refs.base1.getBoundingClientRect()
            console.log(position);
        },
        makeMove: function(holeIndex) {
            if (holeIndex !== 6 && holeIndex !== 13)
                this.$socket.emit('makeMove', holeIndex)
        }
    },
    sockets: {
        connect() {
        // Fired when the socket connects.
        console.log('client connected');
        this.isConnected = true;
        },

        disconnect() {
        this.isConnected = false;
        },

        // Fired when the server sends something on the "messageChannel" channel.
        updateState(holesState) {
            this.holesState = holesState
        },

        startGame(data) {
            this.holesState = data
        }

    },
};
</script>

<style scoped>
.board {
    width: 100%;
    height: 30vw;
    background-color: bisque;
    padding: 20px;
      display: flex;
  justify-content: center;
  align-items: center;    
}

.p1 {
	display: flex;
    width:inherit
}

.p2 {
	display: flex;
    width:inherit;
}

.basic-holes {
    display: flex;
    flex-direction: column;
}

.base1, .base2 {
    width: 8vw;
    height: 16vw;
    background-color:burlywood;
    margin: 10px;
    border-radius: 30px
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 5px 5px;
  grid-template-areas:
    "thirteen twelve eleven ten nine eight seven six"
    "thirteen zero one two three four five six";
}
.thirteen { grid-area: thirteen; }
.six { grid-area: six; align-self: end;}
.twelve { grid-area: twelve; }
.zero { grid-area: zero; }
.one { grid-area: one; }
.two { grid-area: two; }
.three { grid-area: three; }
.four { grid-area: four; }
.five { grid-area: five; }
.seven { grid-area: seven; }
.eight { grid-area: eight; }
.nine { grid-area: nine; }
.ten { grid-area: ten; }
.eleven { grid-area: eleven; }

</style>
