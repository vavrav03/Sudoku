import React from "react";

import {Section} from "components/molecules";
import {NormalPage} from "components/templates";

function HomePage() {
   return (
      <NormalPage>
         <Section>
            <h1>Sudoku se vším všudy</h1>
            <p>Tato webová aplikace slouží jako maturitní práce z předmětu programování </p>
         </Section>
         <Section>

         </Section>
      </NormalPage>
   );
}

export default HomePage;
export {HomePage}