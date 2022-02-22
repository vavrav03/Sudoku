const mongoose = require('mongoose');
const { makeDBUser } = require('/src/database/models');
const { createUserWithPassword, user1WithoutPassword } = require('./data');

const makeTestDBClient = (database) => {

   const insertUser1InDatabase = async () => {
      const user1WithPassword = await createUserWithPassword();
      const dbUser = makeDBUser(user1WithPassword);
      await dbUser.save();
   };
   
   const insertUser1WithoutPasswordInDatabase = async () => {
      const dbUser = makeDBUser(user1WithoutPassword);
      await dbUser.save();
   };
   
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
   return {
      insertUser1InDatabase,
      insertUser1WithoutPasswordInDatabase,
      dropAllCollections
   }
}

module.exports = {
   makeTestDBClient
};
