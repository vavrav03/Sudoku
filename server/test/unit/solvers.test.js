const {
   startSolvingClassic,
   startSolvingJigsaw,
   startSolvingClassicX,
} = require('/src/service/solvers');
const {
   makeClassicGame,
   makeJigsawGame,
   makeClassicXGame,
} = require('/src/entities');
const games = require('/test/setup/data');
const { gridEquals } = require('/test/setup/helpers');
const _ = require('lodash');

describe('testing sudoku solvers', function () {
   test('solves classic sudoku', () => {
      // console.log(createVariant(game));
      const game = makeClassicGame({
         seed: games.classicGames[0].getSeed(),
         difficulty: games.classicGames[0].getDifficulty(),
      });
      game.solve();
      expect(game.hasMultipleSolutions()).toEqual(false);
      gridEquals(game.getSolution(), games.classicGames[0].getSolution());
   });

   it('discovers that 4x4 sudoku does not have solution', () => {
      const game = games.unsolvable4x4Game;
      game.solve();
      expect(game.hasMultipleSolutions()).toEqual(false);
      expect(game.getSolution()).toBe(undefined);
   });

   it('solves 4x4 sudoku', () => {
      const game = makeClassicGame({
         seed: games.classic4x4[0].getSeed(),
         difficulty: games.classic4x4[0].getDifficulty(),
      });
      game.solve();
      expect(game.hasMultipleSolutions()).toEqual(false);
      gridEquals(game.getSolution(), games.classic4x4[0].getSolution());
   });

   it('solves 6x6 sudoku', () => {
      const game = makeClassicGame({
         seed: games.classic6x6[0].getSeed(),
         difficulty: games.classic6x6[0].getDifficulty(),
      });
      game.solve();
      expect(game.hasMultipleSolutions()).toEqual(false);
      gridEquals(game.getSolution(), games.classic6x6[0].getSolution());
   });

   it('solves ambiguous sudoku with 2 solutions and returns both', () => {
      const game = makeClassicGame({
         seed: games.ambiguousClassicSolution.getSeed(),
         difficulty: games.ambiguousClassicSolution.getDifficulty(),
      });
      game.solve();
      expect(game.getSolutions().length).toEqual(2);
      expect(game.getSolutions().length).toBe(2);
      gridEquals(
         game.getSolutions()[0],
         games.ambiguousClassicSolution.getSolutions()[0]
      );
      gridEquals(
         game.getSolutions()[1],
         games.ambiguousClassicSolution.getSolutions()[1]
      );
   });

   it('solves jigsaw', () => {
      const game = makeJigsawGame({
         seed: games.jigsaw9x9[0].getSeed(),
         areaPointersGrid: games.jigsaw9x9[0].getAreaPointersGrid(),
         difficulty: games.jigsaw9x9[0].getDifficulty(),
      });
      game.solve();
      expect(game.hasMultipleSolutions()).toEqual(false);
      gridEquals(game.getSolution(), games.jigsaw9x9[0].getSolution());
   });

   it('solves diagonal sudoku', () => {
      const game = makeClassicXGame({
         seed: games.classicXGames[0].getSeed(),
         difficulty: games.classicXGames[0].getDifficulty(),
      });
      game.solve();
      expect(game.getSolutions().length).toBe(1);
      gridEquals(game.getSolution(), games.classicXGames[0].getSolution());
   });
});
