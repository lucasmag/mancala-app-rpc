<template>
    <div class="board">
        <Bean/>
        <div class="grid-container">
            <div v-for="(isBase, hole) in holes" :key="hole" :class="hole">
                <Hole :isBase="isBase"/>
            </div>

        </div>
    </div>
</template>

<script>
import { Board } from "../models/Board.js";
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
            holes: {
                "zero": false, 
                "one": false, 
                "two": false, 
                "three": false,
                "four": false,
                "five": false,
                "six": true,
                "seven": false,
                "eight": false,
                "nine": false,
                "ten": false,
                "eleven": false,
                "twelve": false,
                "thirteen": true
                }
        };
    },
    methods: {
        move: function() {
            const position = this.$refs.base1.getBoundingClientRect()
            console.log(position);
        }
    },
    created() {
        let board = new Board();
        console.log(board);
        board.holes[0].move();
        board.holes[11].move();
        board.holes[0].move();
        board.holes[10].move();
        board.holes[0].move();
        board.holes[11].move();

        console.log(board);
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
