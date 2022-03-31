const makeGameMiddleware = ({ database }) => {
   //does everything that is required when dealing with premium games and returns true if allowed to proceed with sending game
   const doPremiumStuff = async (req, res, game) => {
      const shopItems = await database.findAllShopItems();
      const shopItem = shopItems.find((item) => {
         const lowerCaseItemName = item.getName().toLowerCase();
         return (
            lowerCaseItemName.includes(game.getType()) &&
            lowerCaseItemName.includes(`${game.getSolution().length}x${game.getSolution().length}`) &&
            lowerCaseItemName.includes(game.getDifficulty())
         );
      });
      if(!shopItem) {
         return true;
      }
      if(!req.user){
         return false;
      }
      const validBoughtItem = req.user.getBoughtItems().find((item) => item.name === shopItem.getName());
      if(validBoughtItem){
         req.user.removeBoughtItem(validBoughtItem.name);
         await database.updateUser(req.user.getEmail(), req.user);
         return true;
      } else {
         return false;
      }
   }

   const getGameStatusHandler = async (req, res, next) => {
      try {
         if (!res.locals.game) {
            return res
               .status(500)
               .send({ message: 'No grids for this sudoku type' });
         }
         if(!await doPremiumStuff(req, res, res.locals.game)){
            return res.status(400).send({message: 'You are not allowed to start this premium game'});
         }
         const game = res.locals.createVariant(res.locals.game);
         if (!req.user) {
            return res.status(200).send(game.toAPIObject());
         }
         const unfinishedGame = {
            ...game.toAPIObject(),
            created_at: new Date().toISOString(),
            last_played: new Date().toISOString(),
         };
         req.user.addUnfinishedGame(unfinishedGame);
         await database.updateUser(req.user.getEmail(), req.user);
         return res.status(200).send(game.toAPIObject());
      } catch (err) {
         console.log(err);
      }
   };
   return { getGameStatusHandler };
};


module.exports = {
   makeGameMiddleware,
};
