import React from "react";

import {NormalPage} from "components/templates";
import {OfferTable} from "components/organisms";

function ShopPage() {
   return (
      <NormalPage>
         <div className="offer-container">
            <OfferTable />
         </div>
      </NormalPage>
   );
}

export default ShopPage;
export {ShopPage}