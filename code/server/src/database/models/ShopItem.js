const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');

const { Schema } = mongoose;

const shopItemSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      price: {
         type: Number,
         required: true,
      },
      imageLink: {
         type: String,
      }
   },
   { versionKey: false, timestamps: true }
);

shopItemSchema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'shop_items' });

const DBShopItem = mongoose.model('shop_items', shopItemSchema);
const makeDBShopItem = (shopItem) => {
   return new DBShopItem({
      name: shopItem.getName(),
      description: shopItem.getDescription(),
      price: shopItem.getPrice(),
      imageLink: shopItem.getImageLink(),
   });
};

module.exports = {
   DBShopItem,
   makeDBShopItem,
};
