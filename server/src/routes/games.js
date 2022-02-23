const express = require('express');
const {
   makeClassicGame,
   makeClassicResizedGame,
   makeClassicXGame,
   makeJigsawGame,
   makeSamuraiGame,
   makeSamuraiMixedGame,
} = require('/src/entities');
const {
   createVariant,
   createJigsawVariant,
   createSamuraiVariant,
} = require('/src/service/variationCreator');

const makeGameRoutes = ({ database }) => {
   const router = express.Router();

   router.get('/', async (req, res, next) => {
      let games;
      let createVariantMethod = createVariant;
      const size = req.query.size ? req.query.size : 9;
      switch (req.query.type) {
         case 'classic':
            games = await database.findRandomClassicGame(
               size,
               req.query.difficulty
            );
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

   router.get('/classic', async (req, res, next) => {
      const dbGame = await database.findRandomClassicGame(
         req.query.size,
         req.query.difficulty
      );
      if(!dbGame){
         res.status(500).send('no games for this type of sudoku');
      } else {
         res.send(createVariant(makeClassicGame(dbGame)))
      }
   });

   router.get('/classicResized', async (req, res, next) => {
      const dbGame = await database.findRandomClassicResizedGame(
         req.query.size,
      );
      if(!dbGame){
         res.status(500).send('no games for this type of sudoku');
      } else {
         res.send(createVariant(makeClassicResizedGame(dbGame)))
      }
   });

   router.get('/classicX', async (req, res, next) => {
      const dbGame = await database.findRandomClassicXGame(
         req.query.size,
      );
      if(!dbGame){
         res.status(500).send('no games for this type of sudoku');
      } else {
         res.send(createVariant(makeClassicXGame(dbGame)))
      }
   });

   router.get('/jigsaw', async (req, res, next) => {
      const dbGame = await database.findRandomJigsawGame(
         req.query.size,
      );
      if(!dbGame){
         res.status(500).send('no games for this type of sudoku');
      } else {
         res.send(createVariant(makeJigsawGame(dbGame)))
      }
   });

   router.get('/samurai', async (req, res, next) => {
      const dbGame = await database.findRandomSamuraiGame(
         req.query.size,
      );
      if(!dbGame){
         res.status(500).send('no games for this type of sudoku');
      } else {
         res.send(createVariant(makeSamuraiGame(dbGame)))
      }
   });

   router.get('/samuraiMixed', async (req, res, next) => {
      const dbGame = await database.findRandomSamuraiMixedGame(
         req.query.size,
      );
      if(!dbGame){
         res.status(500).send('no games for this type of sudoku');
      } else {
         res.send(createVariant(makeSamuraiMixedGame(dbGame)))
      }
   });

   return router;
};

module.exports = { makeGameRoutes };
