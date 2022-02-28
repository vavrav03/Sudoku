const makeCoordinates = (row, col) => {
   return {
      row: row,
      col: col,
   };
};

const findRowInvals = (grid, row) => {
   const set = new Set();
   let prevSize = 0;
   let invalidList = [];
   for (let i = 0; i < grid[row].length; i++) {
      prevSize = set.size;
      if (grid[row][i] === -1) {
         continue;
      }
      set.add(grid[row][i]);
      if (set.size === prevSize) {
         invalidList.push({ row: row, col: i });
         for (let x = 0; x < i; x++) {
            if (grid[row][x] === grid[row][i]) {
               invalidList.push({ row: row, col: x });
            }
         }
      }
   }
   return invalidList;
};

const findColInvals = (grid, col) => {
   const set = new Set();
   let prevSize = 0;
   let invalidList = [];
   for (let i = 0; i < grid.length; i++) {
      prevSize = set.size;
      if (grid[i][col] === -1) {
         continue;
      }
      set.add(grid[i][col]);
      if (set.size === prevSize) {
         invalidList.push({ row: i, col: col });
         for (let x = 0; x < i; x++) {
            if (grid[x][col] === grid[i][col]) {
               invalidList.push({ row: x, col: col });
            }
         }
      }
   }
   return invalidList;
};

const findBoxInvals = (boxRowCount, boxColCount, grid, boxRow, boxCol) => {
   const set = new Set();
   let prevSize = 0;
   let invalidList = [];
   for (let i = boxRow * boxRowCount; i < (boxRow + 1) * boxRowCount; i++) {
      for (let j = boxCol * boxColCount; j < (boxCol + 1) * boxColCount; j++) {
         prevSize = set.size;
         if (grid[i][j] === -1) {
            continue;
         }
         set.add(grid[i][j]);
         if (set.size === prevSize) {
            invalidList.push({ row: i, col: j });
            for (
               let x = boxRow * boxRowCount;
               x < (boxRow + 1) * boxRowCount;
               x++
            ) {
               for (
                  let y = boxCol * boxColCount;
                  y < (boxCol + 1) * boxColCount;
                  y++
               ) {
                  if (grid[x][y] === grid[i][j]) {
                     invalidList.push({ row: x, col: y });
                  }
               }
            }
         }
      }
   }
   return invalidList;
};

const findJigsawAreaInvals = (areasLists, grid, areaListIdentifier) => {
   const areaList = areasLists[areaListIdentifier];
   const set = new Set();
   let prevSize = 0;
   let invalidList = [];
   for (let i = 0; i < areaList.length; i++) {
      prevSize = set.size;
      if (grid[areaList[i].row][areaList[i].col] === -1) {
         continue;
      }
      set.add(grid[areaList[i].row][areaList[i].col]);
      if (set.size === prevSize) {
         invalidList.push({ row: areaList[i].row, col: areaList[i].col });
         for (let x = 0; x < i; x++) {
            if (
               grid[areaList[i].row][areaList[i].col] ===
               grid[areaList[x].row][areaList[x].col]
            ) {
               invalidList.push({ row: areaList[x].row, col: areaList[x].col });
            }
         }
      }
   }
   return invalidList;
};

const findMainDiagInvals = (grid) => {
   const set = new Set();
   let prevSize = 0;
   let invalidList = [];
   for (let i = 0; i < grid.length; i++) {
      prevSize = set.size;
      if (grid[i][i] === -1) {
         continue;
      }
      set.add(grid[i][i]);
      if (set.size === prevSize) {
         invalidList.push({ row: i, col: i });
         for (let x = 0; x < i; x++) {
            if (grid[i][i] === grid[x][x]) {
               invalidList.push({ row: x, col: x });
            }
         }
      }
   }
   return invalidList;
};

const findSecDiagInvals = (grid) => {
   const set = new Set();
   let prevSize = 0;
   let invalidList = [];
   for (let i = 0; i < grid.length; i++) {
      prevSize = set.size;
      if (grid[i][grid.length - i - 1] === -1) {
         continue;
      }
      set.add(grid[i][grid.length - i - 1]);
      if (set.size === prevSize) {
         invalidList.push({ row: i, col: grid.length - i - 1 });
         for (let x = 0; x < i; x++) {
            if (grid[i][grid.length - i - 1] === grid[x][grid.length - x - 1]) {
               invalidList.push({ row: x, col: grid.length - x - 1 });
            }
         }
      }
   }
   return invalidList;
};

export const fillInvalidGridClassic = (game) => {
   const { playingBoard, boxRowCount, boxColCount } = game;
   const invalidList = [];
   for (let i = 0; i < playingBoard.length; i++) {
      invalidList.push(...findRowInvals(playingBoard, i));
      invalidList.push(...findColInvals(playingBoard, i));
   }
   for (let i = 0; i < playingBoard.length / boxRowCount; i++) {
      for (let j = 0; j < playingBoard.length / boxColCount; j++) {
         invalidList.push(
            ...findBoxInvals(boxRowCount, boxColCount, playingBoard, i, j)
         );
      }
   }
   game.invalidGrid = createInvalidGrid(playingBoard.length, invalidList);
};

export const fillInvalidGridJigsaw = (game) => {
   const { playingBoard, areasLists } = game;
   const invalidList = [];
   for (let i = 0; i < playingBoard.length; i++) {
      invalidList.push(...findRowInvals(playingBoard, i));
      invalidList.push(...findColInvals(playingBoard, i));
      invalidList.push(...findJigsawAreaInvals(areasLists, playingBoard, i));
   }
   game.invalidGrid = createInvalidGrid(playingBoard.length, invalidList);
};

export const fillInvalidGridClassicX = (game) => {
   const { playingBoard, boxRowCount, boxColCount } = game;
   const invalidList = [];
   for (let i = 0; i < playingBoard.length; i++) {
      invalidList.push(...findRowInvals(playingBoard, i));
      invalidList.push(...findColInvals(playingBoard, i));
      invalidList.push(...findMainDiagInvals(playingBoard));
      invalidList.push(...findSecDiagInvals(playingBoard));
   }
   for (let i = 0; i < playingBoard.length / boxRowCount; i++) {
      for (let j = 0; j < playingBoard.length / boxColCount; j++) {
         invalidList.push(
            ...findBoxInvals(boxRowCount, boxColCount, playingBoard, i, j)
         );
      }
   }
   game.invalidGrid = createInvalidGrid(playingBoard.length, invalidList);
};

export const createInvalidGrid = (gridLength, invalidList = []) => {
   console.log(invalidList);
   const invalidGrid = [];
   for (let i = 0; i < gridLength; i++) {
      invalidGrid.push([]);
      for (let j = 0; j < gridLength; j++) {
         invalidGrid[i][j] = false;
      }
   }
   for (const coor of invalidList) {
      invalidGrid[coor.row][coor.col] = true;
   }
   return invalidGrid;
};
