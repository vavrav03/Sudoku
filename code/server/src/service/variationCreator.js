const _ = require('lodash');

const {makeClassicGame, makeJigsawGame, makeClassicXGame} = require('/src/entities');

const createJigsawVariant = (game) => {
   const clonedSeed = _.cloneDeep(game.getSeed());
   const clonedSolution = _.cloneDeep(game.getSolution());
   const clonedPlayingBoard = _.cloneDeep(game.getPlayingBoard());
   const clonedAreaPointersGrid = _.cloneDeep(game.getAreaPointersGrid());
   const size = clonedSeed.length;
   const numbers = createShuffledNumbers(size);

   changeNumbers(clonedSeed, size, numbers);
   changeNumbers(clonedSolution, size, numbers);
   changeNumbers(clonedPlayingBoard, size, numbers);

   let rotationsCount = Math.floor(Math.random() * 4);
   let transpositionType = Math.floor(Math.random() * 5);
   rotateAndTranspose(clonedSeed, rotationsCount, transpositionType);
   rotateAndTranspose(clonedSolution, rotationsCount, transpositionType);
   rotateAndTranspose(clonedPlayingBoard, rotationsCount, transpositionType);
   rotateAndTranspose(
      clonedAreaPointersGrid,
      rotationsCount,
      transpositionType
   );
   return makeJigsawGame({
      seed: clonedSeed,
      solution: clonedSolution,
      playingBoard: clonedPlayingBoard,
      areaPointersGrid: clonedAreaPointersGrid,
      difficulty: game.getDifficulty()
   });
};

//create variant clone
const createClassicVariant = (game) => {
   const clonedSeed = _.cloneDeep(game.getSeed());
   const clonedSolution = _.cloneDeep(game.getSolution());
   const clonedPlayingBoard = _.cloneDeep(game.getPlayingBoard());
   const size = clonedSeed.length;
   const numbers = createShuffledNumbers(size);

   changeNumbers(clonedSeed, size, numbers);
   changeNumbers(clonedSolution, size, numbers);
   changeNumbers(clonedPlayingBoard, size, numbers);

   let rotationsCount = Math.floor(Math.random() * 4);
   let transpositionType = Math.floor(Math.random() * 5);
   if (game.getBoxRowCount() !== game.getBoxColCount()) {
      rotationsCount = Math.floor(Math.random() * 2) * 2;
      transpositionType = Math.floor(Math.random() * 3);
   }
   rotateAndTranspose(clonedSeed, rotationsCount, transpositionType);
   rotateAndTranspose(clonedSolution, rotationsCount, transpositionType);
   rotateAndTranspose(clonedPlayingBoard, rotationsCount, transpositionType);
   return makeClassicGame({
      seed: clonedSeed,
      solution: clonedSolution,
      playingBoard: clonedPlayingBoard,
      difficulty: game.getDifficulty()
   });
};

const createClassicXVariant = (game) => {
   const clonedSeed = _.cloneDeep(game.getSeed());
   const clonedSolution = _.cloneDeep(game.getSolution());
   const clonedPlayingBoard = _.cloneDeep(game.getPlayingBoard());
   const size = clonedSeed.length;
   const numbers = createShuffledNumbers(size);

   changeNumbers(clonedSeed, size, numbers);
   changeNumbers(clonedSolution, size, numbers);
   changeNumbers(clonedPlayingBoard, size, numbers);

   let rotationsCount = Math.floor(Math.random() * 4);
   let transpositionType = Math.floor(Math.random() * 5);
   if (game.getBoxRowCount() !== game.getBoxColCount()) {
      rotationsCount = Math.floor(Math.random() * 2) * 2;
      transpositionType = Math.floor(Math.random() * 3);
   }
   rotateAndTranspose(clonedSeed, rotationsCount, transpositionType);
   rotateAndTranspose(clonedSolution, rotationsCount, transpositionType);
   rotateAndTranspose(clonedPlayingBoard, rotationsCount, transpositionType);
   return makeClassicXGame({
      seed: clonedSeed,
      solution: clonedSolution,
      playingBoard: clonedPlayingBoard,
      difficulty: game.getDifficulty()
   });
};

const rotateAndTranspose = (grid, rotationsCount, transpositionType) => {
   for (let i = 0; i < rotationsCount; i++) {
      rotate90counterClockwise(grid);
   }
   switch (transpositionType) {
      case 0:
         break;
      case 1:
         transposeX(grid);
         break;
      case 2:
         transposeY(grid);
         break;
      case 3:
         transposeMDiag(grid);
         break;
      case 4:
         transposeSDiag(grid);
         break;
   }
};

const createShuffledNumbers = (size) => {
   const numbers = [];
   for (let i = 1; i <= size; i++) {
      numbers.push(i);
   }
   const shuffledNumbers = _.shuffle(numbers);
   return shuffledNumbers;
};

const changeNumbers = (grid, size, numbers) => {
   for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
         if (grid[i][j] !== -1) {
            grid[i][j] = numbers[grid[i][j] - 1];
         }
      }
   }
};

const rotate90counterClockwise = (grid) => {
   for (let i = 0; i < grid.length / 2; i++) {
      let top = i;
      let bottom = grid.length - 1 - i;
      for (let j = top; j < bottom; j++) {
         let temp = grid[top][j];
         grid[top][j] = grid[j][bottom];
         grid[j][bottom] = grid[bottom][bottom - (j - top)];
         grid[bottom][bottom - (j - top)] = grid[bottom - (j - top)][top];
         grid[bottom - (j - top)][top] = temp;
      }
   }
};

const transposeX = (grid) => {
   for (let i = 0; i < grid.length / 2; i++) {
      for (let j = 0; j < grid.length; j++) {
         let temp = grid[i][j];
         let bottom = grid.length - 1 - i;
         grid[i][j] = grid[bottom][j];
         grid[bottom][j] = temp;
      }
   }
};

const transposeY = (grid) => {
   for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length / 2; j++) {
         let temp = grid[i][j];
         let right = grid.length - 1 - j;
         grid[i][j] = grid[i][right];
         grid[i][right] = temp;
      }
   }
};

const transposeMDiag = (grid) => {
   for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < i; j++) {
         let temp = grid[i][j];
         grid[i][j] = grid[j][i];
         grid[j][i] = temp;
      }
   }
};

const transposeSDiag = (grid) => {
   for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length - i - 1; j++) {
         let temp = grid[i][j];
         let secRow = grid.length - j - 1;
         let secCol = grid.length - i - 1;
         grid[i][j] = grid[secRow][secCol];
         grid[secRow][secCol] = temp;
      }
   }
};

const writeGrid = (
   grid,
   boxRowCount = Math.sqrt(grid.length),
   boxColCount = Math.sqrt(grid.length)
) => {
   console.log(boxRowCount);
   const size = grid.length;
   for (let i = 0; i < size; i++) {
      if (i % boxRowCount == 0) {
         console.log();
      }
      let str = '';
      for (let j = 0; j < size; j++) {
         if (j % boxColCount == 0) {
            str += '   ';
         } else {
            str += ' ';
         }
         if (grid[i][j] == -1) {
            str += '.';
         } else {
            str += grid[i][j];
         }
      }
      console.log(str);
   }
};

module.exports = {
   createClassicVariant,
   createClassicXVariant,
   createJigsawVariant,
   rotate90counterClockwise,
   transposeX,
   transposeY,
   transposeMDiag,
   transposeSDiag,
   writeGrid,
};
