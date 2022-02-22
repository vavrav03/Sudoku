const { makeDatabase } = require('/src/database');
const { makeApp } = require('/src/app.js');
const { makeTestDBClient } = require('./testDBClient');
const { makeApiClient } = require('./apiClient');
const data = require('./data');
const helpers = require('./helpers');

const database = makeDatabase(process.env.DATABASE_URL); //this is test URL and its value is set in setup-tests.js
const app = makeApp(database);
const testDBClient = makeTestDBClient(database);
const apiClient = makeApiClient(app);

module.exports = {
   app,
   database,
   apiClient,
   testDBClient,
   data,
   helpers,
};
