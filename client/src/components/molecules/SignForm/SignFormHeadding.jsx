import { Typography } from "@mui/material";
import { LockIcon } from "components/atoms/Icons";
import { PropTypes } from "prop-types";

import React from "react";

function SignFormHeadding({ text }) {
   return (
      <div className={"sign-form-headding"}>
         <LockIcon />
         <Typography variant="h5">{text}</Typography>
      </div>
   );
}

function SignInFormHeadding({ text }) {
   return (
      <SignFormHeadding text={"Welcome back!"} />
   );
}

function SignUpFormHeadding({ text }) {
   return (
      <SignFormHeadding text={"Create an account"} />
   );
}

SignFormHeadding.propTypes = {
   text: PropTypes.string.isRequired,
};

export default SignFormHeadding;
export { SignFormHeadding, SignInFormHeadding, SignUpFormHeadding };
