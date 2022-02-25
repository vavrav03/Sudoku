import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { userReducer } from './user';
import { gamesReducer } from './games';

export const createRootReducer = (history) =>
   combineReducers({
      router: connectRouter(history),
      notifications: notifications,
      user: userReducer,
      games: gamesReducer,
   });

export default createRootReducer;
