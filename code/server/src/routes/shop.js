const express = require('express');
const { requireAuth } = require('/src/middleware/auth');

const makeShopRoutes = ({ database }) => {
   const router = express.Router();
   //used to get list of all items

   router.get('/', async (req, res) => {
      const shopEntities = await database.findAllShopItems();
      console.log(shopEntities);
      res.send(shopEntities.map((item) => item.toAPIObject()));
   });

   //used to buy the item
   router.get('/:id', requireAuth, (req, res) => {});

   return router;
};

module.exports = { makeShopRoutes };
