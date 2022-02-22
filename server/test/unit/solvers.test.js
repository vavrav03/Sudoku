const {
   startSolvingClassic,
   startSolvingJigsaw,
   startSolvingDiagonal,
} = require('/src/service/solvers');
const games = require('../setup/data');
const { gridEquals } = require('../setup/helpers');

describe('testing sudoku solvers', function () {
   test('solves classic sudoku', () => {
      // console.log(createVariant(game));
      const results = [];
      const game = games.classicGames[0];
      startSolvingClassic(game.seed, 3, 3, results);
      expect(results.length).toBe(1);
      gridEquals(results[0], game.solution);
   });

   it('discovers that 4x4 sudoku does not have solution', () => {
      const results = [];
      startSolvingClassic(games.unsolvable4x4Seed, 2, 2, results);
      expect(results.length).toBe(0);
   });

   it('solves 4x4 sudoku', () => {
      const game = games.classic4x4[0];
      const results = [];
      startSolvingClassic(game.seed, 2, 2, results);
      expect(results.length).toBe(1);
      gridEquals(results[0], game.solution);
   });

   it('solves 6x6 sudoku', () => {
      const game = games.classic6x6[0];
      const results = [];
      startSolvingClassic(game.seed, 2, 3, results);
      expect(results.length).toBe(1);
      gridEquals(results[0], game.solution);
   });

   it('solves ambiguous sudoku with 2 solutions and returns both', () => {
      const game = games.ambiguousClassicSolution;
      const results = [];
      startSolvingClassic(game.seed, 3, 3, results);

      expect(results.length).toBe(2);
      gridEquals(results[0], game.solution1);
      gridEquals(results[1], game.solution2);
   });

   it('solves jigsaw', () => {
      const game = games.jigsaw9x9[0]
      const results = [];
      startSolvingJigsaw(game.seed, game.areaPointersGrid, results);
      expect(results.length).toBe(1);
      gridEquals(results[0], game.solution);
   });

   it('solves diagonal sudoku', () => {
      const game = games.classicXGames[0];
      const results = [];

      startSolvingDiagonal(game.seed, 3, 3, results);
      expect(results.length).toBe(1);
      gridEquals(results[0], game.solution);
   });
});
