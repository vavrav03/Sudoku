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
   constructor(route, name, gameType, subTypes, makeMethod, apiCall) {
      this.route = route;
      this.name = name;
      this.gameType = gameType;
      this.subTypes = subTypes;
      this.makeMethod = makeMethod;
      this.apiCall = apiCall;
   }
}

const games = {
   classic: new Game(
      routes.classic,
      'Classic',
      'classic',
      ['easy', 'normal', 'hard'],
      makeClassicGame,
      api.getClassicGame
   ),
   classicResized: new Game(
      routes.classicResized,
      'Classic Resized',
      'classicResized',
      [4, 6, 8, 9, 10, 12, 14, 16],
      makeClassicResizedGame,
      api.getClassicResizedGame
   ),
   classicX: new Game(
      routes.classicX,
      'ClassicX',
      'classicX',
      [4, 9, 16],
      makeClassicXGame,
      api.getClassicXGame
   ),
   jigsaw: new Game(
      routes.jigsaw,
      'Jigsaw',
      'jigsaw',
      [4, 6, 8, 9, 10, 12, 14, 16],
      makeJigsawGame,
      api.getJigsawGame
   ),
   samurai: new Game(
      routes.samurai,
      'Samurai',
      'samurai',
      [4, 6, 8, 9],
      makeSamuraiGame,
      api.getSamuraiGame
   ),
   samuraiMixed: new Game(
      routes.samuraiMixed,
      'Samurai mixed',
      'samuraiMixed',
      [4, 6, 8, 9],
      makeSamuraiMixedGame,
      api.getSamuraiMixedGame
   ),
};

export default games;
