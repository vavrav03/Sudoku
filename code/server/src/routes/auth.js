const express = require('express');
const passport = require('passport');
const { makeUser } = require('/src/entities');

const makeAuthRoutes = ({ database, validator, createHash }) => {
   const router = express.Router();

   router.post('/register', async (req, res) => {
      let user;
      try {
         if (!validator.isStrongPassword(req.body.password)) {
            throw Error('Password is too weak');
         }
         const passwordHash = await createHash(req.body.password);
         user = makeUser({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            auth: {
               local: {
                  passwordHash,
               },
            },
         });

         const sameEmailDbUser = await database.findUserByEmail(req.body.email);
         if (sameEmailDbUser) {
            throw Error('User with this email already exists');
         }
         await database.saveUser(user);
         res.status(200).send(
            user.toAPIObject(),
         );
      } catch (error) {
         res.status(400).send({ message: error.message, error });
      }
   });

   //email and password body params
   router.post('/login', (req, res, next) => {
      passport.authenticate('local', (err, user, info) => {
         if (err) {
            res.status(400).send({ message: err.message, err });
            return;
         }

         req.login(user, (err) => {
            if (err) {
               res.status(400).send({ message: 'Login failed', err });
               return;
            }
            res.send(
               req.user.toAPIObject(),
            );
         });
      })(req, res, next);
   });

   router.get(
      '/google',
      passport.authenticate('google', {
         scope: ['profile', 'email'],
      })
   );
   router.get(
      '/google/callback',
      passport.authenticate('google'),
      (req, res) => {
         res.redirect('/');
      }
   );

   router.get(
      '/facebook',
      passport.authenticate('facebook', {
         scope: ['email'],
      })
   );
   router.get(
      '/facebook/callback',
      passport.authenticate('facebook'),
      (req, res) => {
         res.redirect('/');
      }
   );

   router.post('/logout', (req, res) => {
      req.session.destroy((err) => {
         if (err) {
            res.status(400).send({ message: 'Logout failed', err });
         }
         req.sessionID = null;
         req.logout();
         res.send({ message: 'Logged out successfully' });
      });
   });
   return router;
};

module.exports = { makeAuthRoutes };
