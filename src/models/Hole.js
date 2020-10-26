export class Hole {
    constructor(beansQuantity, nextHole) {
      this.beansQuantity = beansQuantity;
      this.nextHole = nextHole;
    }
      fowardBeans(beansAmount) {
        if (beansAmount > 0) {
          this.beansQuantity += 1;
          beansAmount -= 1;
  
          this.nextHole.fowardBeans(beansAmount);
        }
      }
  
      move() {
        let beansAmount = this.beansQuantity;
        this.beansQuantity = 0;
  
        this.nextHole.fowardBeans(beansAmount);
      }
  }