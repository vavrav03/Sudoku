const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const sessionStore = new MongoStore({
   mongooseConnection: mongoose.connection,
   clear_interval: 3600,
   collection: "sessions",
});

module.exports = {sessionStore};