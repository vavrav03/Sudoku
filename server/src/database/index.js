const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
};

const makeDatabase = (url) => {
   const database = mongoose
      .connect(url, options)
      .then(() => console.log('Connected to database.'))
      .catch((err) =>
         console.error('Error connecting to database:', err.message)
      );
   return {
      // @index('./*.js', (f, _) => `...require('${f.path}'),`)
      ...require('./games'),
      ...require('./sessions'),
      ...require('./users'),
      // @endindex
   };
};

module.exports = { makeDatabase };
