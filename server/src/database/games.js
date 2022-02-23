const {
   ClassicGame,
   ClassicResizedGame,
   ClassicXGame,
   JigsawGame,
   SamuraiGame,
   SamuraiMixedGame,
} = require('/src/database/models');
const {
   makeClassicGame,
   makeClassicResizedGame,
   makeClassicXGame,
   makeJigsawGame,
   makeSamuraiGame,
   makeSamuraiMixedGame,
} = require('/src/entities');

/**
 * @param {*} size size of seed
 * @param {*} extra other queries that must be met by the collections in record to be returned (e.g. difficulty for classic games)
 * @returns mongo query used for finding games with seed length of given size
 */
const sudokuSizeQuery = (size, extra) => {
   return {
      $expr: { $eq: [{ $size: '$seed' }, size] },
      ...extra,
   };
};

const convertToEntity = (dbObject, entityCreator) => {
   console.log(dbObject, entityCreator)
   return dbObject ? entityCreator(dbObject) : null;
};

const findRandomClassicGame = async (size, difficulty) => {
   return convertToEntity(
      await ClassicGame.findOne(
         sudokuSizeQuery(size, { difficulty: difficulty })
      ),
      makeClassicGame
   );
};

const findRandomClassicResizedGame = async (size) => {
   return convertToEntity(
      await ClassicResizedGame.findOne(sudokuSizeQuery(size)),
      makeClassicResizedGame
   );
};

const findRandomClassicXGame = async (size) => {
   return convertToEntity(
      await ClassicXGame.findOne(sudokuSizeQuery(size)),
      makeClassicXGame
   );
};

const findRandomJigsawGame = async (size) => {
   return convertToEntity(
      await JigsawGame.findOne(sudokuSizeQuery(size)),
      makeJigsawGame
   );
};

const findRandomSamuraiGame = async (size) => {
   return convertToEntity(
      await SamuraiGame.findOne(sudokuSizeQuery(size), makeSamuraiGame)
   );
};

const findRandomSamuraiMixedGame = async (size) => {
   return convertToEntity(
      await SamuraiMixed.findOne(SamuraiMixedGame(size)),
      makeSamuraiMixedGame
   );
};

const saveClassicGame = async (game) => {
   await new ClassicGame(game.toAPIObject()).save();
};

const saveClassicResizedGame = async (game) => {
   await new ClassicResizedGame(game.toAPIObject()).save();
};

const saveClassicXGame = async (game) => {
   await new ClassicXGame(game.toAPIObject()).save();
};

const saveJigsawGame = async (game) => {
   await new JigsawGame(game.toAPIObject()).save();
};

const saveSamuraiGame = async (game) => {
   await new SamuraiGame(game.toAPIObject()).save();
};

const saveSamuraiMixedGame = async (game) => {
   await new SamuraiMixedGame(game.toAPIObject()).save();
};

module.exports = {
   findRandomClassicGame,
   findRandomClassicResizedGame,
   findRandomClassicXGame,
   findRandomClassicXGame,
   findRandomJigsawGame,
   findRandomSamuraiGame,
   findRandomSamuraiMixedGame,
   saveClassicGame,
   saveClassicResizedGame,
   saveClassicXGame,
   saveJigsawGame,
   saveSamuraiGame,
   saveSamuraiMixedGame,
};
