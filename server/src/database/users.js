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

const updateUser = (email, newUser) => {
   DBUser.findOneAndUpdate({ email: email }, makeDBUser(newUser));
};

/**
 *
 * @param {*} userId
 * @param {*} passwordHash
 * @returns user object with updated password hash
 */
const updatePasswordHash = (userId, passwordHash) => {
   const dbUser = DBUser.findByIdAndUpdate(
      { _id: userId },
      { passwordHash: passwordHash }
   );
   return makeUser(dbUser);
};

module.exports = {
   findUserByEmail,
   saveUser,
   updatePasswordHash,
   updateUser,
};
