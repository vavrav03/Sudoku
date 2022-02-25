const request = require('supertest');

const { database, testDBClient, apiClient, data } = require('/test/setup');
const {
   makeClassicGame,
   makeClassicResizedGame,
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
      console.log('inserted')
   });

   afterEach(async () => {
      await testDBClient.dropAllCollections();
   });

   it('gets /classic game', async () => {
      const response = await apiClient.getClassicGame('normal');
      expect(response.statusCode).toEqual(200);
      makeClassicGame(response.body);
      expect(true).toEqual(true);
   });

   it('gets /classicResized game', async () => {
      const response = await apiClient.getClassicResizedGame(4);
      expect(response.statusCode).toEqual(200);
      makeClassicResizedGame(response.body);
      expect(true).toEqual(true);
   });

   it('gets /classicX game', async () => {
      const response = await apiClient.getClassicXGame(9);
      console.log('run')
      expect(response.statusCode).toEqual(200);
      makeClassicXGame(response.body);
      expect(true).toEqual(true);
   });

   it('gets /jigsaw game', async () => {
      const response = await apiClient.getJigsawGame(9);
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
