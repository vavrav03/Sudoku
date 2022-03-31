import {
   LOGIN_USER,
   LOGOUT_USER,
   UPDATE_USER,
   START_LOADING_USER,
   STOP_LOADING_USER,
} from '../actions';

export function userReducer(user = { isUserLoading: false }, action) {
   switch (action.type) {
      case START_LOADING_USER:
         return { isUserLoading: true };
      case STOP_LOADING_USER:
         return { isUserLoading: false };
      case LOGIN_USER:
         return action.user;
      case LOGOUT_USER:
         return {};
      case UPDATE_USER:
         return action.user;
      default:
         return user;
   }
}

export const getUserSelector = (state) => {
   return state.user;
};

export const isUserLoadingSelector = (state) => {
   return state?.user?.isUserLoading;
};

export const getUserBoughtItemsSelector = (state) => {
   return state?.user?.boughtItems;
}