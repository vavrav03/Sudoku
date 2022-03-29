const buildMakeShopItem = () => {
   const makeShopItem = ({ name, description, price, imageLink }) => {
      if (!name) {
         throw Error('Name must be defined');
      }
      if (!description) {
         throw Error('Description must be defined');
      }
      if (!price) {
         throw Error('Price must be defined');
      }
      return Object.freeze({
         getName: () => name,
         getDescription: () => description,
         getPrice: () => price,
         getImageLink: () => imageLink,
         toAPIObject: () => {
            return {
               name,
               description,
               price,
               imageLink,
            };
         },
      });
   };
   return makeShopItem ;
};

module.exports = {
   buildMakeShopItem,
};
