const {
   createUserWithPassword,
   user1Password,
   user1NewPassword,
} = require('../../setup/data');
const { makeUser } = require('/src/entities');
const { createHash } = require('/src/service/passwordManager');

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
            auth: {},
         });
         expect(false).toBe(true);
      } catch (error) {
         expect(error.message).toBe(
            'At least 1 authentication mechanism must be specified'
         );
      }
   });

   describe('testing password management of user class', function () {
      it('changes password and should fail because new password is too weak', async function () {
         try {
            const user = await createUserWithPassword();
            await user.attemptPasswordChange(user1Password, 'weakpassword');
            expect(true).toEqual(false);
         } catch (err) {
            expect(err.message).toEqual('Password is not strong enough');
         }
      });

      it('changes password and should fail because old password do not match', async function () {
         try {
            const user = await createUserWithPassword();
            await user.attemptPasswordChange(user1Password, 'weakpassword');
            expect(true).toEqual(false);
         } catch (err) {
            expect(err.message).toEqual('Password is not strong enough');
         }
      });

      it('should change password', async function () {
         try {
            const user = await createUserWithPassword();
            await user.attemptPasswordChange('notMatchingPassword', 'weakpassword');
            expect(true).toEqual(false);
         } catch (err) {
            expect(err.message).toEqual('Old password and new password do not match');
         }
      });

      it('should change password', async function () {
         try {
            const user = await createUserWithPassword();
            await user.attemptPasswordChange(user1Password, user1NewPassword);
            expect(
               expect(await createHash(user1NewPassword)).toEqual(
                  user.getPasswordHash()
               )
            );
         } catch (err) {
            expect(true).toEqual(false);
         }
      });
   });
});
