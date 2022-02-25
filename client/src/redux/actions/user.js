import { responseError } from './error';
import api from 'api';
import { push } from 'connected-react-router';
import routes from 'routes';

export const UPDATE_USER = 'UPDATE_USER';
export const START_LOADING_USER = 'START_LOADING_USER';
export const STOP_LOADING_USER = 'STOP_LOADING_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

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
      type: STOP_LOADING_USER,
   };
};

export const attemptUpdateUser =
   (showNotificationError = false) =>
   (dispatch) => {
      dispatch(startLoading());
      api.getUser()
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

export const login = (user) => {
   return {
      type: LOGIN_USER,
      user,
   };
};

export const logout = () => {
   return {
      type: LOGOUT_USER,
   };
};

export const attemptLogin = (user) => (dispatch) =>
   api
      .postLogin(user)
      .then((response) => {
         const { data } = response;
         dispatch(login(data.user));
         dispatch(push(routes.home));
      })
      .catch((err) =>
         dispatch(responseError(err.response, err.response.data.message))
      );

export const attemptRegister = (newUser) => (dispatch) =>
   api
      .postRegister(newUser)
      .then((response) => {
         dispatch(attemptLogin(newUser));
      })
      .then(() => dispatch(push(routes.home)))
      .catch((err) =>
         dispatch(responseError(err.response, err.response.data.message))
      );

export const attemptLogout = () => (dispatch) =>
   api
      .postLogout()
      .then((response) => {
         dispatch(logout());
         dispatch(push(routes.singIn));
      })
      .catch((res) => dispatch(responseError(res)));
