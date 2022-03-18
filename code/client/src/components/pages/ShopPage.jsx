import React, { useEffect } from "react";
import NormalPage from "components/templates/NormalPage";
import OfferTable from "components/organisms/Table/OfferTable";
import { connect } from "react-redux";

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
