const _ = require('lodash');
const { writeGrid } = require('./variationCreator');

const startSolvingDiagonal = (game) => {
   const conditions = [
      rowContainsNumber,
      colContainsNumber,
      boxContainsNumber.bind(
         this,
         game.getBoxRowCount(),
         game.getBoxColCount()
      ),
      mainDiagContainsNumber,
      secDiagContainsNumber,
   ];
   game.setSolutions([]);
   solveGeneral(conditions, game.getPlayingBoard(), 0, -1, game.getSolutions());
};

const startSolvingJigsaw = (game) => {
   const conditions = [
      rowContainsNumber,
      colContainsNumber,
      jigsawAreaContainsNumber.bind(
         this,
         game.getAreaPointersGrid(),
         game.getAreasLists()
      ),
   ];
   game.setSolutions([]);
   solveGeneral(conditions, game.getPlayingBoard(), 0, -1, game.getSolutions());
};

const startSolvingClassic = (game) => {
   const conditions = [
      rowContainsNumber,
      colContainsNumber,
      boxContainsNumber.bind(
         this,
         game.getBoxRowCount(),
         game.getBoxColCount()
      ),
   ];
   game.setSolutions([]);
   solveGeneral(conditions, game.getPlayingBoard(), 0, -1, game.getSolutions());
};

const solveGeneral = (
   conditions /* conditinos must only take arguments: grid, row, col, number -- everything else must be bound*/,
   grid,
   previousRow,
   previousCol,
   results
) => {
   let currentRow = previousRow;
   let currentCol = previousCol;
   while (true) {
      currentCol = currentCol + 1;
      if (currentCol >= grid[currentRow].length) {
         currentRow = currentRow + 1;
         currentCol = 0;
      }
      if (currentRow === grid.length) {
         results.push(_.cloneDeep(grid));
         return results;
      }
      if (grid[currentRow][currentCol] === -1) {
         break;
      }
   }
   numberloop: for (let num = 1; num <= grid.length; num++) {
      for (const condition of conditions) {
         if (condition(grid, currentRow, currentCol, num)) {
            continue numberloop;
         }
      }
      grid[currentRow][currentCol] = num;
      solveGeneral(conditions, grid, currentRow, currentCol, results);
   }
   grid[currentRow][currentCol] = -1;
};

const rowContainsNumber = (grid, row, col, number) => {
   for (let i = 0; i < grid[row].length; i++) {
      if (grid[row][i] === number) {
         return true;
      }
   }
   return false;
};

const colContainsNumber = (grid, row, col, number) => {
   for (let i = 0; i < grid.length; i++) {
      if (grid[i][col] === number) {
         return true;
      }
   }
   return false;
};

const boxContainsNumber = (
   boxRowCount,
   boxColCount,
   grid,
   row,
   col,
   number
) => {
   let boxRow = Math.floor(row / boxRowCount);
   let boxCol = Math.floor(col / boxColCount);
   for (let i = 0; i < boxRowCount; i++) {
      for (let j = 0; j < boxColCount; j++) {
         if (
            grid[boxRow * boxRowCount + i][boxCol * boxColCount + j] === number
         ) {
            return true;
         }
      }
   }
   return false;
};

const jigsawAreaContainsNumber = (
   areaPointersGrid,
   areasLists,
   grid,
   row,
   col,
   number
) => {
   const areaList = areasLists[areaPointersGrid[row][col]];
   for (const areaItem of areaList) {
      if (grid[areaItem.row][areaItem.col] === number) {
         return true;
      }
   }
   return false;
};

const mainDiagContainsNumber = (grid, row, col, number) => {
   if (row !== col) {
      return false;
   }
   for (let i = 0; i < grid.length; i++) {
      if (grid[i][i] === number) {
         return true;
      }
   }
   return false;
};

const secDiagContainsNumber = (grid, row, col, number) => {
   if (row !== grid.length - col - 1) {
      return false;
   }
   for (let i = 0; i < grid.length; i++) {
      if (grid[i][grid.length - i - 1] === number) {
         return true;
      }
   }
   return false;
};

module.exports = {
   startSolvingClassic,
   startSolvingJigsaw,
   startSolvingDiagonal,
};
