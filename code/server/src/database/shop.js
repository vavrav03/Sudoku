const { makeShopItem } = require('/src/entities');
const { DBShopItem, makeDBShopItem } = require('/src/database/models');

const shopItems = [
   makeShopItem({name: "Classic12x12Hard", description: "Classic hard sudoku grid of size 12x12", price: 4, imageUrl: null}),
   makeShopItem({name: "Classic14x14Hard", description: "Classic hard sudoku grid of size 14x14", price: 6, imageUrl: null}),
   makeShopItem({name: "Classic16x16Easy", description: "Classic easy sudoku grid of size 16x16", price: 8, imageUrl: null}),
   makeShopItem({name: "Classic16x16Normal", description: "Classic normal sudoku grid of size 16x16", price: 8, imageUrl: null}),
   makeShopItem({name: "Classic16x16Hard", description: "Classic hard sudoku grid of size 16x16", price: 10, imageUrl: null}),

   makeShopItem({name: "ClassicX12x12Hard", description: "ClassicX hard sudoku grid of size 12x12", price: 4, imageUrl: null}),
   makeShopItem({name: "ClassicX14x14Normal", description: "ClassicX normal sudoku grid of size 14x14", price: 5, imageUrl: null}),
   makeShopItem({name: "ClassicX14x14Hard", description: "ClassicX hard sudoku grid of size 14x14", price: 6, imageUrl: null}),
   makeShopItem({name: "ClassicX16x16Normal", description: "ClassicX normal sudoku grid of size 16x16", price: 8, imageUrl: null}),
   makeShopItem({name: "ClassicX16x16Hard", description: "ClassicX hard sudoku grid of size 16x16", price: 10, imageUrl: null}),

   makeShopItem({name: "Jigsaw12x12Hard", description: "Jigsaw hard sudoku grid of size 12x12", price: 4, imageUrl: null}),
   makeShopItem({name: "Jigsaw14x14Normal", description: "Jigsaw normal sudoku grid of size 14x14", price: 5, imageUrl: null}),
   makeShopItem({name: "Jigsaw14x14Hard", description: "Jigsaw hard sudoku grid of size 14x14", price: 6, imageUrl: null}),
   makeShopItem({name: "Jigsaw16x16Normal", description: "Jigsaw normal sudoku grid of size 16x16", price: 8, imageUrl: null}),
   makeShopItem({name: "Jigsaw16x16Hard", description: "Jigsaw hard sudoku grid of size 16x16", price: 10, imageUrl: null}),
]

const initShop = async () => {
   await DBShopItem.deleteMany({});
   for(const shopItem of shopItems){
      await makeDBShopItem(shopItem).save();
   }
}

const findAllShopItems = async () => {
   const shopItems = await DBShopItem.find({});
   return shopItems.map(makeShopItem);
};

const findShopItemByName = async (name) => {
   const shopItem = await DBShopItem.findOne({name});
   return makeShopItem(shopItem);
};

const saveShopItem = async (shopItem) => {
   await makeDBShopItem(shopItem).save();
}

module.exports = {
   findAllShopItems,
   saveShopItem,
   findShopItemByName,
   initShop,
};
