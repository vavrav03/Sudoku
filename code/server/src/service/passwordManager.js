const bcrypt = require('bcryptjs');

const createHash = async (password) => {
   const hashedPassword = await bcrypt.hash(password, process.env.SALT);
   return hashedPassword;
}

module.exports = {
   createHash
}