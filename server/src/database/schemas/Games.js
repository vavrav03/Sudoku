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

module.exports = {
   EasyGame: mongoose.model('easyGame', DefaultGameSchema),
   NormalGame: mongoose.model('normalGame', DefaultGameSchema),
   HardGame: mongoose.model('hardGame', DefaultGameSchema),
   Size2x2Game: mongoose.model('size2x2Game', DefaultGameSchema),
   Size2x3Game: mongoose.model('size2x3Game', DefaultGameSchema),
   Size4x4Game: mongoose.model('size4x4Game', DefaultGameSchema),
   DiagonalGame: mongoose.model('diagonalGame', DefaultGameSchema),
   JigsawGame: mongoose.model('jigsawGame', JigsawSchema),
   SamuraiGame: mongoose.model('samuraiGame', SamuraiSchema),
   SamuraiMixedGame: mongoose.model('samuraiMixedGame', SamuraiSchema),
};
