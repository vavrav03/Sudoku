const {
   ClassicGame,
   ClassicResizedGame,
   ClassicXGame,
   JigsawGame,
   SamuraiGame,
   SamuraiMixedGame,
} = require('/src/database/models');

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

const findRandomClassicGame = async (size, difficulty) => {
   return await ClassicGame.find(
      sudokuSizeQuery(size, { difficulty: difficulty })
   );
};

const findRandomClassicResizedGame = async (size) => {
   return await ClassicResizedGame.find(sudokuSizeQuery(size));
};

const findRandomClassicXGame = async (size) => {
   return await ClassicXGame.find(sudokuSizeQuery(size));
}

const findRandomJigsawGame = async (size) => {
   return await JigsawGame.find(sudokuSizeQuery(size));
}

const findRandomSamuraiGame = async (size) => {
   return await SamuraiGame.find(sudokuSizeQuery(size));
}

const findRandomSamuraiMixedGame = async (size) => {
   await SamuraiMixed.find(SamuraiMixedGame(size));
}

module.exports = {
   findRandomClassicGame,
   findRandomClassicResizedGame,
   findRandomClassicXGame,
   findRandomClassicXGame,
   findRandomJigsawGame,
   findRandomSamuraiGame,
   findRandomSamuraiMixedGame
}