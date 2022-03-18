import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "redux/reducers/user";

const ProtectedRoute = ({ component: Comp, user, path, ...rest }) => {
   if (user) {
      return <Route path={path} component={Comp} {...rest}/>;
   } else {
      window.location.href = "/login";
      return null;
   }
};

const mapStateToProps = (state) => {
   const user = getUser(state);
   return {
      user: user,
   };
};

export default connect(mapStateToProps)(ProtectedRoute);