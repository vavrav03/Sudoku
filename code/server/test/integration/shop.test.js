const { database, testDBClient, apiClient, data } = require('/test/setup');
const { createHash } = require('/src/service/passwordManager');
const {makeShopItem} = require('/src/entities');
const {shopData} = require('/test/setup/data');

describe('testing routes related to shop', () => {

   // beforeAll(async () => {
   //    await testDBClient.dropAllCollections();
   // })

   beforeEach(async () => {
      await testDBClient.insertShopData();
   });

   afterEach(async () => {
      await testDBClient.dropAllCollections();
   });

   it('should retrieve 4 shop records successfully', async () => {
      const response = await apiClient.getShopItems();
      expect(response.statusCode).toEqual(200);
      expect(response.body.length).toEqual(shopData.length); // checks whether all shop items are returned
      for(const item of response.body){
         makeShopItem(item); //checks whether the item is really a shop item
      }
   });
});