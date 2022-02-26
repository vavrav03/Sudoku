import routes from 'routes';
import api from 'api';
import d from 'entities/index';
import {
   fillInvalidGridClassic,
   fillInvalidGridClassicX,
   fillInvalidGridJigsaw,
} from 'utils/gameValidator';
const {
   makeClassicGame,
   makeClassicResizedGame,
   makeClassicXGame,
   makeJigsawGame,
   makeSamuraiGame,
   makeSamuraiMixedGame,
} = d;

class Game {
   constructor(name, gameType, subTypes, makeMethod, apiCall, fillInvalidGrid) {
      this.name = name;
      this.gameType = gameType;
      this.subTypes = subTypes;
      this.makeMethod = makeMethod;
      this.apiCall = apiCall;
      this.fillInvalidGrid = fillInvalidGrid;
   }
}

const games = {
   classic: new Game(
      'Classic',
      'classic',
      ['easy', 'normal', 'hard'],
      makeClassicGame,
      api.getClassicGame,
      fillInvalidGridClassic
   ),
   classicResized: new Game(
      'Classic Resized',
      'classicResized',
      [4, 6, 8, 9, 10, 12, 14, 16],
      makeClassicResizedGame,
      api.getClassicResizedGame,
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
      [4, 6, 8, 9],
      makeSamuraiGame,
      api.getSamuraiGame,
      null
   ),
   samuraiMixed: new Game(
      'Samurai mixed',
      'samuraiMixed',
      [4, 6, 8, 9],
      makeSamuraiMixedGame,
      api.getSamuraiMixedGame,
      null
   ),
};

export default games;
