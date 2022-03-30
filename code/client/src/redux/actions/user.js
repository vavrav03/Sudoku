import { responseError } from './error';
import api from 'api';
import { push } from 'connected-react-router';
import routes from 'routes';
import d from 'entities/index';
const {makeUser} = d;

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

export const startLoadingUser = () => {
   return {
      type: START_LOADING_USER,
   };
};

export const stopLoadingUser = () => {
   return {
      type: STOP_LOADING_USER,
   };
};

export const attemptUpdateUser = (showNotificationError = false) => {
   return async (dispatch, getState) => {
      try {
         dispatch(startLoadingUser());
         const res = await api.getUser();
         const user = makeUser(res.data);
         dispatch(updateUser(user));
      } catch (error) {
         console.log(error);
         if (showNotificationError) {
            dispatch(responseError(error.response, error.response.data.message));
         }
         dispatch(stopLoadingUser());
      }
   };
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

export const attemptLogin = (userData) => {
   return async (dispatch, getState) => {
      try {
         const res = await api.postLogin(userData);
         const user = makeUser(res.data);
         console.log(user);
         dispatch(login(user));
         dispatch(push(routes.home));
      } catch (error) {

         dispatch(responseError(error.response, error.response.data.message));
      }
   };
};

export const attemptRegister = (userData) => {
   return async (dispatch, getState) => {
      try {
         const res = await api.postRegister(userData);
         const user = makeUser(res.data);
         console.log(userData);
         dispatch(attemptLogin(userData));
         dispatch(push(routes.home));
         // dispatch(attemptUpdateUser());
      } catch (error) {
         dispatch(responseError(error.response, error.response.data.message));
      }
   };
};

export const attemptLogout = () => {
   return async (dispatch, getState) => {
      try {
         const res = await api.postLogout();
         dispatch(logout());
         dispatch(push(routes.signIn));
      } catch (error) {
         dispatch(responseError(error.response, error.response.data.message));
      }
   };
};
