const mongoose = require('mongoose');
const { makeDBUser } = require('/src/database/models');
const { createUserWithPassword, user1WithoutPassword, jigsaw9x9, classicXGames, classic4x4, classicGames, shopData } = require('./data');

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

   const insert1FromEachGame = async () => {
      await database.saveClassicGame(classicGames[0]);
      await database.saveClassicGame(classic4x4[0]);
      await database.saveClassicXGame(classicXGames[0]);
      await database.saveJigsawGame(jigsaw9x9[0]);
   }

   const insertShopData = async () => {
      for(const shopItem of shopData) {
         await database.saveShopItem(shopItem);
      }
   }
   
   const dropAllCollections = async () => {
      const db = mongoose.connection.db;
      // while(!db){
      //    console.log(db);
      // }
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
      insert1FromEachGame,
      insertShopData,
      dropAllCollections
   }
}

module.exports = {
   makeTestDBClient
};
