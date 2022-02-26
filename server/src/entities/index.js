const { createHash } = require('/src/service/passwordManager');
const {buildMakeUser} = require('./user');
const {validator} = require('/src/helpers');
const solvers = require('/src/service/solvers');
const { buildMakeGames } = require('./games');
const _ = require('lodash');

module.exports = {
   ...buildMakeGames({validator, solvers, cloneDeep: _.cloneDeep}),
   makeUser: buildMakeUser(validator, createHash),
}