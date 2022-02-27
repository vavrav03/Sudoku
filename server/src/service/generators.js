const _ = require('lodash');
const {
   makeClassicGame,
   makeClassicXGame,
   makeClassicResizedGame,
   makeJigsawGame,
} = require('/src/entities');
const { writeGrid } = require('./variationCreator');
const {
   startSolvingClassic,
   startSolvingClassicX,
   startSolvingJigsaw,
} = require('./solvers');

const createEmptyGrid = (size) => {
   const grid = [];
   for (let i = 0; i < size; i++) {
      grid.push([]);
      for (let j = 0; j < size; j++) {
         grid[i][j] = -1;
      }
   }
   return grid;
};

const createPossibleNumbersGrid = (size) => {
   const possibleNumbersGrid = [];
   for (let i = 0; i < size; i++) {
      possibleNumbersGrid.push([]);
      for (let j = 0; j < size; j++) {
         possibleNumbersGrid[i].push([]);
         possibleNumbersGrid[i][j][0] = -1;
         for (let x = 1; x <= size; x++) {
            possibleNumbersGrid[i][j][x] = 0;
         }
      }
   }
   return possibleNumbersGrid;
};

const generateGridDefault = (crossings, size) => {
   const results = [];
   const possibleNumbersGrid = createPossibleNumbersGrid(size);
   const grid = generateGeneral(
      crossings,
      createEmptyGrid(size),
      possibleNumbersGrid,
      0,
      -1,
      results
   );
   return grid;
};

const generateGridClassicResized = (boxRowCount, boxColCount, size) => {
   const crossings = [
      crossRow,
      crossCol,
      crossBox.bind(this, boxRowCount, boxColCount),
   ];
   return generateGridDefault(crossings, size);
};

const generateGridClassicX = (boxRowCount, boxColCount, size) => {
   const crossings = [
      crossRow,
      crossCol,
      crossBox.bind(this, boxRowCount, boxColCount),
      crossMainDiag,
      crossSecDiag,
   ];
   return generateGridDefault(crossings, size);
};

const generateGridJigsaw = (areaPointersGrid, areasList, size) => {
   const crossings = [
      crossRow,
      crossCol,
      crossJigsawArea.bind(this, areaPointersGrid, areasList),
   ];
   return generateGridDefault(crossings, size);
};

const removeNRandomNumbersFromGrid = (n, grid) => {
   const indexes = [];
   for (let i = 0; i < grid.length * grid.length; i++) {
      indexes.push(i);
   }
   shuffleArray(indexes);
   for (let i = 0; i < n; i++) {
      grid[Math.floor(indexes[i] / grid.length)][indexes[i] % grid.length] = -1;
   }
};

const generateGeneral = (
   crossings /* crossings must only take arguments: grid, row, col, number, difference -- everything else must be bound*/,
   grid,
   possibleNumbersGrid,
   previousRow,
   previousCol,
   results //must be array because it is a reference to outer object and it can be determined in recursion that it has been populated
) => {
   // console.log(grid);
   if (results.length === 1) {
      return results[0];
   }
   let currentRow = previousRow;
   let currentCol = previousCol + 1;
   if (currentCol >= grid[currentRow].length) {
      currentRow = currentRow + 1;
      currentCol = 0;
   }
   if (currentRow === grid.length) {
      results.push(_.cloneDeep(grid));
      return results[0];
   }
   const possibleNumbersRandom = [];
   for (let i = 1; i <= possibleNumbersGrid.length; i++) {
      if (possibleNumbersGrid[currentRow][currentCol][i] === 0) {
         possibleNumbersRandom.push(i);
      }
   }
   shuffleArray(possibleNumbersRandom);
   for (const num of possibleNumbersRandom) {
      grid[currentRow][currentCol] = num;
      for (const crossing of crossings) {
         crossing(possibleNumbersGrid, currentRow, currentCol, num, 1);
      }
      generateGeneral(
         crossings,
         grid,
         possibleNumbersGrid,
         currentRow,
         currentCol,
         results
      );
      for (const crossing of crossings) {
         crossing(possibleNumbersGrid, currentRow, currentCol, num, -1);
      }
   }
   grid[currentRow][currentCol] = -1;
   return results[0];
};

const shuffleArray = (array) => {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
   }
};

//difference = 1 (crossing element) / -1 (uncrossing element)
const crossRow = (possibleNumbersGrid, row, col, number, difference) => {
   for (let i = col + 1; i < possibleNumbersGrid.length; i++) {
      possibleNumbersGrid[row][i][number] += difference;
   }
};

