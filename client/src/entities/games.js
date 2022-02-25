class BoxSize {
   constructor(boxRowCount, boxColCount) {
      this.boxRowCount = boxRowCount;
      this.boxColCount = boxColCount;
   }
}

const boxSizesList = {
   4: new BoxSize(2, 2),
   6: new BoxSize(2, 3),
   8: new BoxSize(2, 4),
   9: new BoxSize(3, 3),
   10: new BoxSize(2, 5),
   12: new BoxSize(3, 4),
   14: new BoxSize(2, 7),
   15: new BoxSize(3, 5),
   16: new BoxSize(4, 4),
   25: new BoxSize(5, 5),
};

export const buildMakeGames = () => {
   const makeDefaultGame = ({ seed, solutions, solution }) => {
      if (!seed) {
         throw Error('Seed is not defined');
      }
      if (solution) {
         solutions = [];
         solutions.push(solution);
      }
      return {
         getSeed: () => seed,
         getSolution: () => solutions[0],
         getSolutions: () => solutions,
         setSolutions: (s) => {
            solutions = s;
         },
         hasMultipleSolutions: () => solutions.length > 1,
         toAPIObject: () => {
            return {
               seed,
               solutions,
            };
         },
      };
   };

   const makeClassicResizedGame = ({ seed, solutions, solution }) => {
      const dg = makeDefaultGame({ seed, solutions, solution });
      const boxSizesWrapper = boxSizesList[`${seed.length}`];
      if (!boxSizesWrapper) {
         throw Error('Invalid box size (seed and solution size)');
      }
      return Object.freeze({
         ...dg,
         getBoxRowCount: () => boxSizesWrapper.boxRowCount,
         getBoxColCount: () => boxSizesWrapper.boxColCount,
         toAPIObject: () =>
            Object.freeze({
               ...dg.toAPIObject(),
               boxRowCount: boxSizesWrapper.boxRowCount,
               boxColCount: boxSizesWrapper.boxColCount,
            }),
      });
   };

   const makeClassicGame = ({ seed, solutions, solution, difficulty }) => {
      if (!['easy', 'normal', 'hard'].includes(difficulty)) {
         throw Error('difficulty format is wrong');
      }
      const dg = makeClassicResizedGame({ seed, solutions, solution });
      return Object.freeze({
         ...dg,
         getDifficulty: () => difficulty,
         toAPIObject: () =>
            Object.freeze({
               ...dg.toAPIObject(),
               difficulty,
            }),
      });
   };

   const makeClassicXGame = ({ seed, solutions, solution }) => {
      const dg = makeClassicResizedGame({ seed, solutions, solution });
      return Object.freeze({
         ...dg,
         toAPIObject: () => Object.freeze({ ...dg.toAPIObject() }),
      });
   };

   const makeJigsawGame = ({ seed, solutions, solution, areaPointersGrid }) => {
      const dg = makeDefaultGame({ seed, solutions, solution });
      const areasLists = [];
      for (let i = 0; i < areaPointersGrid.length; i++) {
         areasLists.push([]);
      }
      for (let i = 0; i < areaPointersGrid.length; i++) {
         for (let j = 0; j < areaPointersGrid[i].length; j++) {
            areasLists[areaPointersGrid[i][j]].push({ row: i, col: j });
         }
      }
      return Object.freeze({
         ...dg,
         getAreaPointersGrid: () => areaPointersGrid,
         getAreasLists: () => areasLists,
         toAPIObject: () =>
            Object.freeze({
               ...dg.toAPIObject(),
               areaPointersGrid,
               areasLists,
            }),
      });
   };

   const makeSamuraiGame = ({}) => {
      //TODO
   };

   const makeSamuraiMixedGame = ({}) => {
      //TODO
   };

   return {
      makeClassicGame,
      makeClassicResizedGame,
      makeClassicXGame,
      makeJigsawGame,
      makeSamuraiGame,
      makeSamuraiMixedGame,
   };
};