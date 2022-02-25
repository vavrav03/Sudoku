const mongoose = require('mongoose');

const { Schema } = mongoose;

const DefaultGameSchema = new Schema({
   seed: {
      type: [[Number]],
      required: true,
   },
   solution: {
      type: [[Number]],
      required: true,
   },
   createdAt: { type: Date, default: Date.now },
});

const JigsawSchema = new Schema({
   ...DefaultGameSchema.obj,
   areaPointersGrid: {
      type: [[Number]], //NxN array with indexes into areasList for each grid item
      required: true,
   },
});

const SamuraiSchema = new Schema({
   gameTL: {
      type: Object,
      required: true,
   },
   gameTR: {
      type: Object,
      required: true,
   },
   gameM: {
      type: Object,
      required: true,
   },
   gameBL: {
      type: Object,
      required: true,
   },
   gameBR: {
      type: Object,
      required: true,
   },
});

const ClassicGameSchema = new Schema({
   ...DefaultGameSchema.obj,
   difficulty: {
      type: String,
      enum: ['easy', 'normal', 'hard'],
   },
});

const ClassicGame = mongoose.model('classic_games', ClassicGameSchema);
const makeDefaultDBGame = (game) => {
   return {
      seed: game.getSeed(),
      solution: game.getSolution(),
   };
};
const makeClassicDBGame = (game) => {
   return new ClassicGame({
      ...makeDefaultDBGame(game),
      difficulty: game.getDifficulty(),
   });
};
const ClassicResizedGame = mongoose.model(
   'classic_games_resized',
   DefaultGameSchema
);
const makeClassicResizedDBGame = (game) => {
   return new ClassicResizedGame({
      ...makeDefaultDBGame(game),
   });
};
const ClassicXGame = mongoose.model('classic_xes', DefaultGameSchema);
const makeClassicXDBGame = (game) => {
   return new ClassicXGame({
      ...makeDefaultDBGame(game),
   });
};
const JigsawGame = mongoose.model('jigsaw_games', JigsawSchema);
const makeJigsawDBGame = (game) => {
   return new JigsawGame({
      ...makeDefaultDBGame(game),
      areaPointersGrid: game.getAreaPointersGrid(),
   });
};
const SamuraiGame = mongoose.model('samurai_games', SamuraiSchema);
const makeSamuraiDBGame = (game) => {
   return new SamuraiGame({
      //TODO
   });
};
const SamuraiMixedGame = mongoose.model('samurai_mixed_games', SamuraiSchema);
const makeSamuraiMixedDBGame = (game) => {
   return new SamuraiMixedGame({
      //TODO
   });
};

module.exports = {
   ClassicGame,
   makeClassicDBGame,
   ClassicResizedGame,
   makeClassicResizedDBGame,
   ClassicXGame,
   makeClassicXDBGame,
   JigsawGame,
   makeJigsawDBGame,
   SamuraiGame,
   makeSamuraiDBGame,
   SamuraiMixedGame,
   makeSamuraiMixedDBGame
};
