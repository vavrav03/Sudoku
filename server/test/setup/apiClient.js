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
   return {
      registerUser,
      loginUser,
      getUser,
   };
};

module.exports = {
   makeApiClient,
};
