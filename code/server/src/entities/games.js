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

const buildMakeGames = ({ validator, solvers, cloneDeep }) => {
   const makeDefaultGame = ({
      seed,
      solutions = [],
      solution,
      playingBoard,
      difficulty,
   }) => {
      if (!seed) {
         throw Error('Seed is not defined');
      }
      if (!['easy', 'normal', 'hard'].includes(difficulty)) {
         throw Error('difficulty format is wrong');
      }
      if (solution) {
         solutions.push(solution);
      }
      if (!playingBoard) {
         playingBoard = cloneDeep(seed);
      }
      return {
         getSeed: () => seed,
         getSolution: () => solutions[0],
         getSolutions: () => solutions,
         getDifficulty: () => difficulty,
         hasMultipleSolutions: () => solutions.length > 1,
         getPlayingBoard: () => playingBoard,
         toAPIObject: () => {
            return {
               seed,
               solutions,
               playingBoard,
               difficulty,
            };
         },
      };
   };

   const makeClassicGame = (props) => {
      const { seed } = props;
      const dg = makeDefaultGame(props);
      const boxSizesWrapper = boxSizesList[`${seed.length}`];
      if (!boxSizesWrapper) {
         throw Error('Invalid box size (seed and solution size)');
      }
      return Object.freeze({
         ...dg,
         getBoxRowCount: () => boxSizesWrapper.boxRowCount,
         getBoxColCount: () => boxSizesWrapper.boxColCount,
         solve: () => {
            solvers.startSolvingClassic(
               dg.getSolutions(),
               dg.getPlayingBoard(),
               boxSizesWrapper.boxRowCount,
               boxSizesWrapper.boxColCount
            );
         },
         toAPIObject: () =>
            Object.freeze({
               ...dg.toAPIObject(),
               boxRowCount: boxSizesWrapper.boxRowCount,
               boxColCount: boxSizesWrapper.boxColCount,
            }),
      });
   };

   const makeJigsawGame = (props) => {
      const { areaPointersGrid } = props;
      let { areasLists } = props;
      const dg = makeDefaultGame(props);
      if (!areasLists) {
         areasLists = [];
         for (let i = 0; i < areaPointersGrid.length; i++) {
            areasLists.push([]);
         }
         for (let i = 0; i < areaPointersGrid.length; i++) {
            for (let j = 0; j < areaPointersGrid[i].length; j++) {
               areasLists[areaPointersGrid[i][j]].push({ row: i, col: j });
            }
         }
      }
      return Object.freeze({
         ...dg,
         getAreaPointersGrid: () => areaPointersGrid,
         getAreasLists: () => areasLists,
         solve: () => {
            solvers.startSolvingJigsaw(
               dg.getSolutions(),
               dg.getPlayingBoard(),
               areaPointersGrid,
               areasLists
            );
         },
         toAPIObject: () =>
            Object.freeze({
               ...dg.toAPIObject(),
               areaPointersGrid,
               areasLists,
            }),
      });
   };

   const makeClassicXGame = (props) => {
      const dg = makeClassicGame(props);
      return Object.freeze({
         ...dg,
         solve: () => {
            solvers.startSolvingClassicX(
               dg.getSolutions(),
               dg.getPlayingBoard(),
               dg.getBoxRowCount(),
               dg.getBoxColCount()
            );
         },
      });
   };

   const makeSamuraiGame = (props) => {
      const dg = makeDefaultGame(props);
      //TODO
   };

   const makeSamuraiMixedGame = (props) => {
      const dg = makeDefaultGame(props);
      //TODO
   };

   return {
      boxSizesList,
      makeClassicGame,
      makeClassicXGame,
      makeJigsawGame,
      makeSamuraiGame,
      makeSamuraiMixedGame,
   };
};

module.exports = {
   buildMakeGames,
};
