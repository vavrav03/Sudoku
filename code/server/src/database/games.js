const {
   ClassicGame,
   makeClassicDBGame,
   ClassicXGame,
   makeClassicXDBGame,
   JigsawGame,
   makeJigsawDBGame,
} = require('/src/database/models');
const {
   makeClassicGame,
   makeClassicXGame,
   makeJigsawGame,
} = require('/src/entities');

/**
 * @param {*} size size of seed
 * @returns mongo query used for finding games with seed length of given size 
 */
const squareSudokuQuery = (size, difficulty) => {
   return {
      $expr: { $eq: [{ $size: '$seed' }, size] },
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

const saveClassicGame = async (game) => {
   await makeClassicDBGame(game).save();
};

const saveClassicXGame = async (game) => {
   await makeClassicXDBGame(game).save();
};

const saveJigsawGame = async (game) => {
   await makeJigsawDBGame(game).save();
};

module.exports = {
   findRandomClassicGame,
   findRandomClassicXGame,
   findRandomClassicXGame,
   findRandomJigsawGame,
   saveClassicGame,
   saveClassicXGame,
   saveJigsawGame,
};
