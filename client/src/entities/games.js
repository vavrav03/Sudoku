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

//All entities are based on makeDefaultGame, therefore all properties required by it must also be passed to them. These properties can be easily detected as their absence will trigger an error
export const buildMakeGames = ({ cloneDeep }) => {
   const makeDefaultGame = ({
      seed,
      solutions,
      solution,
      playedBoard,
      invalidGrid,
   }) => {
      if (!seed) {
         throw Error('Seed is not defined');
      }
      if (solution) {
         solutions = [];
         solutions.push(solution);
      }
      if (!playedBoard) {
         playedBoard = cloneDeep(seed);
      }
      if (!invalidGrid) {
         invalidGrid = [];
         for (let i = 0; i < seed.length; i++) {
            invalidGrid.push([]);
            for (let j = 0; j < seed.length; j++) {
               invalidGrid[i][j] = false;
            }
         }
      }
      return {
         seed,
         solution: solutions[0],
         solutions,
         playedBoard,
         hasMultipleSolutions: solutions.length > 1,
         invalidGrid,
      };
   };

   const makeClassicResizedGame = (props) => {
      const { seed } = props;
      const dg = makeDefaultGame(props);
      const boxSizesWrapper = boxSizesList[`${seed.length}`];
      if (!boxSizesWrapper) {
         throw Error('Invalid box size (seed and solution size)');
      }
      return Object.freeze({
         ...dg,
         boxRowCount: boxSizesWrapper.boxRowCount,
         boxColCount: boxSizesWrapper.boxColCount,
      });
   };

   const makeClassicGame = (props) => {
      const { difficulty } = props;
      if (!['easy', 'normal', 'hard'].includes(difficulty)) {
         throw Error('difficulty format is wrong');
      }
      const dg = makeClassicResizedGame(props);
      return Object.freeze({
         ...dg,
         difficulty,
      });
   };

   const makeClassicXGame = (props) => {
      const dg = makeClassicResizedGame(props);
      return Object.freeze({
         ...dg,
      });
   };

   const makeJigsawGame = (props) => {
      const { areaPointersGrid } = props;
      const dg = makeDefaultGame(props);
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
         areaPointersGrid,
         areasLists,
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
