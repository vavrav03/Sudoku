const express = require('express');
const { makeGameMiddleware } = require('/src/middleware');
const {
   createClassicVariant,
   createClassicXVariant,
   createJigsawVariant,
} = require('/src/service/variationCreator.js');

const makeGameRoutes = ({ database }) => {
   const router = express.Router();
   const {getGameStatusHandler} = makeGameMiddleware({database});

   router.get('/classic', async (req, res, next) => {
      try {
         res.locals.game = await database.findRandomClassicGame(
            parseInt(req.query.size),
            req.query.difficulty
         );
         res.locals.createVariant = createClassicVariant;
         res.locals.gameType = 'classic';
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
         res.locals.gameType = 'classicX';
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
         res.locals.gameType = 'jigsaw';
      } catch (err) {
         console.log(err);
         return res.status(400).send(err);
      }
      next();
   });

   router.use(getGameStatusHandler);

   return router;
};

module.exports = { makeGameRoutes };
