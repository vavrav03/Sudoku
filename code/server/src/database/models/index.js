module.exports = {
   // @index('./*.js', (f, _) => `...require('${f.path}'),`)
   ...require('./Games'),
   ...require('./ShopItem'),
   ...require('./User'),
   // @endindex
};