import { getUser } from 'api/user';
import { responseError } from './error';

export const UPDATE_USER = 'UPDATE_USER';
export const START_LOADING_USER = 'START_LOADING_USER';
export const STOP_LOADING_USER = 'STOP_LOADING_USER';

export const updateUser = (user) => {
   return {
      type: UPDATE_USER,
      user,
   };
};

export const startLoading = () => {
   return {
      type: START_LOADING_USER,
   };
};

export const stopLoading = () => {
   return {
      type: STOP_LOADING_USER
   }
}

export const attemptUpdateUser =
   (showNotificationError = false) =>
   (dispatch) => {
      dispatch(startLoading());
      getUser()
         .then((response) => {
            const { data } = response;
            dispatch(updateUser(data.user));
         })
         .catch((err) => {
            if (showNotificationError) {
               dispatch(responseError(err.response, err.response.data.message));
            }
            dispatch(stopLoading());
         });
   };
