
module.exports = {
   // @index('./*.js', (f, _) => `...require('${f.path}'),`)
   ...require('./Games'),
   ...require('./User'),
   // @endindex
};