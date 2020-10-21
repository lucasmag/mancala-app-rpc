export class Hole {
    beansQuantity;
    isBase;
    nextHole;

    constructor(beansQuantity, isBase, nextHole) {
        this.beansQuantity = beansQuantity
        this.isBase = isBase;
        this.nextHole = nextHole;
    }

    fowardBeans(beansAmount) {
        if (beansAmount > 0) {
            this.beansQuantity += 1;
            beansAmount -= 1;

            this.nextHole.fowardBeans(beansAmount);
        }
    }

    move(){
        let beansAmount = this.beansQuantity;
        this.beansQuantity = 0;

        this.nextHole.fowardBeans(beansAmount);
    }
}