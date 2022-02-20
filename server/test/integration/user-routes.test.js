const request = require('supertest');

const { app, database, dropAllCollections } = require('./testApp');
// import { jest } from '@jest/globals';
// jest.useFakeTimers();
const { makeUser } = require('/src/entities');
const { DBUser, makeDBUser } = require('/src/database/models');
const { createHash } = require('/src/service/passwordManager');

describe('user routes testing', function () {
   afterEach(async () => {
      await dropAllCollections();
   });
   describe('register testing', () => {
      it('should return 400, because password is too weak', async () => {
         const response = await request(app).post('/api/auth/register').send({
            email: 'jmeno@seznam.cz',
            firstName: 'prvniJmeno',
            lastName: 'dalsiJmeno',
            password: '`slabeHeslo',
         });
         expect(response.statusCode).toEqual(400);
         expect(response.body.message === 'Password is too weak');
      });

      it('should send 400 because email is already present in database', async () => {
         const user = makeUser({
            email: 'jmeno@seznam.cz',
            firstName: 'prvniJmeno',
            lastName: 'dalsiJmeno',
            password: '`rdk)uvr3LdA{,J{',
            auth: {
               local: {
                  passwordHash: await createHash('`rdk)uvr3LdA{,J{'),
               },
            },
         });
         const requestData = {
            email: 'jmeno@seznam.cz',
            firstName: 'prvniJmeno',
            lastName: 'dalsiJmeno',
            password: '`rdk)uvr3LdA{,J{',
         };
         const storedUser = makeDBUser(user);
         await storedUser.save();
         const response = await request(app)
            .post('/api/auth/register')
            .send(requestData);
         expect(
            response.body.message === 'User with this email already exists'
         );
         expect(response.statusCode).toEqual(400);
      });

      it('should store user in the database with appropriate login data', async () => {
         const requestData = {
            email: 'jmeno@seznam.cz',
            firstName: 'prvniJmeno',
            lastName: 'dalsiJmeno',
            password: '`rdk)uvr3LdA{,J{',
         };
         const response = await request(app)
            .post('/api/auth/register')
            .send(requestData);
         expect(response.statusCode).toEqual(200);
         const user = await database.findUserByEmail(requestData.email);
         expect(user.getEmail() === requestData.email);
         const generatedHash = await createHash(requestData.password);
         expect(user.getPasswordHash() === generatedHash);
      });
   });

   describe('login testing', function () {
      const requestData = {
         email: 'jmeno@seznam.cz',
         firstName: 'prvniJmeno',
         lastName: 'dalsiJmeno',
         password: '`rdk)uvr3LdA{,J{',
      };
      beforeEach(async () => {
         const registerResponse = await request(app)
            .post('/api/auth/register')
            .send(requestData);
         expect(registerResponse.statusCode).toEqual(200);
      });
      it('should register user and then log him in', async () => {
         const loginResponse = await request(app).post('/api/auth/login').send({
            email: requestData.email,
            password: requestData.password,
         });
         expect(loginResponse.statusCode).toEqual(200);

         setTimeout(async () => {
            const getUserResponse = await request(app).get('/api/user').send();
            console.log(getUserResponse.statusCode, getUserResponse.body);
            expect(getUserResponse.body.email).toEqual(requestData.email);
         }, 1000);
      });

      it('tests that bad password wont result in logged in', async () => {
         const badPasswordResponse = await request(app)
            .post('/api/auth/login')
            .send({ email: requestData.email, password: 'bad password' });
         expect(badPasswordResponse.statusCode).toEqual(400);
         expect(badPasswordResponse.body.message).toEqual(
            'Incorrect email or password'
         );
      });

      it('should test that passport will detect someone who could be logged in with different provider when having password', async () => {
         await makeDBUser(
            makeUser({
               email: 'jmeno2@gmail.com',
               firstName: 'firstName',
               lastName: 'lastName',
               auth: { google: { id: '' } },
            })
         ).save();

         const badPasswordResponse = await request(app)
            .post('/api/auth/login')
            .send({ email: 'jmeno2@gmail.com', password: 'bad password' });
         expect(badPasswordResponse.statusCode).toEqual(400);
         expect(badPasswordResponse.body.message).toEqual(
            'Login in with appropriate social provider or register'
         );
      });

      it('should return 400 because user with this email does not exist', async () => {
         const loginRequestData = {
            email: 'nonexistent@seznam.cz',
            password: '`rdk)uvr3LdA{,J{',
         };
         const loginResponse = await request(app)
            .post('/api/auth/login')
            .send(loginRequestData);
         expect(loginResponse.statusCode).toEqual(400);
         expect(loginResponse.body.message).toEqual(
            "User with this email doesn't exist"
         );
      });
   });
});
