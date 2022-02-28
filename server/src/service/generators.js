const _ = require('lodash');
const {
   makeClassicGame,
   makeClassicXGame,
   makeJigsawGame,
   makeSamuraiGame,
   makeSAmuraiMixedGame,
   boxSizesList
} = require('/src/entities');

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

const getRemoveCount = (size, difficulty) => {
   switch (difficulty) {
      case 'easy':
         return Math.floor((size * size) / 2.31);
      case 'normal':
         return Math.floor((size * size) / 1.88);
      case 'hard':
         return Math.floor((size * size) / 1.62);
   }
   throw Error('bad parameter');
};

const generateClassicGame = (size, difficulty) => {
   const {boxRowCount, boxColCount} = boxSizesList[size];
   const crossings = [
      crossRow,
      crossCol,
      crossBox.bind(this, boxRowCount, boxColCount),
   ];
   const removeCount = getRemoveCount(size, difficulty);
   const solution = generateGridDefault(crossings, size);
   while (true) {
      const seed = _.cloneDeep(solution);
      removeNRandomNumbersFromGrid(removeCount, seed);
      const game = makeClassicGame({ seed, solution, difficulty });
      game.solve();
      if (!game.hasMultipleSolutions()) {
         return game;
      }
   }
};

const generateClassicXGame = (size, difficulty) => {
   const {boxRowCount, boxColCount} = boxSizesList[size];
   const crossings = [
      crossRow,
      crossCol,
      crossBox.bind(this, boxRowCount, boxRowCount),
      crossMainDiag,
      crossSecDiag,
   ];
   const removeCount = getRemoveCount(size, difficulty);
   const solution = generateGridDefault(crossings, size);
   while (true) {
      const seed = _.cloneDeep(solution);
      removeNRandomNumbersFromGrid(removeCount, seed);
      const game = makeClassicXGame({ seed, solution, difficulty });
      game.solve();
      if (!game.hasMultipleSolutions()) {
         return game;
      }
   }
};

const generateJigsawGame = (size, difficulty) => {
   //TODO generate areaPointersGrid
   const crossings = [
      crossRow,
      crossCol,
      crossJigsawArea.bind(this, areaPointersGrid, areasList),
   ];
   const removeCount = getRemoveCount(size, difficulty);
   const solution = generateGridDefault(crossings, size);
   while (true) {
      const seed = _.cloneDeep(solution);
      removeNRandomNumbersFromGrid(removeCount, seed);
      const game = makeJigsawGame({
         areaPointersGrid,
         areasList,
         seed,
         solution,
         difficulty
      });
      game.solve();
      if (!game.hasMultipleSolutions()) {
         return game;
      }
   }
};

const generateSamuraiGame = (size) => {};

const generateSamuraiMixedGame = (size) => {};

module.exports = {
   generateClassicGame,
   generateClassicXGame,
   generateJigsawGame,
   generateSamuraiGame,
   generateSamuraiMixedGame,
};
