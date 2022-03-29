import React from "react";

import { CssBaseline } from '@mui/material';
import {NormalPage} from "components/templates";
import {EnhancedTable} from "components/organisms";

function ShopPage() {
   const columns = React.useMemo(
      () => [
         {
            Header: 'Name',
            accessor: 'name',
         },
         {
            Header: 'Description',
            accessor: 'description',
         },
         {
            Header: 'Price',
            accessor: 'price',
         },
      ],
      []
   );

   const [data, setData] = React.useState([]);

   return (
      <NormalPage>
         <div className="offer-container">
            <div>
         <CssBaseline />
         <EnhancedTable
            columns={columns}
            // data={shopData}
            setData={()=>{}}
            updateMyData={()=>{}}
            data={[{name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}, {name: 'test', description: 'test', price: 'test'}]}
            addButton={false}
            headding={'Meeting offers'}
         />
      </div>
         </div>
      </NormalPage>
   );
}

export default ShopPage;
export {ShopPage}