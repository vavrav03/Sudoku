const path = require(`sexy-require`);
require('dotenv').config({ path: 'src/config/.env' });

// require('/src/config/environment');
const { makeDatabase } = require('/src/database');
const { makeApp } = require('/src/app.js');

(async () => {
   try {
      const database = await makeDatabase(process.env.DATABASE_URL);
      const app = makeApp(database);

      app.listen(process.env.PORT, () =>
         console.log(`Server is listening on port ${process.env.PORT}`)
      );
   } catch (err) {
      console.error('Something bad');
   }
})();

// const { createUserWithPassword, user1WithoutPassword, jigsaw9x9, classicXGames, classic4x4, classicGames } = require('../test/setup/data');
// database.saveClassicGame(classicGames[0]);
// database.saveClassicGame(classicGames[1]);
// database.saveClassicGame(classicGames[2]);
// database.saveClassicResizedGame(classic4x4[0]);
// database.saveClassicXGame(classicXGames[0]);
// database.saveJigsawGame(jigsaw9x9[0]);
// 