const passport = require("passport");
const session = require("express-session");
const uuid = require("uuid");

const {makeStrategies} = require("./strategies");

const makePassport = (app, database) => {
   app.use(
      session({
         store: database.createSessionStore,
         genid: () => uuid.v4(),
         secret: process.env.SESSION_SECRET,
         cookie: { maxAge: 24 * 60 * 60 * 1000 },
         resave: false,
         saveUninitialized: false,
      })
   );
   app.use(passport.initialize());
   app.use(passport.session());

   passport.serializeUser((user, done) => {
      done(null, user.getEmail());
   });

   passport.deserializeUser(async (email, done) => {
      const user = await database.findUserByEmail(email);
      done(null, user);
   });

   const Strategies = makeStrategies(database);
   passport.use(Strategies.local);
   passport.use(Strategies.google);
   passport.use(Strategies.facebook)
};

module.exports = {makePassport}