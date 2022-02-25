import { LOGIN_USER, LOGOUT_USER, UPDATE_USER, START_LOADING_USER, STOP_LOADING_USER } from "../actions";

export function userReducer(user = {isUserLoading: false}, action) {
   switch (action.type) {
      case START_LOADING_USER:
         return { ...user, isUserLoading: true };
      case STOP_LOADING_USER:
         return {...user, isUserLoading: false}
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

export const getUser = (state) => {
   return state.user;
};

export const getUserEmail = (state) => {
   return state.user.email
};

export const isUserLoading = (state) => {
   return state?.user?.isUserLoading;
};

export const isLoadingForTheFirstTime = (state) => {
   return isUserLoading(state) && !state.user.email
}