const { makeUser } = require('/src/entities');
const { DBUser, makeDBUser } = require('/src/database/models');

const findUserByEmail = async (email) => {
   const dbUser = await DBUser.findOne({ email: email });
   if (!dbUser) {
      return null;
   } else {
      return makeUser(dbUser);
   }
};

const saveUser = async (user) => {
   const dbUser = makeDBUser(user);
   await dbUser.save();
};

const updateUser = async (email, newUser) => {
   const dbUser = makeDBUser(newUser);
   await DBUser.findOneAndUpdate({ email: email }, dbUser);
};

// const saveUnfinishedGame = async (email, game) => {

module.exports = {
   findUserByEmail,
   saveUser,
   updateUser,
};
