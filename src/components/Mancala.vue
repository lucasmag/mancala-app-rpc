<template>
    <div class="background">
        <h3 v-if="!this.readyToPlay">Aguardando jogador...</h3> 
        <h1 v-if="this.readyToPlay" style="color: #BBB;">
            {{this.myTurn ? 'Sua vez' : 'Vez de ' + this.oponent}}
        </h1>

        <div class="board" v-if="this.readyToPlay">
            <div :class="this.isHost ? 'grid-container-host' : 'grid-container-client'">
                <div v-for="(hole, index) in holes" 
                    :key="hole.class" 
                    :class="[hole.class, 'base-center']"
                    >
                    <Hole :isBase="hole.isBase" @click.native="makeMove(index)" :isHost="isHost" :beansQuantity="gameState[index]" :index="index"/>
                </div>
            </div>
        </div>

        <div v-if="this.readyToPlay" class="options">
            <md-button class="md-primary button" @click="restartDialog = true">Reiniciar partida</md-button>
            <md-button class="md-accent button" @click="giveUpDialog = true">Desistir</md-button>
        </div>

        <!-- GIVE UP GAME -->
        <md-dialog :md-active.sync="giveUpDialog" class="dialog">
            <md-dialog-title style="text-align: center">Desistir</md-dialog-title>

            <h3 style="text-align: center; margin: 30px 0">Deseja mesmo desistir da partida?</h3>


            <md-dialog-actions>
                <md-button class="md-primary" @click="giveUpDialog = false"
                    >Cancelar</md-button
                >
                <md-button class="md-primary" @click="giveUpGame()"
                    >Desistir</md-button
                >
            </md-dialog-actions>
        </md-dialog>


        <!-- RESTART GAME -->
        <md-dialog :md-active.sync="restartDialog" class="dialog">
            <md-dialog-title style="text-align: center">Reiniciar</md-dialog-title>

            <h3 style="text-align: center; margin: 30px 0">Deseja mesmo reiniciar a partida?</h3>
            <!-- <h2><b>{{this.oponent}}</b> deverá confirmar essa ação</h2> -->


            <md-dialog-actions>
                <md-button class="md-primary" @click="restartDialog = false"
                    >Cancelar</md-button
                >
                <md-button class="md-primary" @click="restartGame()"
                    >Reiniciar</md-button
                >
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
import Hole from "./Hole.vue";
import { action } from '../enums/action.js' 
const ipc = window.require('electron').ipcRenderer


export default {
    name: "Mancala",
    components: {
        Hole,
    },
    props: ['isHost', 'player', 'conn'],
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
            gameState: [],
            myTurn: this.isHost,
            readyToPlay: false,
            giveUp: false,
            endGame: false,
            oponent: String,
            giveUpDialog: false,
            restartDialog: false,
        };
    
    },
    methods: {
        makeMove: function(holeIndex) {
            const data = {"holeIndex": holeIndex}
            if (this.gameState[holeIndex] > 0) {
                if (this.isHost) {
                    if (holeIndex < 6) {
                        if (this.myTurn) {
                            this.conn.makeMove(data, () => {})
                        }
                            
                    }
                } else {
                    if (holeIndex > 6 && holeIndex < 13) {
                        if (this.myTurn){
                            this.conn.makeMove(data, () => {})
                        }
                    }
                }
            }
                
        },
        showMessage: function(msg){
            this.$toasted.show(msg, { 
                theme: "bubble", 
                position: "top-center", 
                duration : 10000
            });
        },
        restartGame: function() {
            this.restartDialog = false
            this.conn.restartGame({}, () => {})
        },
        giveUpGame: function() {
            this.giveUp = true
            this.giveUpDialog = false
            this.conn.giveUpGame({}, () => {})
        }
    },
    created() {
        ipc.once('startGame', (event, data) => {
            this.readyToPlay = true
            this.gameState = data.gameState
            this.oponent = data.players.filter(p => p != this.player)

            let start = this.isHost ? 'Você' : this.oponent

            this.showMessage(start + ' começa!')
        })

        ipc.on('updateState', (event, data) => {
            switch (data.action) {
                case action.CHANGE_TURN:
                     this.myTurn = !this.myTurn
                     break;

                case action.END_GAME:
                    if (this.myTurn)
                        this.showMessage('Você venceu!')
                    else
                        this.showMessage(this.oponent + ' venceu')
                    break;
                
                case action.RESTART:
                    this.showMessage('Jogo reiniciado')
                    break;

                case action.GIVE_UP:
                    if (!this.giveUp)
                        this.showMessage(this.oponent + 
                        ' desistiu da partida. Você venceu!')
                    else
                        this.showMessage(this.oponent + ' venceu')
                    break;
            }
            
            this.gameState = data.gameState
        })
    },
};
</script>

<style scoped>
.board {
    width: 100%;
    height: 30vw;
    background-color: rgb(221, 221, 221);
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
    background-color:rgb(233, 233, 233);
    margin: 10px;
    border-radius: 30px
}

.background {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(221, 221, 221);
    height: 100vh;
}

.options {
    margin-top: 50px;
}

.grid-container-host {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 5px 5px;
  grid-template-areas:
    "thirteen twelve eleven ten nine eight seven six"
    "thirteen zero one two three four five six";
}

.grid-container-client {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 5px 5px;
  grid-template-areas:
    "six five four three two one zero thirteen"
    "six seven eight nine ten eleven twelve thirteen";
}
.base-center{ align-self: center;}
.thirteen { grid-area: thirteen; }
.six { grid-area: six; }
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

.md-dialog /deep/.md-dialog-container {
    max-width: 768px;
    padding: 30px
}
</style>
