
function shuffle(array) {
   let currentIndex = array.length,
      randomIndex;
   while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
         array[randomIndex],
         array[currentIndex],
      ];
   }
   return array;
}

const trivialFill = (
   areaPointersGrid,
   areasLists,
   n,
   boxRowCount,
   boxColCount
) => {
   let sectionCounter = 0;
   for (let i = 0; i < n; i++) {
      areaPointersGrid.push([]);
   }
   for (let x = 0; x < n / boxRowCount; x++) {
      for (let y = 0; y < n / boxColCount; y++) {
         for (let i = 0; i < boxRowCount; i++) {
            for (let j = 0; j < boxColCount; j++) {
               areaPointersGrid[x * boxRowCount + i][y * boxColCount + j] =
                  sectionCounter;
            }
         }
         sectionCounter++;
      }
   }
   for (let i = 0; i < n; i++) {
      areasLists.push([]);
   }
   for (let i = 0; i < n; i++) {
      for (let j = 0; j < areaPointersGrid[i].length; j++) {
         areasLists[areaPointersGrid[i][j]].push({ row: i, col: j });
      }
   }
};

const areAdjacent = (a, b) => {
   if (a.row == b.row) {
      if (Math.abs(a.col - b.col) == 1) {
         return true;
      }
   } else if (a.col == b.col) {
      if (Math.abs(a.row - b.row) == 1) {
         return true;
      }
   }
   return false;
};

const hasSameNeighbor = (areaPointersGrid, coor) => {
   if (
      coor.col + 1 < areaPointersGrid.length &&
      areaPointersGrid[coor.row][coor.col] ==
         areaPointersGrid[coor.row][coor.col + 1]
   ) {
      return true;
   } else if (
      coor.col - 1 >= 0 &&
      areaPointersGrid[coor.row][coor.col] ==
         areaPointersGrid[coor.row][coor.col - 1]
   ) {
      return true;
   } else if (
      coor.row + 1 < areaPointersGrid.length &&
      areaPointersGrid[coor.row][coor.col] ==
         areaPointersGrid[coor.row + 1][coor.col]
   ) {
      return true;
   } else if (
      coor.row - 1 >= 0 &&
      areaPointersGrid[coor.row][coor.col] ==
         areaPointersGrid[coor.row - 1][coor.col]
   ) {
      return true;
   }
   return false;
};

//finding all items in component of component of graph. If it is not equal to areaPointersGrid.length then it means that there are 2 components which means inconsistency
const isConsistent = (areaPointersGrid, firstList) => {
   const areaPointersGridCopy = [];
   for (let i = 0; i < areaPointersGrid.length; i++) {
      areaPointersGridCopy.push(areaPointersGrid[i].slice());
   }
   const queue = [];
   queue.push(firstList[0]);
   let counter = 0;
   const areaIndex = areaPointersGridCopy[firstList[0].row][firstList[0].col];
   while (queue.length != 0) {
      const coor = queue.splice(0, 1)[0];
      counter++;
      if (
         coor.row + 1 < areaPointersGridCopy.length &&
         areaPointersGridCopy[coor.row + 1][coor.col] == areaIndex
      ) {
         queue.push({ row: coor.row + 1, col: coor.col });
         areaPointersGridCopy[coor.row + 1][coor.col] = -1;
      }
      if (
         coor.row - 1 >= 0 &&
         areaPointersGridCopy[coor.row - 1][coor.col] == areaIndex
      ) {
         queue.push({ row: coor.row - 1, col: coor.col });
         areaPointersGridCopy[coor.row - 1][coor.col] = -1;
      }
      if (
         coor.col + 1 < areaPointersGridCopy.length &&
         areaPointersGridCopy[coor.row][coor.col + 1] == areaIndex
      ) {
         queue.push({ row: coor.row, col: coor.col + 1 });
         areaPointersGridCopy[coor.row][coor.col + 1] = -1;
      }
      if (
         coor.col - 1 >= 0 &&
         areaPointersGridCopy[coor.row][coor.col - 1] == areaIndex
      ) {
         queue.push({ row: coor.row, col: coor.col - 1 });
         areaPointersGridCopy[coor.row][coor.col - 1] = -1;
      }
   }
   return counter - 1 == areaPointersGrid.length;
};

const tradeSquare = (areaPointersGrid, areasLists, firstList, secondList) => {
   const aLIndexes = [];
   for (let i = 0; i < firstList.length; i++) {
      aLIndexes.push(i);
   }
   shuffle(aLIndexes);
   for (let i = 0; i < aLIndexes.length; i++) {
      for (let j = i; j < aLIndexes.length; j++) {
         const firstListCoor = firstList.splice(aLIndexes[i], 1)[0];
         const secListCoor = secondList.splice(aLIndexes[j], 1)[0];
         firstList.push(secListCoor);
         secondList.push(firstListCoor);

         let temp = areaPointersGrid[firstListCoor.row][firstListCoor.col];
         areaPointersGrid[firstListCoor.row][firstListCoor.col] =
            areaPointersGrid[secListCoor.row][secListCoor.col];
         areaPointersGrid[secListCoor.row][secListCoor.col] = temp;

         if (
            isConsistent(areaPointersGrid, firstList) &&
            isConsistent(areaPointersGrid, secondList)
         ) {
            return;
         } else {
            firstList.splice(firstList.indexOf(secListCoor), 1);
            secondList.splice(secondList.indexOf(firstListCoor), 1);
            firstList.push(firstListCoor);
            secondList.push(secListCoor);
            let temp = areaPointersGrid[firstListCoor.row][firstListCoor.col];
            areaPointersGrid[firstListCoor.row][firstListCoor.col] =
               areaPointersGrid[secListCoor.row][secListCoor.col];
            areaPointersGrid[secListCoor.row][secListCoor.col] = temp;
         }
      }
   }
};

const swapOneSquareInGrid = (areaPointersGrid, areasLists) => {
   const aLIndexes = [];
   for (let i = 0; i < areaPointersGrid.length; i++) {
      aLIndexes.push(i);
   }
   shuffle(aLIndexes);
   let adjCounter = 0;
   //randomly going through all lists
   for (let i = 0; i < aLIndexes.length; i++) {
      for (let j = i + 1; j < aLIndexes.length; j++) {
         const firstList = areasLists[aLIndexes[i]];
         const secondList = areasLists[aLIndexes[j]];
         for (let x = 0; x < firstList.length; x++) {
            for (let y = x; y < secondList.length; ) {
               //checking for adjacency of two areas (at least 2 squares are touching)
               if (areAdjacent(firstList[x], secondList[y])) {
                  y++;
                  adjCounter++;
                  break;
               } else {
                  y++;
               }
               if (adjCounter == 2) {
                  tradeSquare(
                     areaPointersGrid,
                     areasLists,
                     firstList,
                     secondList
                  );
                  return;
               }
            }
         }
      }
   }
};

const createJigsawAreas = (n, boxRowCount, boxColCount) => {
   const areaPointersGrid = [];
   const areasLists = [];
   trivialFill(areaPointersGrid, areasLists, n, boxRowCount, boxColCount);
   for (let i = 0; i < 2000; i++) {
      swapOneSquareInGrid(areaPointersGrid, areasLists);
   }
   return {
      areaPointersGrid,
      areasLists,
   };
};

module.exports = {
   createJigsawAreas,
}