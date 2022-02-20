const path = require(`sexy-require`);
require('dotenv').config({ path: 'src/config/.env' });

// require('/src/config/environment');
const { makeDatabase } = require('/src/database');
const { makeApp } = require('/src/app.js');

const database = makeDatabase(process.env.DATABASE_URL);
const app = makeApp(database);

app.listen(process.env.PORT, () =>
   console.log(`Server is listening on port ${process.env.PORT}`)
);
