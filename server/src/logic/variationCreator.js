const _ = require('lodash');

const createVariant = (
   game,
   boxRowCount = Math.sqrt(game.seed.length),
   boxColCount = Math.sqrt(game.seed.length)
) => {
   const clonedGame = _.cloneDeep(game);
   const clonedSeedGrid = clonedGame.seed;
   const clonedSolutionGrid = clonedGame.solution;
   const size = clonedSeedGrid.length;
   const numbers = createShuffledNumbers(size);

   changeNumbers(clonedSeedGrid, size, numbers);
   changeNumbers(clonedSolutionGrid, size, numbers);

   let rotateCounter = Math.floor(Math.random() * 4);
   if (boxRowCount !== boxColCount) {
      rotateCounter = Math.floor(Math.random() * 2) * 2;
   }
   for (let i = 0; i < rotateCounter; i++) {
      rotate90counterClockwise(clonedSeedGrid);
      rotate90counterClockwise(clonedSolutionGrid);
   }
   let transposeNumber = Math.floor(Math.random() * 5);
   if (boxRowCount !== boxColCount) {
      transposeNumber = Math.floor(Math.random() * 3);
   }
   switch (transposeNumber) {
      case 0:
         break;
      case 1:
         transposeX(clonedSeedGrid);
         transposeX(clonedSolutionGrid);
         break;
      case 2:
         transposeY(clonedSeedGrid);
         transposeY(clonedSolutionGrid);
         break;
      case 3:
         transposeMDiag(clonedSeedGrid);
         transposeMDiag(clonedSolutionGrid);
         break;
      case 4:
         transposeSDiag(clonedSeedGrid);
         transposeSDiag(clonedSolutionGrid);
         break;
   }
   return clonedGame;
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
   createVariant,
   rotate90counterClockwise,
   transposeX,
   transposeY,
   transposeMDiag,
   transposeSDiag,
   writeGrid
};
