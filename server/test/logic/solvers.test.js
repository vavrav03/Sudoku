const { startSolving } = require('../../src/logic/solvers');

test('normal sudoku solver', () => {
   const seed = [
      [5, 3, -1, -1, 7, -1, -1, -1, -1],
      [6, -1, -1, 1, 9, 5, -1, -1, -1],
      [-1, 9, 8, -1, -1, -1, -1, 6, -1],
      [8, -1, -1, -1, 6, -1, -1, -1, 3],
      [4, -1, -1, 8, -1, 3, -1, -1, 1],
      [7, -1, -1, -1, 2, -1, -1, -1, 6],
      [-1, 6, -1, -1, -1, -1, 2, 8, -1],
      [-1, -1, -1, 4, 1, 9, -1, -1, 5],
      [-1, -1, -1, -1, 8, -1, -1, 7, 9],
   ];

   const solution = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
   ];

   // console.log(createVariant(game));
   const results = [];
   startSolving(seed, 3, 3, results);
   expect(results.length).toBe(1);
   gridEquals(results[0], solution);
});

test('2x2 nonexistent solution', () => {
   const grid = [
      [1, -1, -1, 4],
      [-1, 4, -1, -1],
      [-1, -1, 3, -1],
      [4, -1, -1, 1],
   ];
   const results = [];
   startSolving(grid, 2, 2, results);
   expect(results.length).toBe(0);
});

test('2x2 nonexistent solution', () => {
   const grid = [
      [1, -1, -1, 3],
      [-1, 4, -1, -1],
      [-1, -1, 3, -1],
      [4, -1, -1, 1],
   ];

   const solution = [
      [1, 2, 4, 3],
      [3, 4, 1, 2],
      [2, 1, 3, 4],
      [4, 3, 2, 1],
   ];

   const results = [];
   startSolving(grid, 2, 2, results);
   gridEquals(results[0], solution);
});

test('2x3 existing solution', () => {
   const grid = [
      [-1, 5, -1, -1, -1, -1],
      [2, -1, -1, 5, 1, -1],
      [-1, -1, 2, 6, -1, -1],
      [-1, -1, 4, 2, -1, -1],
      [-1, 6, 3, -1, -1, 5],
      [-1, -1, -1, -1, 4, -1],
   ];

   const solution = [
      [3, 5, 1, 4, 6, 2],
      [2, 4, 6, 5, 1, 3],
      [5, 1, 2, 6, 3, 4],
      [6, 3, 4, 2, 5, 1],
      [4, 6, 3, 1, 2, 5],
      [1, 2, 5, 3, 4, 6],
   ];

   const results = [];
   startSolving(grid, 2, 3, results);
   gridEquals(results[0], solution);
});

test('more solutions 3x3', () => {
   const grid = [
      [9, -1, 6, -1, 7, -1, 4, -1, 3],
      [-1, -1, -1, 4, -1, -1, 2, -1, -1],
      [-1, 7, -1, -1, 2, 3, -1, 1, -1],
      [5, -1, -1, -1, -1, -1, 1, -1, -1],
      [-1, 4, -1, 2, -1, 8, -1, 6, -1],
      [-1, -1, 3, -1, -1, -1, -1, -1, 5],
      [-1, 3, -1, 7, -1, -1, -1, 5, -1],
      [-1, -1, 7, -1, -1, 5, -1, -1, -1],
      [4, -1, 5, -1, 1, -1, 7, -1, 8],
   ];

   const solution1 = [
      [9, 2, 6, 5, 7, 1, 4, 8, 3],
      [3, 5, 1, 4, 8, 6, 2, 7, 9],
      [8, 7, 4, 9, 2, 3, 5, 1, 6],
      [5, 8, 2, 3, 6, 7, 1, 9, 4],
      [1, 4, 9, 2, 5, 8, 3, 6, 7],
      [7, 6, 3, 1, 4, 9, 8, 2, 5],
      [2, 3, 8, 7, 9, 4, 6, 5, 1],
      [6, 1, 7, 8, 3, 5, 9, 4, 2],
      [4, 9, 5, 6, 1, 2, 7, 3, 8],
   ];

   const solution2 = [
      [9, 2, 6, 5, 7, 1, 4, 8, 3],
      [3, 5, 1, 4, 8, 6, 2, 7, 9],
      [8, 7, 4, 9, 2, 3, 5, 1, 6],
      [5, 8, 2, 3, 6, 7, 1, 9, 4],
      [1, 4, 9, 2, 5, 8, 3, 6, 7],
      [7, 6, 3, 1, 9, 4, 8, 2, 5],
      [2, 3, 8, 7, 4, 9, 6, 5, 1],
      [6, 1, 7, 8, 3, 5, 9, 4, 2],
      [4, 9, 5, 6, 1, 2, 7, 3, 8],
   ];

   const results = [];
   startSolving(grid, 3, 3, results);

   expect(results.length).toBe(2);
   gridEquals(results[0], solution1);
   gridEquals(results[1], solution2);
});

const gridEquals = (generatedGrid, solutionGrid) => {
   for (let i = 0; i < generatedGrid.length; i++) {
      for (let j = 0; j < generatedGrid.length; j++) {
         expect(generatedGrid[i][j]).toBe(solutionGrid[i][j]);
      }
   }
};
