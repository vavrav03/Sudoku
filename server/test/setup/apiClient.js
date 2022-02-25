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
   const getClassicGame = async (difficulty) => {
      return await api.get('/api/games/classic').query({difficulty});
   }
   const getClassicResizedGame = async (size) => {
      return await api.get('/api/games/classicResized').query({size});
   }
   const getClassicXGame = async (size) => {
      return await api.get('/api/games/classicX').query({size});
   }
   const getJigsawGame = async (size) => {
      return await api.get('/api/games/jigsaw').query({size});
   }
   const getSamuraiGame = async (size) => {
      return await api.get('/api/games/samurai').query({size});
   }
   const getSamuraiMixedGame = async (size) => {
      return await api.get('/api/games/samuraiMixed').query({size});
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
