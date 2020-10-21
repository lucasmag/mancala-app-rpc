<template>
    <div class="board">
        <div style="margin: auto; display: flex">

        <div class="base1"></div>

        <div class="basic-holes">
            <div class="p1">
                <Hole v-for="todo in player1" v-bind:key="todo"></Hole>
            </div>
            <div class="p2">
                <Hole v-for="todo in player2" v-bind:key="todo"></Hole>
            </div>
        </div>

        <div class="base2"></div>


        </div>


    </div>
</template>

<script>
import { Board } from "../models/Board.js";
import Hole from "./Hole.vue";

export default {
    name: "Mancala",
    components: {
        Hole,
    },
    data() {
        return {
            player1: [0, 0, 0, 0, 0, 0],
            player2: [0, 0, 0, 0, 0, 0],
        };
    },
    methods: {},
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
    width: 80vw;
    height: 30vw;
    background-color: bisque;
    padding: 20px;
    display: flex;
}

.p1, .p2 {
	display: flex;
    width:inherit
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

</style>
