import React from "react";

import {Section} from "components/molecules";
import {NormalPage} from "components/templates";
import posterMainPage from 'assets/img/posterMainPage.png';

function HomePage() {
   return (
      <NormalPage>
         <img src={posterMainPage} alt="poster" className="poster"/>
      
      </NormalPage>
   );
}

export default HomePage;
export {HomePage}