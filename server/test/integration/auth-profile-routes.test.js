const request = require('supertest');

const { database, testDBClient, apiClient, data } = require('/test/setup');
// import { jest } from '@jest/globals';
// jest.useFakeTimers();
const { createHash } = require('/src/service/passwordManager');

describe('authentication and profile change routes testing', () => {
   afterEach(async () => {
      await testDBClient.dropAllCollections();
   });
   describe('register testing', () => {
      it('should return 400, because password is too weak', async () => {
         const response = await apiClient.registerUser({
            ...data.user1RegisterRequestData,
            password: 'slabeheslo',
         });
         expect(response.statusCode).toEqual(400);
         expect(response.body.message === 'Password is too weak');
      });

      it('should send 400 because email is already present in database', async () => {
         await testDBClient.insertUser1InDatabase();
         const response = await apiClient.registerUser(
            data.user1RegisterRequestData
         );
         expect(
            response.body.message === 'User with this email already exists'
         );
         expect(response.statusCode).toEqual(400);
      });

      it('should store user in the database with appropriate login data', async () => {
         const response = await apiClient.registerUser(
            data.user1RegisterRequestData
         );
         expect(response.statusCode).toEqual(200);
         const user = await database.findUserByEmail(
            data.user1RegisterRequestData.email
         );
         expect(user.getEmail() === data.user1RegisterRequestData.email);
         const generatedHash = await createHash(
            data.user1RegisterRequestData.password
         );
         expect(user.getPasswordHash() === generatedHash);
      });
   });

   describe('login testing', () => {
      it('should register user and then log him in', async () => {
         await apiClient.registerUser(data.user1RegisterRequestData);
         const loginResponse = await apiClient.loginUser(
            data.user1LoginRequestData
         );
         expect(loginResponse.statusCode).toEqual(200);

         const getUserResponse = await apiClient.getUser();
         expect(getUserResponse.statusCode).toEqual(200);
         expect(getUserResponse.body.user.email).toEqual(data.user1RegisterRequestData.email); //getting the user from API after logging in in order to ensure that 
      });

      it('should return 401 code for getting /api/user', async ()=> {
         const getUserResponse = await apiClient.getUser();
         expect(getUserResponse.statusCode).toEqual(401);
      })

      it('tests that bad password wont result in logged in', async () => {
         await testDBClient.insertUser1InDatabase();
         const badPasswordResponse = await apiClient.loginUser({
            ...data.user1LoginRequestData,
            password: 'bad password',
         });
         expect(badPasswordResponse.statusCode).toEqual(400);
         expect(badPasswordResponse.body.message).toEqual(
            'Incorrect email or password'
         );
      });

      it('should test that passport will detect someone who could be logged in with different provider when having password', async () => {
         await testDBClient.insertUser1WithoutPasswordInDatabase();
         const badPasswordResponse = await apiClient.loginUser(
            data.user1LoginRequestData
         );
         expect(badPasswordResponse.statusCode).toEqual(400);
         expect(badPasswordResponse.body.message).toEqual(
            'Login in with appropriate social provider or register'
         );
      });

      it('should return 400 because user with this email does not exist', async () => {
         const userNonexistentLoginData = {
            email: 'nonexistent@seznam.cz',
            password: '`rdk)uvr3LdA{,J{',
         };
         const loginResponse = await apiClient.loginUser(
            userNonexistentLoginData
         );
         expect(loginResponse.statusCode).toEqual(400);
         expect(loginResponse.body.message).toEqual(
            "User with this email doesn't exist"
         );
      });
   });
});