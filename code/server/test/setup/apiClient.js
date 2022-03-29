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
      return await api.get('/api/games/classic').query({size, difficulty});
   }
   const getClassicXGame = async (size, difficulty) => {
      return await api.get('/api/games/classicX').query({size, difficulty});
   }
   const getJigsawGame = async (size, difficulty) => {
      return await api.get('/api/games/jigsaw').query({size, difficulty});
   }
   const getSamuraiGame = async (size, difficulty) => {
      return await api.get('/api/games/samurai').query({size, difficulty});
   }
   const getSamuraiMixedGame = async (size, difficulty) => {
      return await api.get('/api/games/samuraiMixed').query({size, difficulty});
   }
   const getShopItems = async () => {
      return await api.get('/api/shop');
   }
   return {
      registerUser,
      loginUser,
      getUser,
      getClassicGame,
      getClassicXGame,
      getJigsawGame,
      getSamuraiGame,
      getSamuraiMixedGame,
      getShopItems,
   };
};

module.exports = {
   makeApiClient,
};
