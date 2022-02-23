const getGameStatusHandler = (req, res, next) => {
   console.log(res.locals.game);
   try {
      if (res.locals.game) {
         return res.status(200).send(res.locals.game.toAPIObject());
      } else {
         return res
            .status(500)
            .send({ message: 'No grids for this sudoku type' });
      }
   } catch (err) {
      console.log(err);
   }
};

module.exports = {
   getGameStatusHandler,
};
