const {
   startSolvingClassic,
   startSolvingJigsaw,
   startSolvingDiagonal,
} = require('/src/service/solvers');
const games = require('/test/setup/data');
const { gridEquals } = require('/test/setup/helpers');
const _ = require('lodash');

describe('testing sudoku solvers', function () {
   test('solves classic sudoku', () => {
      // console.log(createVariant(game));
      const game = games.classicGames[0];
      const gameClone = _.cloneDeep(game);
      gameClone.setSolutions(undefined);
      startSolvingClassic(gameClone);
      expect(gameClone.hasMultipleSolutions()).toEqual(false)
      gridEquals(gameClone.getSolution(), game.getSolution());
   });

   it('discovers that 4x4 sudoku does not have solution', () => {
      const game = games.unsolvable4x4Game;
      const gameClone = _.cloneDeep(game);
      gameClone.setSolutions(undefined);
      startSolvingClassic(gameClone);
      expect(gameClone.hasMultipleSolutions()).toEqual(false)
      expect(gameClone.getSolution()).toBe(undefined);
   });

   it('solves 4x4 sudoku', () => {
      const game = games.classic4x4[0];
      const gameClone = _.cloneDeep(game);
      gameClone.setSolutions(undefined);
      startSolvingClassic(gameClone);
      expect(gameClone.hasMultipleSolutions()).toEqual(false)
      gridEquals(gameClone.getSolution(), game.getSolution());
   });

   it('solves 6x6 sudoku', () => {
      const game = games.classic6x6[0];
      const gameClone = _.cloneDeep(game);
      gameClone.setSolutions(undefined);
      startSolvingClassic(gameClone);
      expect(gameClone.hasMultipleSolutions()).toEqual(false)
      gridEquals(gameClone.getSolution(), game.getSolution());
   });

   it('solves ambiguous sudoku with 2 solutions and returns both', () => {
      const game = games.ambiguousClassicSolution;
      const gameClone = _.cloneDeep(game);
      gameClone.setSolutions(undefined);
      startSolvingClassic(gameClone);
      expect(gameClone.getSolutions().length).toEqual(2);
      expect(gameClone.getSolutions().length).toBe(2);
      gridEquals(gameClone.getSolutions()[0], game.getSolutions()[0]);
      gridEquals(gameClone.getSolutions()[1], game.getSolutions()[1]);
   });

   it('solves jigsaw', () => {
      const game = games.jigsaw9x9[0];
      const gameClone = _.cloneDeep(game);
      gameClone.setSolutions(undefined);
      startSolvingJigsaw(gameClone);
      expect(gameClone.hasMultipleSolutions()).toEqual(false);
      gridEquals(gameClone.getSolution(), game.getSolution());
   });

   it('solves diagonal sudoku', () => {
      const game = games.classicXGames[0];
      const gameClone = _.cloneDeep(game);

      startSolvingDiagonal(gameClone);
      expect(gameClone.getSolutions().length).toBe(1);
      gridEquals(gameClone.getSolution(), game.getSolution());
   });
});
