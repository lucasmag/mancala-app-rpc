import { Hole } from './Hole.js'
import { holeType } from '../enums/holeType.js' 
import { action } from '../enums/action.js' 
import { oposite } from '../enums/opositeHole.js'


export class Board {
    constructor(){
        this.toInitialState()
    }

    makeMove(holeIndex){
        this.changeTurn(holeIndex)

        let action = this.nextAction(holeIndex)

        this.gameState = this.holes.map((hole) => { return hole.beansQuantity })
        
        return {
            'gameState': this.gameState,
            'action': action,
        }
    }
    // And this folks, is what i call XGH
    nextAction(holeIndex){

        let indexOfLastHole = this.holes[holeIndex].move(holeIndex)
        let holeAction = action.CHANGE_TURN

        if (this.holes[indexOfLastHole].type == holeType.MY_BASE)
            holeAction = action.PLAY_AGAIN

        
        else if (this.holes[indexOfLastHole].type == holeType.MY_HOLE &&
            this.holes[indexOfLastHole].beansQuantity == 1) {

            let myHoleBaseIndex = this.holes.filter(h => h.type == holeType.MY_BASE)[0].index

            this.holes[indexOfLastHole].beansQuantity = 0
            this.holes[myHoleBaseIndex].beansQuantity += 1

            let opositeHoleIndex = oposite[indexOfLastHole]

            this.holes[myHoleBaseIndex].beansQuantity += this.holes[opositeHoleIndex].beansQuantity

            this.holes[opositeHoleIndex].beansQuantity = 0
        } 

        let endOfGame = this.checkEndOfGame(holeIndex)

        if (endOfGame) return action.END_GAME
        else return holeAction
    }

    getState(){
        return this.gameState
    }

    // TODO Refat this shit
    changeTurn(holeIndex){
        if(holeIndex < 7) {
            this.holes[13].setType(holeType.OPONENT_BASE)
            this.holes[6].setType(holeType.MY_BASE)

            this.holes[0].setType(holeType.MY_HOLE)
            this.holes[1].setType(holeType.MY_HOLE)
            this.holes[2].setType(holeType.MY_HOLE)
            this.holes[3].setType(holeType.MY_HOLE)
            this.holes[4].setType(holeType.MY_HOLE)
            this.holes[5].setType(holeType.MY_HOLE)

            this.holes[7].setType(holeType.OPONENT_HOLE)
            this.holes[8].setType(holeType.OPONENT_HOLE)
            this.holes[9].setType(holeType.OPONENT_HOLE)
            this.holes[10].setType(holeType.OPONENT_HOLE)
            this.holes[11].setType(holeType.OPONENT_HOLE)
            this.holes[12].setType(holeType.OPONENT_HOLE)

        } else {
            this.holes[13].setType(holeType.MY_BASE)
            this.holes[6].setType(holeType.OPONENT_BASE)

            this.holes[0].setType(holeType.OPONENT_HOLE)
            this.holes[1].setType(holeType.OPONENT_HOLE)
            this.holes[2].setType(holeType.OPONENT_HOLE)
            this.holes[3].setType(holeType.OPONENT_HOLE)
            this.holes[4].setType(holeType.OPONENT_HOLE)
            this.holes[5].setType(holeType.OPONENT_HOLE)

            this.holes[7].setType(holeType.MY_HOLE)
            this.holes[8].setType(holeType.MY_HOLE)
            this.holes[9].setType(holeType.MY_HOLE)
            this.holes[10].setType(holeType.MY_HOLE)
            this.holes[11].setType(holeType.MY_HOLE)
            this.holes[12].setType(holeType.MY_HOLE)
        }
    }

    invertHoleType(holeType) {
        let newType = holeType

        switch (holeType) {
            case holeType.MY_HOLE:
                newType = holeType.OPONENT_HOLE

            case holeType.OPONENT_HOLE:
                newType = holeType.MY_HOLE

            case holeType.MY_BASE:
                newType = holeType.OPONENT_BASE

            case holeType.OPONENT_BASE:
                newType = holeType.MY_BASE
        }

        return newType
    }

    checkEndOfGame(holeIndex) {
        let totalBeans = this.getTotalBeansOfPlayer(holeIndex, false)

        if (totalBeans == 0) {
            return true
        }
        return false
    }

    getTotalBeansOfPlayer(holeIndex, includeBase){
        let start = 0
        let end = 0

        if(holeIndex < 7) {

            start = 0
            end = 6

            if(includeBase) {
                end = 7
            }

        }
        else {

            start = 7
            end = 13

            if(includeBase) {
                end = 14
            }

        }

        let holes = this.holes.slice(start, end)
            
        let total = holes
            .map((hole) => hole.beansQuantity) 
            .reduce((tot, acc) => tot += acc)

        console.log('total--- ' + total);
        return total
    }

    toInitialState() {
        this.gameState = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]
        // this.gameState = [0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0]

        this.holes = new Array(14)
        this.holes[13] = new Hole(this.gameState[13], '', holeType.OPONENT_BASE, 13)
        this.holes[12] = new Hole(this.gameState[12], this.holes[13], holeType.OPONENT_HOLE, 12)
        this.holes[11] = new Hole(this.gameState[11], this.holes[12], holeType.OPONENT_HOLE, 11)
        this.holes[10] = new Hole(this.gameState[10], this.holes[11], holeType.OPONENT_HOLE, 10)
        this.holes[9] = new Hole(this.gameState[9], this.holes[10], holeType.OPONENT_HOLE, 9)
        this.holes[8] = new Hole(this.gameState[8], this.holes[9], holeType.OPONENT_HOLE, 8)
        this.holes[7] = new Hole(this.gameState[7], this.holes[8], holeType.OPONENT_HOLE, 7)
        this.holes[6] = new Hole(this.gameState[6], this.holes[7], holeType.MY_BASE, 6)
        this.holes[5] = new Hole(this.gameState[5], this.holes[6], holeType.MY_HOLE, 5)
        this.holes[4] = new Hole(this.gameState[4], this.holes[5], holeType.MY_HOLE, 4)
        this.holes[3] = new Hole(this.gameState[3], this.holes[4], holeType.MY_HOLE, 3)
        this.holes[2] = new Hole(this.gameState[2], this.holes[3], holeType.MY_HOLE, 2)
        this.holes[1] = new Hole(this.gameState[1], this.holes[2], holeType.MY_HOLE, 1)
        this.holes[0] = new Hole(this.gameState[0], this.holes[1], holeType.MY_HOLE, 0)

        this.holes[13].nextHole = this.holes[0]

        return this.gameState
    }

}