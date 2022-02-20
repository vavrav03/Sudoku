const { createHash } = require('/src/service/passwordManager');
const {buildMakeUser} = require('./user');
const {validator} = require('/src/helpers');

module.exports = {
   // games: {...require('./games')},
   makeUser: buildMakeUser(validator, createHash),
}