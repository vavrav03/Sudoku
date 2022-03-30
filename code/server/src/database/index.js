const mongoose = require('mongoose');

// @index('./*.js', (f, _) => `const ${f.name} = require('${f.path}');`)
const games = require('./games');
const sessions = require('./sessions');
const shop = require('./shop');
const users = require('./users');
// @endindex

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
};

const makeDatabase = async (url) => {
   try {
      const database = await mongoose.connect(url, options);
      await shop.initShop();
   } catch (e) {
      console.error('Error connecting to database:', e.message);
   }
   return {
      // @index('./*.js', (f, _) => `...${f.name},`)
      ...games,
      ...sessions,
      ...shop,
      ...users,
      // @endindex
   };
};

module.exports = { makeDatabase };
