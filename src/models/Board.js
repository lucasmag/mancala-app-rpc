import { Hole } from './Hole.js'


export class Board {
    constructor(){
        this.holesState = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]

        this.holes = new Array(14)
        this.holes[13] = new Hole(0, true, '')

        for (let x = 12; x >= 0 ; x--) {
            this.holes[x] = new Hole(4, this.holes[x+1])
        }

        this.holes[13].nextHole = this.holes[0]

        this.holes[6].beansQuantity = 0;
    }

    makeMove(holeIndex){
        this.holes[holeIndex].move()
        this.holesState = this.holes.map((hole) => { return hole.beansQuantity })
        console.log(this.holesState);
        return this.holesState
    }
}