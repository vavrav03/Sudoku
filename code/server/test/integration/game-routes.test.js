const request = require('supertest');

const { database, testDBClient, apiClient, data } = require('/test/setup');
const {
   makeClassicGame,
   makeClassicXGame,
   makeJigsawGame,
   makeSamuraiGame,
   makeSamuraiMixedGame,
} = require('/src/entities');
// const games = require('../data/games');
// const { app, database } = require('./testApp');

describe('games API test', () => {
   beforeEach(async () => {
      await testDBClient.insert1FromEachGame();
   });

   afterEach(async () => {
      await testDBClient.dropAllCollections();
   });

   it('gets /classic game', async () => {
      const response = await apiClient.getClassicGame(9, 'normal');
      expect(response.statusCode).toEqual(200);
      makeClassicGame(response.body);
      expect(true).toEqual(true);
   });

   it('gets /classic game with size of 4', async () => {
      const response = await apiClient.getClassicGame(4, 'normal');
      expect(response.statusCode).toEqual(200);
      makeClassicGame(response.body);
      expect(true).toEqual(true);
   });

   it('gets /classicX game', async () => {
      const response = await apiClient.getClassicXGame(9, 'normal');
      console.log('run')
      expect(response.statusCode).toEqual(200);
      makeClassicXGame(response.body);
      expect(true).toEqual(true);
   });

   it('gets /jigsaw game', async () => {
      const response = await apiClient.getJigsawGame(9, 'normal');
      expect(response.statusCode).toEqual(200);
      makeJigsawGame(response.body);
      expect(true).toEqual(true);
   });

   // it('gets /samurai game', async () => {
   //    const response = await apiClient.getClassicGame();
   // expect(response.statusCode).toEqual(200);
   // expect(true).toEqual(true);
   // });

   // it('gets /samuraiMixed game', async () => {
   //    const response = await apiClient.getClassicGame();
   // expect(response.statusCode).toEqual(200);
   // expect(true).toEqual(true);
   // });
});
