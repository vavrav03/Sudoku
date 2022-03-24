import React from "react";
import {
   FacebookSocialIcon,
   GoogleSocialIcon,
} from "components/atoms/Icons";

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
export default SocialMedia;
export { SocialMedia };
