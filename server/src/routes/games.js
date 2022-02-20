const express = require('express');
const {
   createVariant,
   createJigsawVariant,
   createSamuraiVariant,
} = require('/src/service/variationCreator.js');

const makeGameRoutes = ({database}) => {
   const router = express.Router();

   router.get('/', async (req, res, next) => {
      let games;
      let createVariantMethod = createVariant;
      const size = req.query.size ? req.query.size : 9;
      switch (req.query.type) {
         case 'classic':
            games = await database.findRandomClassicGame(size, req.query.difficulty)
         case 'classicResized':
            games = await database.findRandomClassicResizedGame(size);
         case 'classicX':
            games = await database.findRandomClassicXGame(size);
         case 'jigsaw':
            games = await database.findRandomJigsawGame(size);
            createVariantMethod = createJigsawVariant;
         case 'samurai':
            games = await database.findRandomSamuraiGame(size);
            createVariantMethod = createSamuraiVariant;
         case 'samuraiMixed':
            games = await database.findRandomSamuraiMixedGame(size);
            createVariantMethod = createSamuraiVariant;
      }
      if (!games) {
         res.status(500).send('no games for this type of sudoku');
      } else {
         res.send(
            createVariantMethod(
               games[random.int(0, games.length - 1)],
               req.query.boxRowCount === req.query.boxColCount
            )
         );
      }
   });

   return router;
};

module.exports = {makeGameRoutes};
