const express = require('express');
const { requireAuth } = require('/src/middleware/auth');

const makeUserRoutes = ({ database }) => {
   const router = express.Router();

   router.get('/', requireAuth, (req, res) => {
      res.send(
         req.user.toAPIObject(),
      );
   });

   router.put('/password', requireAuth, async (req, res) => {
      if (!req.body.oldPassword || !req.body.newPassword) {
         res.send('old password and new password must be specified');
         return;
      }
      try {
         await req.user.attemptPasswordChange(
            req.body.oldPassword,
            req.body.newPassword
         );
         await database.updateUser(req.user.getEmail(), req.user);
         res.status(200).send(req.user.toAPIObject());
      } catch (err) {
         console.log(err);
         res.status(400).send({ message: err.message, err });
      }
   });

   router.post('/earnCoins', requireAuth, async (req, res) => {
      let {coinsCount} = req.body;
      req.user.setCoinsCount(req.user.getCoinsCount() + coinsCount);
      await database.updateUser(req.user.getEmail(), req.user);
      res.send(req.user.toAPIObject());
   });

   router.post('/unfinishedGames', requireAuth, async (req, res) => {
      const {created_at, game} = req.body;
      req.user.changeUnfinishedGame(created_at, game);
      await database.updateUser(req.user.getEmail(), req.user);
      res.send(req.user.toAPIObject());
   });

   router.delete('/unfinishedGame', requireAuth, async (req, res) => {
      const {created_at} = req.body;
      req.user.removeUnfinishedGame(created_at);
      await database.updateUser(req.user.getEmail(), req.user);
      res.send(req.user.toAPIObject());
   });

   return router;
};

module.exports = { makeUserRoutes };
