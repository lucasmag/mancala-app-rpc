import { Hole } from './Hole.js'


export class Board {
    holes = new Array(14);
    player1;
    player2;

    constructor(){
        this.holes[13] = new Hole(0, true, '');

        for (let x = 12; x >= 0 ; x--) {
            this.holes[x] = new Hole(4, false, this.holes[x+1])
        }

        this.holes[13].nextHole = this.holes[0];

        this.holes[6].beansQuantity = 0;
        this.holes[6].isBase = true;
    }

}