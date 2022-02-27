import {
   REPLACE_GAME,
   START_LOADING_GAME,
   STOP_LOADING_GAME,
   SET_CURRENTLY_PLAYED_GAME,
   SET_CURRENTLY_FOCUSED_CELL,
} from '../actions';
import games from 'games';
import _ from 'lodash';

const gamesStructure = {
   currentlyPlayedType: null
};

for (const game in games) {
   gamesStructure[games[game].type] = null;
}

export function gamesReducer(games = gamesStructure, action) {
   const gamesClone = _.cloneDeep(games);
   switch (action.type) {
      case START_LOADING_GAME: {
         const { type } = action.payload;
         gamesClone[type] = 'loading';
         return gamesClone;
      }
      case STOP_LOADING_GAME: {
         const { type } = action.payload;
         gamesClone[type] = null;
         return gamesClone;
      }
      case SET_CURRENTLY_PLAYED_GAME: {
         gamesClone.currentlyPlayedType = action.payload.type;
         return gamesClone;
      }
      case REPLACE_GAME: {
         const { type, gameData } = action.payload;
         gamesClone[type] = _.cloneDeep(gameData);
         return gamesClone;
      }
      case SET_CURRENTLY_FOCUSED_CELL: {
         const { row, col } = action.payload;
         gamesClone[gamesClone.currentlyPlayedType].currentlyFocusedCell = {
            row,
            col,
         };
         return gamesClone;
      }
      default:
         return games;
   }
}

export const getCurrentlyPlayedType = (state) => {
   return state.games.currentlyPlayedType;
};

export const getCurrentlyPlayedInstance = (state) => {
   const currentlyPlayedType = getCurrentlyPlayedType(state);
   return state.games[currentlyPlayedType]
};
