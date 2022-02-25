const {
   ClassicGame,
   makeClassicDBGame,
   ClassicResizedGame,
   makeClassicResizedDBGame,
   ClassicXGame,
   makeClassicXDBGame,
   JigsawGame,
   makeJigsawDBGame,
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
 * @returns mongo query used for finding games with seed length of given size
 */
const sudokuSizeQuery = (size) => {
   return {
      $expr: { $eq: [{ $size: '$seed' }, size] },
   };
};

const convertToEntity = (dbObject, entityCreator) => {
   return dbObject ? entityCreator(dbObject) : null;
};

const findRandomClassicGame = async (difficulty) => {
   return convertToEntity(
      await ClassicGame.findOne(
         { difficulty: difficulty }
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
   await makeClassicDBGame(game).save();
};

const saveClassicResizedGame = async (game) => {
   await makeClassicResizedDBGame(game).save();
};

const saveClassicXGame = async (game) => {
   await makeClassicXDBGame(game).save();
};

const saveJigsawGame = async (game) => {
   console.log(makeJigsawDBGame(game));
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
