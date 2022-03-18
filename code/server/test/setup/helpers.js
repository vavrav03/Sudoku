const mongoose = require('mongoose');

const gridEquals = (generatedGrid, solutionGrid) => {
   for (let i = 0; i < generatedGrid.length; i++) {
      for (let j = 0; j < generatedGrid.length; j++) {
         expect(generatedGrid[i][j]).toBe(solutionGrid[i][j]);
      }
   }
};

module.exports = {
   gridEquals,
};
