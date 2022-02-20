
class Dimension {

   constructor(boxRowCount, boxColCount){
      this.boxRowCount = boxRowCount;
      this.boxColCount = boxColCount;
   }
}

class Game {

   constructor(sizes){
      this.sizes = sizes;
   }
}

const sizes = {
   "4x4": new Dimension(2, 2),
   "6x6": new Dimension(2, 3),
   "8x8": new Dimension(2, 4),
   "9x9": new Dimension(3, 3),
   "10x10": new Dimension(2, 5),
   "12x12": new Dimension(3, 4),
   "15x15": new Dimension(3, 5),
   "16x16": new Dimension(4, 4),
   "20x20": new Dimension(4, 5),
   "25x25": new Dimension(5, 5),
}

// const games = {
//    classic: [sizes["4x4"], si]
// }