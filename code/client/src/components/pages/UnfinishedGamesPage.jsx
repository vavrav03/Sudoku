import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CssBaseline, IconButton } from '@mui/material';
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import ClipLoader from 'react-spinners/ClipLoader';
import { NormalPage } from 'components/templates';
import { EnhancedTable, BuyItemDialogIcon } from 'components/organisms';

import { attemptUpdateShop, push, replaceGame } from 'redux/actions';
import { getUserUnfinishedGamesSelector } from 'redux/selectors';
import routes from 'routes';
import d from 'entities/index';
const {
   makeClassicGame,
   makeClassicXGame,
   makeJigsawGame,
} = d;

function UnfinishedGamesPage() {
   const dispatch = useDispatch();
   const data = useSelector(getUserUnfinishedGamesSelector);
   const columns = React.useMemo(
      () => [
         {
            Header: 'Type',
            accessor: 'type',
            width: 50,
         },
         {
            Header: 'Size',
            accessor: 'playingBoard.length',
            Cell: ({ value }) => {
               return `${value}x${value}`;
            },

            width: 50,
         },
         {
            Header: 'Difficulty',
            accessor: 'difficulty',
            width: 50,
         },
         {
            Header: 'Created on',
            accessor: 'created_at',
            Cell: ({ value }) => {
               return new Date(value).toUTCString();
            },
         },
         {
            Header: 'Last played',
            accessor: 'last_played',
         },
         {
            Header: 'Buy',
            accessor: 'buy',
            noSortToggle: true,
            maxWidth: '20px',
            Cell: ({ row }) => {
               return (
                  <IconButton onClick={e => {
                     switch(row.original.type){
                        case 'classic':
                           dispatch(replaceGame('classic', makeClassicGame(row.original)));
                           break;
                        case 'classicX':
                           dispatch(replaceGame('classicX', makeClassicXGame(row.original)));
                           break;
                        case 'jigsaw':
                           dispatch(replaceGame('jigsaw', makeJigsawGame(row.original)));
                           break;
                     }
                     dispatch(push(routes.games))
                  }}>
                     <PlayArrowIcon></PlayArrowIcon>
                  </IconButton>
               );
            },
         },
      ],
      []
   );
   if(!data){
      dispatch(push(routes.signIn));
      return null;
   }
   return (
      <NormalPage>
         <div className='offer-container'>
            <div>
               <CssBaseline />
               <EnhancedTable
                  columns={columns}
                  toolbarRightIcons={[]}
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

export default UnfinishedGamesPage;
export { UnfinishedGamesPage };
