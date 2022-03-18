const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { makeUser } = require('/src/entities');

// const Strategies = module.exports;

const makeStrategies = (database) => {
   const Strategies = {};

   Strategies.local = new LocalStrategy(
      {
         usernameField: 'email',
         passwordField: 'password',
      },
      async (email, password, done) => {
         try {
            const user = await database.findUserByEmail(email);
            if (!user) {
               throw Error("User with this email doesn't exist");
            }
            if (!user.getPasswordHash()) {
               throw Error(
                  'Login in with appropriate social provider or register'
               );
            }
            if (!(await user.isPasswordCorrect(password))) {
               throw Error('Incorrect email or password');
            }
            done(null, user);
         } catch (err) {
            done(err, null);
         }
      }
   );

   Strategies.google = new GoogleStrategy(
      {
         clientID: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         callbackURL: '/api/auth/google/callback',
         proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
         const { id, emails, name, photos } = profile;
         const email = emails[0].value;
         const { givenName, familyName } = name;
         const profilePicture = photos[0].value;
         let user = await database.findUserByEmail(email);
         if (user) {
            if (!user.getGoogleAuthData().accessToken) {
               user.setGoogleData(id, accessToken);
               database.updateUser(email, user);
            }
         } else {
            user = makeUser({
               email: email,
               firstName: givenName,
               lastName: familyName,
               profilePictureLink: profilePicture,
               auth: {
                  google: {
                     id: id,
                     accessToken: accessToken,
                  },
               },
            });

            database.saveUser(user);
         }

         done(null, user);
      }
   );

   Strategies.facebook = new FacebookStrategy(
      {
         clientID: process.env.FACEBOOK_CLIENT_ID,
         clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
         callbackURL: '/api/auth/facebook/callback',
         proxy: true,
         profileFields: ['id', 'emails', 'name', 'displayName', 'photos'],
      },
      async (accessToken, refreshToken, profile, done) => {
         const { id, emails, name, photos } = profile;
         const email = emails[0].value;
         const { givenName, familyName } = name;
         const profilePicture = photos[0].value;
         let user = await database.findUserByEmail(email);
         if (user) {
            if (!user.getFacebookAuthData().accessToken) {
               user.setFacebookData(id, accessToken);
               database.updateUser(email, user);
            }
         } else {
            user = makeUser({
               email: email,
               firstName: givenName,
               lastName: familyName,
               profilePictureLink: profilePicture,
               auth: {
                  facebook: {
                     id: id,
                     accessToken: accessToken,
                  },
               },
            });

            database.saveUser(user);
         }
         done(null, user);
      }
   );

   return Strategies;
};

module.exports = { makeStrategies };
