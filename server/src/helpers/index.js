
module.exports = {
   // @index('./*.js', (f, _) => `${f.name}: {...require('${f.path}')},`)
   gamesInfo: {...require('./gamesInfo')},
   validator: {...require('./validator')},
   // @endindex
}