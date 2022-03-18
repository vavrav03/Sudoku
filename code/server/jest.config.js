module.exports = {
   setupFiles: ['<rootDir>/test/setup-tests.js'],
   moduleNameMapper: {
     '^\/src\/(.*)': `<rootDir>/src/$1`,
     '^\/test\/(.*)': `<rootDir>/test/$1`,
   },
 
};
