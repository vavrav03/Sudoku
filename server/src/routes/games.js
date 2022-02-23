const express = require('express');

const { getGameStatusHandler } = require('/src/middleware');

const makeGameRoutes = ({ database }) => {
   const router = express.Router();

   router.get('/classic', async (req, res, next) => {
      res.locals.game = await database.findRandomClassicGame(
         req.body.size,
         req.body.difficulty
      );
      next();
   });

   router.get('/classicResized', async (req, res, next) => {
      console.log('calling1');
      res.locals.game = await database.findRandomClassicResizedGame(
         req.body.size
      );
      console.log('calling2', res.locals.game);
      next();
   });

   router.get('/classicX', async (req, res, next) => {
      res.locals.game = await database.findRandomClassicXGame(req.body.size);
      next();
   });

   router.get('/jigsaw', async (req, res, next) => {
      res.locals.game = await database.findRandomJigsawGame(req.body.size);
      next();
   });

   router.get('/samurai', async (req, res, next) => {
      res.locals.game = await database.findRandomSamuraiGame(req.body.size);
      next();
   });

   router.get('/samuraiMixed', async (req, res, next) => {
      res.locals.game = await database.findRandomSamuraiMixedGame(
         req.body.size
      );
      next();
   });

   router.use(getGameStatusHandler);

   return router;
};

module.exports = { makeGameRoutes };
