const express = require('express');
const { requireAuth } = require('/src/middleware/auth');

const makeUserRoutes = ({ database }) => {
   const router = express.Router();

   router.get('/', requireAuth, (req, res) => {
      res.send({
         message: 'User info successfully retreived',
         user: req.user.toAPIObject(),
      });
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

   return router;
};

module.exports = { makeUserRoutes };
