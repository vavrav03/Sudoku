const request = require('supertest-session');

const makeApiClient = (app) => {
   const api = request(app);
   const registerUser = async (requestData) => {
      const registerResponse = await api
         .post('/api/auth/register')
         .send(requestData);
      return registerResponse;
   };

   const loginUser = async (loginRequestData) => {
      const response = await api
         .post('/api/auth/login')
         .send(loginRequestData);
      return response;
   };
   const getUser = async () => {
      const response = await api.get('/api/user').send();
      return response;
   };
   const getClassicGame = async (size, difficulty) => {
      return await api.get('/api/games/classic').send({size, difficulty});
   }
   const getClassicResizedGame = async (size) => {
      return await api.get('/api/games/classicResized').send({size});
   }
   const getClassicXGame = async (size) => {
      return await api.get('/api/games/classicX').send({size});
   }
   const getJigsawGame = async (size) => {
      return await api.get('/api/games/jigsaw').send({size});
   }
   const getSamuraiGame = async (size) => {
      return await api.get('/api/games/samurai').send({size});
   }
   const getSamuraiMixedGame = async (size) => {
      return await api.get('/api/games/samuraiMixed').send({size});
   }
   return {
      registerUser,
      loginUser,
      getUser,
      getClassicGame,
      getClassicResizedGame,
      getClassicXGame,
      getJigsawGame,
      getSamuraiGame,
      getSamuraiMixedGame
   };
};

module.exports = {
   makeApiClient,
};
