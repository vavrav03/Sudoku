import api from 'api';
import d from 'entities/index';
import {
   fillInvalidGridClassic,
   fillInvalidGridClassicX,
   fillInvalidGridJigsaw,
} from 'utils/gameValidator';
const {
   makeClassicGame,
   makeClassicXGame,
   makeJigsawGame,
   makeSamuraiGame,
   makeSamuraiMixedGame,
} = d;

class Game {
   constructor(name, type, sizes, makeMethod, apiCall, fillInvalidGrid) {
      this.name = name;
      this.type = type;
      this.sizes = sizes;
      this.makeMethod = makeMethod;
      this.apiCall = apiCall;
      this.fillInvalidGrid = fillInvalidGrid;
   }
}

const games = {
   classic: new Game(
      'Classic',
      'classic',
      [4, 6, 8, 9, 10, 12, 14, 16],
      makeClassicGame,
      api.getClassicGame,
      fillInvalidGridClassic
   ),
   classicX: new Game(
      'ClassicX',
      'classicX',
      [4, 9, 16],
      makeClassicXGame,
      api.getClassicXGame,
      fillInvalidGridClassicX
   ),
   jigsaw: new Game(
      'Jigsaw',
      'jigsaw',
      [4, 6, 8, 9, 10, 12, 14, 16],
      makeJigsawGame,
      api.getJigsawGame,
      fillInvalidGridJigsaw
   ),
   samurai: new Game(
      'Samurai',
      'samurai',
      [9, 12],
      makeSamuraiGame,
      api.getSamuraiGame,
      null
   ),
   samuraiMixed: new Game(
      'Samurai Mixed',
      'samuraiMixed',
      [9, 12],
      makeSamuraiMixedGame,
      api.getSamuraiMixedGame,
      null
   ),
};

export default games;
