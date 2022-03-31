import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CssBaseline } from '@mui/material';
import ClipLoader from 'react-spinners/ClipLoader';
import { NormalPage } from 'components/templates';
import { EnhancedTable, BuyItemDialogIcon } from 'components/organisms';

import { attemptUpdateShop } from 'redux/actions';
import { getShopItemsSelector, isShopLoadingSelector, getCurrentlyBuyingItemsSelector } from 'redux/selectors';

function ShopPage() {
   const dispatch = useDispatch();
   React.useEffect(() => {
      dispatch(attemptUpdateShop());
   }, []);
   const buyingItems = useSelector(getCurrentlyBuyingItemsSelector);
   const data = useSelector(getShopItemsSelector);
   const isShopLoading = useSelector(isShopLoadingSelector);
   console.log(isShopLoading);
   const columns = React.useMemo(
      () => [
         {
            Header: 'Name',
            accessor: 'name',
            maxWidth: 70,
         },
         {
            Header: 'Description',
            accessor: 'description',
            width: 150,
         },
         {
            Header: 'Price',
            accessor: 'price',
            width: 30,
         },
         {
            Header: 'Buy',
            accessor: 'buy',
            noSortToggle: true,
            maxWidth: '20px',
            Cell: ({row}) => {
               return (
                  <BuyItemDialogIcon
                     name={row.original.name}
                     description={row.original.description}
                     price={row.original.price}
                  />
               );
            },
         },
      ],
      []
   );
   if (isShopLoading) {
      return (
         <NormalPage>
            <ClipLoader color={'white'} loading={true} size={38} />
         </NormalPage>
      );
   }

   const buyedItemsComponent = buyingItems.length != 0 ? (
      <div className='buyed-items-container'>
         {buyingItems.map(item => <><span>{item}</span><span>, </span> </>)} 
         <ClipLoader loading={true} size={38} />
      </div>
   ) : null;
   return (
      <NormalPage>
         <div className='offer-container'>
            <div>
               <CssBaseline />
               <EnhancedTable
                  columns={columns}
                  toolbarRightIcons={[buyedItemsComponent]}
                  // data={shopData}
                  setData={() => {}}
                  updateMyData={() => {}}
                  data={data}
                  addButton={false}
                  headding={'Shop page'}
               />
            </div>
         </div>
      </NormalPage>
   );
}

export default ShopPage;
export { ShopPage };
