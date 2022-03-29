const { makeShopItem } = require('/src/entities');
const { DBShopItem, makeDBShopItem } = require('/src/database/models');

const findAllShopItems = async () => {
   const shopItems = await DBShopItem.find({});
   return shopItems.map(makeShopItem);
};

const saveShopItem = async (shopItem) => {
   await makeDBShopItem(shopItem).save();
}

module.exports = {
   findAllShopItems,
   saveShopItem,
};
