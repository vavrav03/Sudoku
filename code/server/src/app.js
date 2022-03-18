const express = require('express');
const bodyParser = require('body-parser');

const {makeRoutes} = require('/src/routes/index');
const {makePassport} = require('/src/middleware/passport/passport-config');
const {logger} = require('/src/middleware/index');

const makeApp = (database) => {
   const app = express();
   
   app.use(bodyParser.json());
   
   //https://github.com/expressjs/morgan/issues/53
   app.use(logger);
   
   makePassport(app, database);
   const routes = makeRoutes({database});
   app.use('/', routes);
   return app;
}

module.exports = {
   makeApp
}