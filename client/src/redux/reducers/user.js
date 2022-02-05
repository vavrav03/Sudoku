import { LOGIN_USER, LOGOUT_USER } from "../actions/auth";
import { UPDATE_USER, START_LOADING_USER, STOP_LOADING_USER} from "../actions/user";

export default function user(user = {isUserLoading: false}, action) {
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
   console.log(state);
   return isUserLoading(state) && !state.user.email
}

export { user };
