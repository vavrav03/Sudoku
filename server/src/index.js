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

const {
   startSolvingJigsaw,
   startSolvingClassic,
   startSolvingDiagonal,
} = require('./logic/solvers');
const { writeGrid } = require('./logic/variationCreator');
const results = [];
const { JigsawGame } = require('./database/schemas/Games');

// const grid = [
//    [-1, -1, -1, -1, -1, 2, -1, -1, 6],
//    [-1, 1, -1, 9, 3, -1, 2, -1, -1],
//    [-1, -1, -1, -1, 7, -1, -1, 3, -1],
//    [-1, 4, -1, 7, -1, -1, -1, -1, 8],
//    [-1, 6, 5, -1, -1, -1, 7, 4, -1],
//    [8, -1, -1, -1, -1, 3, -1, 5, -1],
//    [-1, 5, -1, -1, 2, -1, -1, -1, -1],
//    [-1, -1, 2, -1, 5, 4, -1, 6, -1],
//    [4, -1, -1, 3, -1, -1, -1, -1, -1],
// ];

// const solution = [
//    [5, 3, 7, 4, 1, 2, 8, 9, 6],
//    [6, 1, 4, 9, 3, 8, 2, 7, 5],
//    [9, 2, 8, 5, 7, 6, 1, 3, 4],
//    [3, 4, 1, 7, 6, 5, 9, 2, 8],
//    [2, 6, 5, 8, 9, 1, 7, 4, 3],
//    [8, 7, 9, 2, 4, 3, 6, 5, 1],
//    [1, 5, 3, 6, 2, 9, 4, 8, 7],
//    [7, 8, 2, 1, 5, 4, 3, 6, 9],
//    [4, 9, 6, 3, 8, 7, 5, 1, 2],
// ];

// startSolvingDiagonal(grid, 3, 3, results);
// startSolvingClassic(solution, 3, 3, results);

console.log(results);
const jigsawGame = new JigsawGame();
