import React from "react";

function Separator({middleText}) {
   return (
      <div className="center-children">
         <div className="separator-border-line" />
         <span className="separator-content">{middleText}</span>
         <div className="separator-border-line" />
      </div>
   );
}

export default Separator;
export {Separator}
