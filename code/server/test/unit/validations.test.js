const { validator } = require('/src/helpers');
const {createHash} = require('/src/service/passwordManager');

describe('testing all validations on backend', function () {
   it('checks whether email is valid', function () {
      expect(validator.isEmail('jmenoadresa.cz')).toBe(false); // no @
      expect(validator.isEmail('jmeno@adresacz')).toBe(false); // no dot
      expect(validator.isEmail('jmeno@adresa.cz')).toBe(true); // ok
   });

   it('checks whether password is strong enough', function () {
      expect(validator.isStrongPassword('abcdefghJ1')).toBe(false); //no symbol
      expect(validator.isStrongPassword('abcdefghJ*')).toBe(false); // no number
      expect(validator.isStrongPassword('abcdefgh1*')).toBe(false); //no uppercase letter
      expect(validator.isStrongPassword('abcd1*J')).toBe(false); //low number of characters
      expect(validator.isStrongPassword('abcdefg1*J')).toBe(true); // ok
   });
});