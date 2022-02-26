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

const gridContainsOkNumbers = (grid, isSeed) => {
   if(isSeed){
      for(let i = 0; i < grid.length; i++){
         for(let j = 0; j < grid.length; j++){
            if(grid[i][j] <= 0 || grid[i][j] >= grid.length + 1){
               return false;
            }
         }
      }
   } else {
      for(let i = 0; i < grid.length; i++){
         for(let j = 0; j < grid.length; j++){
            if(grid[i][j] === -1){
               continue;
            }
            if(grid[i][j] <= 0 || grid[i][j] >= grid.length + 1){
               return false;
            }
         }
      }
   }
   return true;
}

module.exports = {
   isEmail,
   isStrongPassword,
   gridContainsOkNumbers
}