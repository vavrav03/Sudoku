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
   gamesStructure[games[game].gameType] = {};
   for (const subType of games[game].subTypes) {
      gamesStructure[games[game].gameType][subType] = null;
   }
}
console.log(gamesStructure)

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
         console.log(gameType, gameSubtype)
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

export const getCurrentlyPlayedGameInstance = (state) => {
   const currentlyPlayedData = state.games.currentlyPlayed;
   return state.games[currentlyPlayedData.gameType][currentlyPlayedData.gameSubtype];
}