import { logout } from "./auth";
import { error } from "react-notification-system-redux";
import {push} from 'connected-react-router';
import routes from 'routes';

export const responseError = (res, errorMessage) => (dispatch) => {
   if (res.status === 401) {
      dispatch(logout());
      dispatch(push(routes.login));
   }
   dispatch(notificationError("", errorMessage));
};

export const notificationError = (title = "", errorMessage = "") => {
   return error({
      title: title,
      message: errorMessage,
      position: "tr",
      autoDismiss: 2,
   });
};

export const notImplementedYet = () => {
   return notificationError("Not implemented yet");
}