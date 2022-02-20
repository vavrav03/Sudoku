const { makeDatabase } = require('../../src/database');
const { makeApp } = require('../../src/app.js');
const mongoose = require('mongoose');

const database = makeDatabase(process.env.DATABASE_URL); //this is test URL and its value is set in setup-tests.js
const app = makeApp(database);

const dropAllCollections = async () => {
   const db = mongoose.connection.db;
   const collections = await db.listCollections().toArray();

   // Create an array of collection names and drop each collection
   collections
      .map((collection) => collection.name)
      .forEach(async (collectionName) => {
         db.dropCollection(collectionName);
      });
};

module.exports = {
   app,
   database,
   dropAllCollections,
};
