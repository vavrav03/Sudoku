const Session = require('./Session');
const User = require('./User');
const Games = require('./Games');

module.exports = {
   Session,
   User,
   ...Games,
};
