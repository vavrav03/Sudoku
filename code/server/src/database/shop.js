const { makeShopItem } = require('/src/entities');
const { DBShopItem, makeDBShopItem } = require('/src/database/models');

const shopItems = [
   makeShopItem({name: "Classic12x12Hard", description: "Classic hard sudoku grid of size 12x12", price: 4, imageUrl: null}),
   makeShopItem({name: "Classic14x14Hard", description: "Classic hard sudoku grid of size 14x14", price: 6, imageUrl: null}),
   makeShopItem({name: "Classic16x16Medium", description: "Classic medium sudoku grid of size 16x16", price: 8, imageUrl: null}),
   makeShopItem({name: "Classic16x16Hard", description: "Classic hard sudoku grid of size 16x16", price: 10, imageUrl: null}),

   makeShopItem({name: "ClassicX12x12Hard", description: "ClassicX hard sudoku grid of size 12x12", price: 4, imageUrl: null}),
   makeShopItem({name: "ClassicX14x14Medium", description: "ClassicX medium sudoku grid of size 14x14", price: 5, imageUrl: null}),
   makeShopItem({name: "ClassicX14x14Hard", description: "ClassicX hard sudoku grid of size 14x14", price: 6, imageUrl: null}),
   makeShopItem({name: "ClassicX16x16Medium", description: "ClassicX medium sudoku grid of size 16x16", price: 8, imageUrl: null}),
   makeShopItem({name: "ClassicX16x16Hard", description: "ClassicX hard sudoku grid of size 16x16", price: 10, imageUrl: null}),

   makeShopItem({name: "Jigsaw12x12Hard", description: "Jigsaw hard sudoku grid of size 12x12", price: 4, imageUrl: null}),
   makeShopItem({name: "Jigsaw14x14Medium", description: "Jigsaw medium sudoku grid of size 14x14", price: 5, imageUrl: null}),
   makeShopItem({name: "Jigsaw14x14Hard", description: "Jigsaw hard sudoku grid of size 14x14", price: 6, imageUrl: null}),
   makeShopItem({name: "Jigsaw16x16Medium", description: "Jigsaw medium sudoku grid of size 16x16", price: 8, imageUrl: null}),
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

const saveShopItem = async (shopItem) => {
   await makeDBShopItem(shopItem).save();
}

module.exports = {
   findAllShopItems,
   saveShopItem,
   initShop,
};
