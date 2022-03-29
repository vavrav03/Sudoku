const _ = require('lodash');
const { createHash } = require('/src/service/passwordManager');
const {validator} = require('/src/helpers');
const solvers = require('/src/service/solvers');
const { buildMakeShopItem } = require('./shopItem');
const { buildMakeGames } = require('./games');
const {buildMakeUser} = require('./user');

module.exports = {
   ...buildMakeGames({validator, solvers, cloneDeep: _.cloneDeep}),
   makeUser: buildMakeUser(validator, createHash),
   makeShopItem: buildMakeShopItem()
}