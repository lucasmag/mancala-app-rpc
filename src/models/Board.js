import { Hole } from './Hole.js'
import { holeType } from '../enums/baseType.js' 


export class Board {
    constructor(){
        this.gameState = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]

        this.holes = new Array(14)
        this.holes[13] = new Hole(0, '', holeType.ORDINARY)
        this.holes[12] = new Hole(4, this.holes[13], holeType.ORDINARY)
        this.holes[11] = new Hole(4, this.holes[12], holeType.ORDINARY)
        this.holes[10] = new Hole(4, this.holes[11], holeType.ORDINARY)
        this.holes[9] = new Hole(4, this.holes[10], holeType.ORDINARY)
        this.holes[8] = new Hole(4, this.holes[9], holeType.ORDINARY)
        this.holes[7] = new Hole(4, this.holes[8], holeType.ORDINARY)
        this.holes[6] = new Hole(0, this.holes[7], holeType.ORDINARY)
        this.holes[5] = new Hole(4, this.holes[6], holeType.ORDINARY)
        this.holes[4] = new Hole(4, this.holes[5], holeType.ORDINARY)
        this.holes[3] = new Hole(4, this.holes[4], holeType.ORDINARY)
        this.holes[2] = new Hole(4, this.holes[3], holeType.ORDINARY)
        this.holes[1] = new Hole(4, this.holes[2], holeType.ORDINARY)
        this.holes[0] = new Hole(4, this.holes[1], holeType.ORDINARY)

        this.holes[13].nextHole = this.holes[0]

    }

    makeMove(holeIndex){
        this.changeTurn(holeIndex)
        console.log(this.holes.map((hole) => { return hole.type }));

        let playAgain = this.holes[holeIndex].move(holeIndex)

        this.gameState = this.holes.map((hole) => { return hole.beansQuantity })
        
        return {
            'gameState': this.gameState,
            'playAgain': playAgain,
        }
    }

    getState(){
        return this.gameState
    }

    changeTurn(holeIndex){
        if(holeIndex < 7) {
            this.holes[13].setType(holeType.OPONENT_BASE)
            this.holes[6].setType(holeType.MY_BASE)
        } else {
            this.holes[6].setType(holeType.OPONENT_BASE)
            this.holes[13].setType(holeType.MY_BASE)
        }
    }
}