const crossCol = (possibleNumbersGrid, row, col, number, difference) => {
   for (let i = row + 1; i < possibleNumbersGrid.length; i++) {
      possibleNumbersGrid[i][col][number] += difference;
   }
};

const crossBox = (
   boxRowCount,
   boxColCount,
   possibleNumbersGrid,
   row,
   col,
   number,
   difference
) => {
   let boxRowStart = Math.floor(row / boxRowCount) * boxRowCount;
   let boxColStart = Math.floor(col / boxColCount) * boxColCount;
   for (let i = boxRowStart; i < boxRowStart + boxRowCount; i++) {
      for (let j = boxColStart; j < boxColStart + boxColCount; j++) {
         possibleNumbersGrid[i][j][number] += difference;
      }
   }
};

const crossJigsawArea = (
   areaPointersGrid,
   areasLists,
   grid,
   row,
   col,
   number,
   difference
) => {
   const areaList = areasLists[areaPointersGrid[row][col]];
   for (const areaItem of areaList) {
      grid[areaItem.row][areaItem.col][number] += difference;
   }
};

const crossMainDiag = (possibleNumbersGrid, row, col, number, difference) => {
   if (row !== col) {
      return;
   }
   for (let i = row + 1; i < possibleNumbersGrid.length; i++) {
      possibleNumbersGrid[i][i][number] += difference;
   }
};

const crossSecDiag = (possibleNumbersGrid, row, col, number, difference) => {
   if (row !== possibleNumbersGrid.length - col - 1) {
      return;
   }
   for (let i = row; i < possibleNumbersGrid.length; i++) {
      possibleNumbersGrid[i][possibleNumbersGrid.length - i - 1][number] +=
         difference;
   }
};

const generateClassicGame = (difficulty) => {
   let removeCount;
   switch (difficulty) {
      case 'easy':
         removeCount = 35;
         break;
      case 'normal':
         removeCount = 43;
         break;
      case 'hard':
         removeCount = 50;
         break;
   }
   const solution = generateGridClassicResized(3, 3, 9);
   while (true) {
      const seed = _.cloneDeep(solution);
      removeNRandomNumbersFromGrid(removeCount, seed);
      const game = makeClassicGame({ seed, solution, difficulty });
      startSolvingClassic(game);
      if (!game.hasMultipleSolutions()) {
         return game;
      }
   }
};

const generateClassicResizedGame = (
   boxRowCount,
   boxColCount,
   size,
   removeCount
) => {
   if (!removeCount) removeCount = Math.floor((size * size) / 1.7);
   const solution = generateGridClassicResized(boxRowCount, boxColCount, size);
   while (true) {
      const seed = _.cloneDeep(solution);
      removeNRandomNumbersFromGrid(removeCount, seed);
      const game = makeClassicResizedGame({ seed, solution });
      startSolvingClassic(game);
      if (!game.hasMultipleSolutions()) {
         return game;
      }
   }
};

const generateClassicXGame = (size, removeCount) => {
   if (!removeCount) removeCount = Math.floor((size * size) / 1.7);
   const boxRowCount = Math.sqrt(size);
   const solution = generateGridClassicX(boxRowCount, boxRowCount, size);
   while (true) {
      const seed = _.cloneDeep(solution);
      removeNRandomNumbersFromGrid(removeCount, seed);
      const game = makeClassicXGame({ seed, solution });
      startSolvingClassicX(game);
      if (!game.hasMultipleSolutions()) {
         return game;
      }
   }
};

const generateJigsawGame = (size, removeCount) => {
   //TODO generate areaPointersGrid
   if (!removeCount) removeCount = Math.floor((size * size) / 1.7);
   const solution = generateJigsawGame(boxRowCount, boxRowCount, size);
   while (true) {
      const seed = _.cloneDeep(solution);
      removeNRandomNumbersFromGrid(removeCount, seed);
      const game = makeJigsawGame({
         areaPointersGrid,
         areasList,
         seed,
         solution,
      });
      startSolvingJigsaw(game);
      if (!game.hasMultipleSolutions()) {
         return game;
      }
   }
};

const generateSamuraiGame = (size) => {};

const generateSamuraiMixedGame = (size) => {};

module.exports = {
   generateClassicGame,
   generateClassicResizedGame,
   generateClassicXGame,
   generateJigsawGame,
   generateSamuraiGame,
   generateSamuraiMixedGame,
};
