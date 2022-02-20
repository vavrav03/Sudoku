const request = require('supertest');

// const games = require('../data/games');
// const { app, database } = require('./testApp');

describe('games API test', () => {

   it('sends get to /api/get for all game types', async () => {
      // const classicEasyGame = await request(app).get('/api/games').query({
      //    type: 'classic',
      //    difficulty: 'easy',
      // });
      // console.log(classicEasyGame, 'ffff')
      // expect(classicEasyGame.data.seed.length === 9);
      // const classicNotPresentGame = await request(app).get('/games', { type: 'h' });
      // expect(classicNotPresentGame.status === 500);
      // const classicResized = await axios.get('/games', {
      //    type: 'classicResized',
      //    size: 4,
      // });
      // const classicXGame = await axios.get('/games', {
      //    type: 'classicX',
      //    size: 9,
      // });
      // const jigsawGame = await axios.get('/games', { type: 'jigsaw', size: 9 });
      // const samuraiGame = await axios.get('/games', { type: 'samurai', size: 9 });
      // const samuraiMixedGame = await axios.get('/games', { type: 'samuraiMixed', size: 9 }); TODO
   });
});
