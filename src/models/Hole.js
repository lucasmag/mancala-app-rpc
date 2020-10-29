import { action } from '../enums/action.js';
import { holeType } from '../enums/holeType.js' 
import { oposite } from '../enums/opositeHole.js' 



export class Hole {
    constructor(beansQuantity, nextHole, type, index) {
      this.beansQuantity = beansQuantity;
      this.nextHole = nextHole;
      this.type = type
      this.index = index
    }
    fowardBeans(beansAmount) {
        if (beansAmount > 0) {
            if(!(this.type == holeType.OPONENT_BASE)) {
                this.beansQuantity += 1;
                beansAmount -= 1;
            }

            if(beansAmount == 0 && this.type == holeType.MY_BASE)
                return this.index

            console.log(this.beansQuantity + ' - '+ beansAmount + ' - '+ this.type);

            if(beansAmount == 0) {
                return this.index
            }

            return this.nextHole.fowardBeans(beansAmount);
        }

        return this.index
    }
  
    move() {
        let beansAmount = this.beansQuantity;
        this.beansQuantity = 0;

        return this.nextHole.fowardBeans(beansAmount);
    }

    setType(type) {
        this.type = type
    }

    getBase(holeIndex) {
        return (holeIndex < 6) ? 6 : 13
    }

    getOponentBase(holeIndex) {
        return (holeIndex < 6) ? 13 : 6
    }

  }