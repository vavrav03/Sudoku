import { push } from 'connected-react-router';
import routes from 'routes';
import { responseError } from './error';

export const REPLACE_GAME = 'REPLACE_GAME';
export const START_LOADING_GAME = 'START_LOADING_GAME';
export const STOP_LOADING_GAME = 'STOP_LOADING_GAME';
export const SET_CURRENTLY_PLAYED_GAME = 'SET_CURRENTLY_PLAYED_GAME';
export const SET_CURRENTLY_FOCUSED_CELL = 'SET_CURRENTLY_FOCUSED_CELL';

// export const startGame = (makeMethod, apiCall, type) => {
//    return async (dispatch, getState) => {
//       try {
//          let obj = getState().games[type][size];
//          console.log(obj);
//          if (obj === 'loading' || obj?.playingBoard) {
//             console.log('doing nothing');
//          } else {
//             dispatch(loadNewGame(makeMethod, apiCall, type));
//          }
//          dispatch(setCurrentlyPlayedGame(type));
// if (window.location.pathname !== routes.games) {
//    dispatch(push(routes.games));
// }
//       } catch (error) {
//          console.log(error);
//          // dispatch(responseError(error.response, error.response.data.message));
//       }
//    };
// };

export const loadNewGame = (makeMethod, apiCall, type, size, difficulty) => {
   return async (dispatch, getState) => {
      try {
         dispatch(startLoadingGame(type));
         const res = await apiCall(size, difficulty);
         const game = makeMethod(res.data);
         dispatch(replaceGame(type, game));
      } catch (error) {
         console.log(error);
         dispatch(push(routes.home));
         dispatch(responseError(error.response, error.response.data.message));
         dispatch(setCurrentlyPlayedGame(null, null, null));
         dispatch(stopLoadingGame(type));
      }
   };
};

const startLoadingGame = (type) => {
   return {
      type: START_LOADING_GAME,
      payload: {
         type,
      },
   };
};

const stopLoadingGame = (type) => {
   return {
      type: STOP_LOADING_GAME,
      payload: {
         type,
      },
   };
};

export const setCurrentlyPlayedGame = (type) => {
   return {
      type: SET_CURRENTLY_PLAYED_GAME,
      payload: {
         type,
      },
   };
};

export const replaceGame = (type, gameData) => {
   return {
      type: REPLACE_GAME,
      payload: { type, gameData },
   };
};

export const chooseGameType = (type) => {
   return async (dispatch, getState) => {
      if (window.location.pathname !== routes.games) {
         dispatch(push(routes.games));
      }
      dispatch(setCurrentlyPlayedGame(type))
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
//       let defaultsize
//       if(gameObject.type === games.classic.type){
//          defaultsize = 'easy';
//       } else {
//          defaultsize = 9;
//       }
//       if (gameObject.type !== getState().games.currentlyPlayed.type) {
//          dispatch(setCurrentlyPlayedGame(gameObject.type, defaultsize));
//       }
//    };
// };
