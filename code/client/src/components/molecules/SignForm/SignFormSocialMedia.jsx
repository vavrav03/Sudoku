import React from "react";
import {
   FacebookSocialIcon,
   GoogleSocialIcon,
} from "components/atoms/Icons";
import { connect } from "react-redux";

function SocialMedia() {
   return (
      <div className={"social-media"}>
         <a href="/api/auth/facebook">
            <FacebookSocialIcon />
         </a>
         <a href="/api/auth/google">
            <GoogleSocialIcon />
         </a>
      </div>
   );
}
const ConnectedSocialMedia = connect(null)(SocialMedia);

export default ConnectedSocialMedia;
export { ConnectedSocialMedia, SocialMedia };
