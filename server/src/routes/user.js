const express = require('express');
const bcrypt = require('bcryptjs');
const { requireAuth } = require('/src/middleware/auth');

const makeUserRoutes = ({database}) => {
   const router = express.Router();

   router.get('/', requireAuth, (req, res) => {
      console.log(req.user)
      res.send({
         message: 'User info successfully retreived',
         user: req.user.toAPIObject(),
      });
   });

   router.put('/password', requireAuth, async (req, res) => {
      const { oldPassword, newPassword } = req.body;
      if (!req.user.isPasswordSame(oldPassword)) {
         res.status(400).send({ message: 'Old password did not match' });
      }
      try {
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(newPassword, salt);
         const user = await database.updatePasswordHash(
            req.user._id,
            hashedPassword
         );
         req.user = user;
         res.status(200).send("password updated successfully");
      } catch (error) {
         res.status(400).send({ err, message: 'Error updating password' });
      }
   });

   return router;
};

module.exports = {makeUserRoutes};
