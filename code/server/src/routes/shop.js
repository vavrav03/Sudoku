const express = require('express');
const { requireAuth } = require('/src/middleware/auth');

const makeShopRoutes = ({ database }) => {
   const router = express.Router();
   //used to get list of all items

   router.get('/', async (req, res) => {
      const shopEntities = await database.findAllShopItems();
      res.send(shopEntities.map((item) => item.toAPIObject()));
   });

   //used to buy the item from the shop and add it to the user's inventory.
   router.get('/item/buy', requireAuth, async (req, res) => {
      let{ name, count } = req.query;
      count = parseInt(count);
      if(!name || !count){
         return res.status(400).send({message: 'Invalid name or count'});
      }
      const shopItem = await database.findShopItemByName(name);
      if(shopItem.getPrice() * count > req.user.getCoinsCount()){
         return res.status(400).send({message: 'Not enough coins'});
      }
      req.user.setCoinsCount(req.user.getCoinsCount() - shopItem.getPrice() * count);
      req.user.addBoughtItem(shopItem.getName(), count);
      await database.updateUser(req.user.getEmail(), req.user);
      res.send(req.user.toAPIObject());
   });

   return router;
};

module.exports = { makeShopRoutes };
