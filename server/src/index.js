const path = require(`sexy-require`);
require('dotenv').config({ path: 'src/config/.env' });
const express = require('express');
const bodyParser = require('body-parser');

require('/src/config/environment');
require('/src/database');

const routes = require('/src/routes/index');
const configPassport = require('/src/middleware/passport/passport-config');
const middlewares = require('/src/middleware/index');

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());

//https://github.com/expressjs/morgan/issues/53
app.use(middlewares.logger);

configPassport(app, express);
app.use('/', routes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));

// const {
//    rotate90counterClockwise,
//    writeGrid,
//    createVariant
// } = require('/src/logic/variationCreator');

// const { startSolving } = require('./logic/solvers');
// const { EasyGame } = require('./database/schemas/Games');

// let grid = [
//    [5, 3, -1, -1, 7, -1, -1, -1, -1],
//    [6, -1, -1, 1, 9, 5, -1, -1, -1],
//    [-1, 9, 8, -1, -1, -1, -1, 6, -1],
//    [8, -1, -1, -1, 6, -1, -1, -1, 3],
//    [4, -1, -1, 8, -1, 3, -1, -1, 1],
//    [7, -1, -1, -1, 2, -1, -1, -1, 6],
//    [-1, 6, -1, -1, -1, -1, 2, 8, -1],
//    [-1, -1, -1, 4, 1, 9, -1, -1, 5],
//    [-1, -1, -1, -1, 8, -1, -1, 7, 9],
// ];

// const results = [];
// startSolving(grid, 3, 3, results);
// const eg = new EasyGame({
//    seed: grid,
//    solution: results[0]
// });

// const variant = createVariant(eg, 3, 3); 

// variant.save();