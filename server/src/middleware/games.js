const getGameStatusHandler = (req, res, next) => {
   try {
      if (res.locals.game) {
         return res
            .status(200)
            .send(res.locals.createVariant(res.locals.game).toAPIObject());
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
