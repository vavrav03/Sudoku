const express = require('express');
const { getGameStatusHandler } = require('/src/middleware');
const {
   createClassicVariant,
   createClassicXVariant,
   createJigsawVariant,
   createSamuraiVariant
} = require('/src/service/variationCreator.js');

const makeGameRoutes = ({ database }) => {
   const router = express.Router();

   router.get('/classic', async (req, res, next) => {
      try {
         res.locals.game = await database.findRandomClassicGame(
            parseInt(req.query.size),
            req.query.difficulty
         );
         res.locals.createVariant = createClassicVariant;
      } catch (err) {
         return res.status(400).send(err);
      }
      next();
   });

   router.get('/classicX', async (req, res, next) => {
      try {
         res.locals.game = await database.findRandomClassicXGame(
            parseInt(req.query.size),
            req.query.difficulty
         );
         res.locals.createVariant = createClassicXVariant;
      } catch (err) {
         return res.status(400).send(err);
      }
      next();
   });

   router.get('/jigsaw', async (req, res, next) => {
      try {
         res.locals.game = await database.findRandomJigsawGame(
            parseInt(req.query.size),
            req.query.difficulty
         );
         res.locals.createVariant = createJigsawVariant;
      } catch (err) {
         return res.status(400).send(err);
      }
      next();
   });

   router.get('/samurai', async (req, res, next) => {
      try {
         res.locals.game = await database.findRandomSamuraiGame(
            parseInt(req.query.size),
            req.query.difficulty
         );
         res.locals.createVariant = createSamuraiVariant;
      } catch (err) {
         return res.status(400).send(err);
      }
      next();
   });

   router.get('/samuraiMixed', async (req, res, next) => {
      try {
         res.locals.game = await database.findRandomSamuraiMixedGame(
            parseInt(req.query.size),
            req.query.difficulty
         );
         res.locals.createVariant = createSamuraiVariant;
      } catch (err) {
         return res.status(400).send(err);
      }
      next();
   });

   router.use(getGameStatusHandler);

   return router;
};

module.exports = { makeGameRoutes };
