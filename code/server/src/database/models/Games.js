const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClassicGameSchema = new Schema({
   seed: {
      type: [[Number]],
      required: true,
   },
   solution: {
      type: [[Number]],
      required: true,
   },
   difficulty: {
      type: String,
      enum: ['easy', 'normal', 'hard'],
   },
   createdAt: { type: Date, default: Date.now },
});

const JigsawSchema = new Schema({
   ...ClassicGameSchema.obj,
   areaPointersGrid: {
      type: [[Number]], //NxN array with indexes into areasList for each grid item
      required: true,
   },
});

const SamuraiSchema = new Schema({
   seed: {
      tl: {
         type: [[Number]],
         required: true,
      },
      tr: {
         type: [[Number]],
         required: true,
      },
      m: {
         type: [[Number]],
         required: true,
      },
      bl: {
         type: [[Number]],
         required: true,
      },
      br: {
         type: [[Number]],
         required: true,
      },
   },
   solution: {
      tl: {
         type: [[Number]],
         required: true,
      },
      tr: {
         type: [[Number]],
         required: true,
      },
      m: {
         type: [[Number]],
         required: true,
      },
      bl: {
         type: [[Number]],
         required: true,
      },
      br: {
         type: [[Number]],
         required: true,
      },
   },
   difficulty: {
      type: String,
      enum: ['easy', 'normal', 'hard'],
   },
   createdAt: { type: Date, default: Date.now },
});

const ClassicGame = mongoose.model('classic_games', ClassicGameSchema);

const makeClassicDBGame = (game) => {
   return new ClassicGame({
      seed: game.getSeed(),
      solution: game.getSolution(),
      difficulty: game.getDifficulty(),
   });
};

const ClassicXGame = mongoose.model('classic_xes', ClassicGameSchema);
const makeClassicXDBGame = (game) => {
   return new ClassicXGame({
      seed: game.getSeed(),
      solution: game.getSolution(),
      difficulty: game.getDifficulty(),
   });
};

const JigsawGame = mongoose.model('jigsaw_games', JigsawSchema);
const makeJigsawDBGame = (game) => {
   return new JigsawGame({
      seed: game.getSeed(),
      solution: game.getSolution(),
      difficulty: game.getDifficulty(),
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
   ClassicXGame,
   makeClassicXDBGame,
   JigsawGame,
   makeJigsawDBGame,
   SamuraiGame,
   makeSamuraiDBGame,
   SamuraiMixedGame,
   makeSamuraiMixedDBGame,
};
