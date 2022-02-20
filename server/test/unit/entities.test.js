const { makeUser } = require('/src/entities');

describe('testing user entity', function () {
   it('should should be ok', function () {
      try {
         makeUser({
            firstName: 'first',
            lastName: 'last',
            email: 'jmeno@gmail.com',
            auth: {
               local: 'passwordHash',
            },
         });
      } catch (error) {
         expect(false).toBe(true);
      }
   });

   it('should throw err because no firstName is passed', function () {
      try {
         makeUser({
            firstName: 'first',
            email: 'jmeno@gmail.com',
            auth: {
               local: 'passwordHash',
            },
         });
         expect(false).toBe(true);
      } catch (error) {
         expect(error.message).toBe('Last name must be defined');
      }
   });

   it('should throw err because no firstName is passed', function () {
      try {
         makeUser({
            lastName: 'last',
            email: 'jmeno@gmail.com',
            auth: {
               local: 'passwordHash',
            },
         });
         expect(false).toBe(true);
      } catch (error) {
         expect(error.message).toBe('First name must be defined');
      }
   });

   it('should throw err because no firstName is passed', function () {
      try {
         makeUser({
            firstName: 'first',
            lastName: 'last',
            auth: {
               local: 'passwordHash',
            },
         });
         expect(false).toBe(true);
      } catch (error) {
         expect(error.message).toBe('Email must be defined');
      }
   });

   it('should throw err because no firstName is passed', function () {
      try {
         makeUser({
            firstName: 'first',
            lastName: 'last',
            email: 'jmenogmail.com',
            auth: {
               local: 'passwordHash',
            },
         });
         expect(false).toBe(true);
      } catch (error) {
         expect(error.message).toBe('Given string is not an email address');
      }
   });

   it('should throw err because no firstName is passed', function () {
      try {
         makeUser({
            firstName: 'first',
            lastName: 'last',
            email: 'jmeno@gmail.com',
            auth: {
            },
         });
         expect(false).toBe(true);
      } catch (error) {
         expect(error.message).toBe('At least 1 authentication mechanism must be specified');
      }
   });
});
