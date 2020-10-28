import { holeType } from '../enums/baseType.js' 


export class Hole {
    constructor(beansQuantity, nextHole, type) {
      this.beansQuantity = beansQuantity;
      this.nextHole = nextHole;
      this.type = type
    }
    fowardBeans(beansAmount) {
        if (beansAmount > 0) {
            if(!(this.type == holeType.OPONENT_BASE)) {
                this.beansQuantity += 1;
                beansAmount -= 1;
            }
            console.log(beansAmount == 0, this.type == holeType.MY_BASE);
            if(beansAmount == 0 && this.type == holeType.MY_BASE)
                return true

            return this.nextHole.fowardBeans(beansAmount);
        }

        return false
    }
  
    move(holeIndex) {
    let beansAmount = this.beansQuantity;
    this.beansQuantity = 0;

    return this.nextHole.fowardBeans(beansAmount);
    }

    setType(type) {
        this.type = type
    }

  }