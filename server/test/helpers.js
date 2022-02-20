const mongoose = require('mongoose');

const gridEquals = (generatedGrid, solutionGrid) => {
   for (let i = 0; i < generatedGrid.length; i++) {
      for (let j = 0; j < generatedGrid.length; j++) {
         expect(generatedGrid[i][j]).toBe(solutionGrid[i][j]);
      }
   }
};

const isRowConsistent = (grid, row) => {
   const set = new Set();
   let minusCounter = 0;
   for (let i = 0; i < grid[row].length; i++) {
      if (grid[row][i] === -1) {
         minusCounter++;
      } else {
         set.add(grid[row][i]);
      }
   }
   return minusCounter + set.size === grid.length;
};

const colContainsNumber = (grid, col) => {
   const set = new Set();
   let minusCounter = 0;
   for (let i = 0; i < grid.length; i++) {
      if (grid[i][col] === -1) {
         minusCounter++;
      } else {
         set.add(grid[col][i]);
      }
   }
   return minusCounter + set.size === grid.length;
};

const boxContainsNumber = (boxRowCount, boxColCount, grid, boxRow, boxCol) => {
   const set = new Set();
   let minusCounter = 0;
   for (let i = 0; i < boxRowCount; i++) {
      for (let j = 0; j < boxColCount; j++) {
         if (grid[boxRow * boxRowCount + i][boxCol * boxColCount + j] === -1) {
            minusCounter++;
         } else {
            set.add(grid[boxRow * boxRowCount + i][boxCol * boxColCount + j]);
         }
      }
   }
   return minusCounter + set.size === grid.length;
};

const jigsawAreaContainsNumber = (
   areaPointersGrid,
   areasLists,
   grid,
   row,
   col
) => {
   const areaList = areasLists[areaPointersGrid[row][col]];
   const set = new Set();
   let minusCounter = 0;
   for (const areaItem of areaList) {
      if (grid[areaItem.row][areaItem.col] === -1) {
         minusCounter++;
      } else {
         set.add(grid[areaItem.row][areaItem.col]);
      }
   }
   return minusCounter + set.size === grid.length;
};

const mainDiagContainsNumber = (grid, number) => {
   const set = new Set();
   let minusCounter = 0;
   for (let i = 0; i < grid.length; i++) {
      if (grid[i][i] === -1) {
         minusCounter++;
      } else {
         set.add(grid[i][i]);
      }
   }
   return minusCounter + set.size === grid.length;
};

const secDiagContainsNumber = (grid, number) => {
   const set = new Set();
   let minusCounter = 0;
   for (let i = 0; i < grid.length; i++) {
      if (grid[i][grid.length - i - 1] === -1) {
         minusCounter++;
      } else {
         set.add(grid[i][grid.length - i - 1]);
      }
   }
   return minusCounter + set.size === grid.length;
};

// const isSudokuConsistent = (grid) => {
//    for (let i = 0; i < grid.length; i++) {}
//    for (let i = 0; i < grid.length; i++) {}
//    for (let i = 0; i < grid.length; i++) {
//       for (let j = 0; j < grid.length; j++) {}
//    }
// };

module.exports = {
   gridEquals,
   // basicSetup
};
