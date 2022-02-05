import { postRegister, postLogin, postLogout } from "api/auth";
import { push } from "connected-react-router";
import { responseError } from "./error";
import routes from 'routes';

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

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
   postLogin(user)
      .then((response) => {
         const { data } = response;
         dispatch(login(data.user));
         dispatch(push(routes.home));
      })
      .catch((err) => dispatch(responseError(err.response, err.response.data.message)));

export const attemptRegister = (newUser) => (dispatch) =>
   postRegister(newUser)
      .then((response) => {
         dispatch(attemptLogin(newUser));
      })
      .then(() => dispatch(push(routes.home)))
      .catch((err) => dispatch(responseError(err.response, err.response.data.message)));

export const attemptLogout = () => (dispatch) =>
   postLogout()
      .then((response) => {
         dispatch(logout());
         dispatch(push(routes.singIn));
      })
      .catch((res) => dispatch(responseError(res)));
