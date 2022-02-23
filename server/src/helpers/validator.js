const validator = require('validator').default;

const isEmail = (email) => {
   return validator.isEmail(email);
}

const isStrongPassword = (password) => {
   return validator.isStrongPassword(password, {
         minLength: 8,
         minLowercase: 1,
         minUppercase: 1,
         minNumbers: 1,
         minSymbols: 1,
      }); 
}

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

const isColConsistent = (grid, col) => {
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

const isBoxConsistent = (boxRowCount, boxColCount, grid, boxRow, boxCol) => {
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

const isJigsawAreaConsistent = (
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

const isMainDiagConsistent = (grid) => {
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

const isSecDiagConsistent = (grid) => {
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

const gridContainsOkNumbers = (grid, isSeed) => {
   if(isSeed){
      for(let i = 0; i < grid.length; i++){
         for(let j = 0; j < grid.length; j++){
            if(grid[i][j] <= 0 || grid[i][j] >= grid.length + 1){
               return false;
            }
         }
      }
   } else {
      for(let i = 0; i < grid.length; i++){
         for(let j = 0; j < grid.length; j++){
            if(grid[i][j] === -1){
               continue;
            }
            if(grid[i][j] <= 0 || grid[i][j] >= grid.length + 1){
               return false;
            }
         }
      }
   }
   return true;
}

module.exports = {
   isEmail,
   isStrongPassword,
   isRowConsistent,
   isColConsistent,
   isBoxConsistent,
   isJigsawAreaConsistent,
   isMainDiagConsistent,
   isSecDiagConsistent,
   gridContainsOkNumbers
}