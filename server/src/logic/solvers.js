const _ = require('lodash');
const { writeGrid } = require('./variationCreator');

const startSolving = (grid, boxRowCount, boxColCount, results) => {
   solveClassic(grid, 0, -1, boxRowCount, boxColCount, results);
}

const solveClassic = (
   grid,
   previousRow,
   previousCol,
   boxRowCount,
   boxColCount,
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
   for (let num = 1; num <= grid.length; num++) {
      if (
         rowContainsNumber(grid, currentRow, num) ||
         colContainsNumber(grid, currentCol, num) ||
         boxContainsNumber(
            grid,
            boxRowCount,
            boxColCount,
            currentRow,
            currentCol,
            num
         )
      ) {
         continue;
      }
      grid[currentRow][currentCol] = num;

      solveClassic(
         grid,
         currentRow,
         currentCol,
         boxRowCount,
         boxColCount,
         results
      );
   }
   grid[currentRow][currentCol] = -1;
};

const rowContainsNumber = (grid, row, number) => {
   for (let i = 0; i < grid[row].length; i++) {
      if (grid[row][i] === number) {
         return true;
      }
   }
   return false;
};

const colContainsNumber = (grid, col, number) => {
   for (let i = 0; i < grid.length; i++) {
      if (grid[i][col] === number) {
         return true;
      }
   }
   return false;
};

const boxContainsNumber = (
   grid,
   boxRowCount,
   boxColCount,
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

module.exports = {
   startSolving,
};
