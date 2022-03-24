import React from "react";
import { Route } from "react-router-dom";
import { getUserSelector } from "redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import routes from "routes";

const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
   const user = useSelector(getUserSelector);
   const dispatch = useDispatch();
   if (user) {
      return <Route path={path} component={Comp} {...rest}/>;
   } else {
      dispatch(push(routes.singIn));
      return null;
   }
};

export default ProtectedRoute;