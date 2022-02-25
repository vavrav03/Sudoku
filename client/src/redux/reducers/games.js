import {
   REPLACE_GAME,
   START_LOADING_GAME,
   STOP_LOADING_GAME,
   SET_CURRENTLY_PLAYED_GAME,
} from '../actions';
import games from 'games';
import _ from 'lodash';

const gamesStructure = {
   currentlyPlayed: {
      gameType: null,
      gameSubtype: null,
   },
};

for (const game in games) {
   gamesStructure[game.gameType] = {};
   for (const subType of games[game].subTypes) {
      gamesStructure[game.gameType][subType] = null;
   }
}

export function gamesReducer(games = gamesStructure, action) {
   const state = _.cloneDeep(games);
   switch (action.type) {
      case START_LOADING_GAME: {
         const { gameType, gameSubtype } = action.payload;
         state[gameType][gameSubtype] = 'loading';
         return state;
      }
      case STOP_LOADING_GAME: {
         const { gameType, gameSubtype } = action.payload;
         state[gameType][gameSubtype] = null;
         return state;
      }
      case SET_CURRENTLY_PLAYED_GAME: {
         state.currentlyPlayed = action.payload;
         return state;
      }
      case REPLACE_GAME: {
         const { gameType, gameSubtype, gameData } = action.payload;
         state[gameType][gameSubtype] = gameData;
         return state;
      }
      default:
         return games;
   }
}
