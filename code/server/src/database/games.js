const {
   ClassicGame,
   makeClassicDBGame,
   ClassicXGame,
   makeClassicXDBGame,
   JigsawGame,
   makeJigsawDBGame,
   SamuraiGame,
   SamuraiMixedGame,
} = require('/src/database/models');
const {
   makeClassicGame,
   makeClassicXGame,
   makeJigsawGame,
   makeSamuraiGame,
   makeSamuraiMixedGame,
} = require('/src/entities');

/**
 * @param {*} size size of seed
 * @returns mongo query used for finding games with seed length of given size (only for square sudokus (no samurai))
 */
const squareSudokuQuery = (size, difficulty) => {
   return {
      $expr: { $eq: [{ $size: '$seed' }, size] },
      difficulty
   };
};
const samuraiQuery = (size, difficulty) => {
   return {
      $expr: { $eq: [{ $size: '$seed.m' }, size] },
      difficulty
   };
};

const convertToEntity = (dbObject, entityCreator) => {
   return dbObject ? entityCreator(dbObject) : null;
};

const findRandomClassicGame = async (size, difficulty) => {
   return convertToEntity(
      await ClassicGame.findOne(
         squareSudokuQuery(size, difficulty)
      ),
      makeClassicGame
   );
};

const findRandomClassicXGame = async (size, difficulty) => {
   return convertToEntity(
      await ClassicXGame.findOne(squareSudokuQuery(size, difficulty)),
      makeClassicXGame
   );
};

const findRandomJigsawGame = async (size, difficulty) => {
   return convertToEntity(
      await JigsawGame.findOne(squareSudokuQuery(size, difficulty)),
      makeJigsawGame
   );
};

const findRandomSamuraiGame = async (size, difficulty) => {
   return convertToEntity(
      await SamuraiGame.findOne(samuraiQuery(size, difficulty), makeSamuraiGame)
   );
};

const findRandomSamuraiMixedGame = async (size, difficulty) => {
   return convertToEntity(
      await SamuraiMixedGame.findOne(samuraiQuery(size, difficulty)),
      makeSamuraiMixedGame
   );
};

const saveClassicGame = async (game) => {
   await makeClassicDBGame(game).save();
};

const saveClassicXGame = async (game) => {
   await makeClassicXDBGame(game).save();
};

const saveJigsawGame = async (game) => {
   await makeJigsawDBGame(game).save();
};

const saveSamuraiGame = async (game) => {
   await makeSamuraiDBGame(game).save();
};

const saveSamuraiMixedGame = async (game) => {
   await makeSamuraiMixedDBGame(game).save();
};

module.exports = {
   findRandomClassicGame,
   findRandomClassicXGame,
   findRandomClassicXGame,
   findRandomJigsawGame,
   findRandomSamuraiGame,
   findRandomSamuraiMixedGame,
   saveClassicGame,
   saveClassicXGame,
   saveJigsawGame,
   saveSamuraiGame,
   saveSamuraiMixedGame,
};
