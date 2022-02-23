const authFile = require('./auth');
const loggerFile = require('./logger')

module.exports = {
   // @index('./*.js', (f, _) => `...require('${f.path}'),`)
   ...require('./auth'),
   ...require('./games'),
   ...require('./logger'),
   //@endindex
};
