const validator = require('validator').default;

const isEmail = (email) => {
   return validator.isEmail(email);
}

const isStrongPassword = (password) => {
   return validator.isStrongPassword(password, {
         minLength: 8,
         minLowercase: 1,
         minUppercase: 1,
         minNumbers: 1,
         minSymbols: 1,
      }); 
}

module.exports = {
   isEmail,
   isStrongPassword
}