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

const ClassicGameSchema = new Schema({
   ...DefaultGameSchema.obj,
   difficulty: {
      type: String,
      enum : ['easy', 'normal', 'hard'],
  },
})

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

module.exports = {
   ClassicGame: mongoose.model('classic_games', ClassicGameSchema),
   ClassicResizedGame: mongoose.model('classic_games_resized', DefaultGameSchema),
   ClassicXGame: mongoose.model('classic_xes', DefaultGameSchema),
   JigsawGame: mongoose.model('jigsaw_games', JigsawSchema),
   SamuraiGame: mongoose.model('samurai_games', SamuraiSchema),
   SamuraiMixedGame: mongoose.model('samurai_mixed_games', SamuraiSchema),
};
