import routes from 'routes';
import api from 'api';
import d from 'entities/index';
const {
   makeClassicGame,
   makeClassicResizedGame,
   makeClassicXGame,
   makeJigsawGame,
   makeSamuraiGame,
   makeSamuraiMixedGame,
} = d;

class Game {
   constructor(name, gameType, subTypes, makeMethod, apiCall) {
      this.name = name;
      this.gameType = gameType;
      this.subTypes = subTypes;
      this.makeMethod = makeMethod;
      this.apiCall = apiCall;
   }
}

const games = {
   classic: new Game(
      'Classic',
      'classic',
      ['easy', 'normal', 'hard'],
      makeClassicGame,
      api.getClassicGame
   ),
   classicResized: new Game(
      'Classic Resized',
      'classicResized',
      [4, 6, 8, 9, 10, 12, 14, 16],
      makeClassicResizedGame,
      api.getClassicResizedGame
   ),
   classicX: new Game(
      'ClassicX',
      'classicX',
      [4, 9, 16],
      makeClassicXGame,
      api.getClassicXGame
   ),
   jigsaw: new Game(
      'Jigsaw',
      'jigsaw',
      [4, 6, 8, 9, 10, 12, 14, 16],
      makeJigsawGame,
      api.getJigsawGame
   ),
   samurai: new Game(
      'Samurai',
      'samurai',
      [4, 6, 8, 9],
      makeSamuraiGame,
      api.getSamuraiGame
   ),
   samuraiMixed: new Game(
      'Samurai mixed',
      'samuraiMixed',
      [4, 6, 8, 9],
      makeSamuraiMixedGame,
      api.getSamuraiMixedGame
   ),
};

export default games;
