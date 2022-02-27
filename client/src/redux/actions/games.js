import api from 'api';
import { push } from 'connected-react-router';
import routes from 'routes';
import d from 'entities/index';
import { responseError } from './error';
import games from 'games';

export const REPLACE_GAME = 'REPLACE_GAME';
export const START_LOADING_GAME = 'START_LOADING_GAME';
export const STOP_LOADING_GAME = 'STOP_LOADING_GAME';
export const SET_CURRENTLY_PLAYED_GAME = 'SET_CURRENTLY_PLAYED_GAME';
export const SET_CURRENTLY_FOCUSED_CELL = 'SET_CURRENTLY_FOCUSED_CELL';

export const startGame = (makeMethod, apiCall, gameType, gameSubtype) => {
   return async (dispatch, getState) => {
      try {
         let obj = getState().games[gameType][gameSubtype];
         console.log(obj);
         if (obj === 'loading' || obj?.playingBoard) {
            console.log('doing nothing');
         } else {
            dispatch(loadNewGame(makeMethod, apiCall, gameType, gameSubtype));
         }
         dispatch(setCurrentlyPlayedGame(gameType, gameSubtype));
         if (window.location.pathname !== routes.games) {
            dispatch(push(routes.games));
         }
      } catch (error) {
         console.log(error);
         // dispatch(responseError(error.response, error.response.data.message));
      }
   };
};

export const loadNewGame = (makeMethod, apiCall, gameType, gameSubtype) => {
   return async (dispatch, getState) => {
      try {
         dispatch(startLoadingGame(gameType, gameSubtype));
         const res = await apiCall(gameSubtype);
         const game = makeMethod(res.data);
         dispatch(replaceGame(gameType, gameSubtype, game));
      } catch (error) {
         console.log(error);
         dispatch(push(routes.home));
         dispatch(responseError(error.response, error.response.data.message));
         dispatch(setCurrentlyPlayedGame(null, null));
         dispatch(stopLoadingGame(gameType, gameSubtype));
      }
   };
};

const startLoadingGame = (gameType, gameSubtype) => {
   return {
      type: START_LOADING_GAME,
      payload: {
         gameType,
         gameSubtype,
      },
   };
};

const stopLoadingGame = (gameType, gameSubtype) => {
   return {
      type: STOP_LOADING_GAME,
      payload: {
         gameType,
         gameSubtype,
      },
   };
};

const setCurrentlyPlayedGame = (gameType, gameSubtype) => {
   return {
      type: SET_CURRENTLY_PLAYED_GAME,
      payload: {
         gameType,
         gameSubtype,
      },
   };
};

export const replaceGame = (gameType, gameSubtype, gameData) => {
   return {
      type: REPLACE_GAME,
      payload: { gameType, gameSubtype, gameData },
   };
};

export const setCurrentlyFocusedCell = (row, col) => {
   return {
      type: SET_CURRENTLY_FOCUSED_CELL,
      payload: {
         row,
         col,
      },
   };
};

// export const checkGameRoute = () => {
//    return async (dispatch, getState) => {
//       let gameObject;
//       for(const game in games){
//          if(games[game].route === window.location.pathname){
//             gameObject = games[game];
//          }
//       }
//       let defaultGameSubtype
//       if(gameObject.gameType === games.classic.gameType){
//          defaultGameSubtype = 'easy';
//       } else {
//          defaultGameSubtype = 9;
//       }
//       if (gameObject.gameType !== getState().games.currentlyPlayed.gameType) {
//          dispatch(setCurrentlyPlayedGame(gameObject.gameType, defaultGameSubtype));
//       }
//    };
// };
