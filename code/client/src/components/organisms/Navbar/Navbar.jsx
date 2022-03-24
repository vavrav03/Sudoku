import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, IconButton, Divider } from '@mui/material';
import {
   Menu as MenuIcon,
   Notifications as NotificationsIcon,
   LocalGroceryStore as LocalGroceryStoreIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

import routes from 'routes';
import {
   getCurrentlyPlayedTypeSelector,
   getCurrentlyPlayedInstanceSelector,
} from 'redux/selectors';
import { push } from 'redux/actions';
import {UserNavbarCard} from 'components/organisms';
// import { getOpenedGame } from 'games';

function Navbar({ isSidebarOpen, menuButtonAction }) {
   const dispatch = useDispatch();
   const cpgName = useSelector(getCurrentlyPlayedTypeSelector);
   const cpgInstance = useSelector(getCurrentlyPlayedInstanceSelector);
   let cgNameString = '';
   let cgSizeString =  '';
   let cgDifficultyString = ''
   if(cpgInstance){
      cgNameString = cpgName;
      cgSizeString = `- ${cpgInstance.size}x${cpgInstance.size}`;
      cgDifficultyString = ` - ${cpgInstance.difficulty}`;
   }
   // const game = getOpenedGame(location.pathname);
   return (
      <header className={`navbar ${isSidebarOpen ? 'open' : ''}`}>
         <nav className='nav-left'>
            {!isSidebarOpen ? (
               <>
                  <IconButton
                     aria-label='open drawer'
                     onClick={menuButtonAction}
                     className={'nav-item brand-button'}
                  >
                     <MenuIcon className={'brand-icon'} />
                     {/* <span>{game?.name}</span> */}
                  </IconButton>
                  <Divider className={'divider'} orientation='vertical' />
               </>
            ) : null}
            {cgNameString ? (
               <>
                  <div className='current-game-name-container'>
                     {`${cgNameString} ${cgSizeString} ${cgDifficultyString}`}
                  </div>
                  <Divider className={'divider'} orientation='vertical' />
               </>
            ) : null}

            <Link className='nav-item' to='/'>
               Home
            </Link>
         </nav>
         <nav className='nav-right'>
            <IconButton
               className='nav-item'
               data-tip={'Shop'}
               onClick={(e) => {dispatch(push(routes.shop))}}
            >
               <LocalGroceryStoreIcon />
            </IconButton>
            <IconButton
               className='nav-item'
               data-tip={'Notifications'}
               onClick={() => {}}
            >
               <Badge badgeContent={17} color='secondary'>
                  <NotificationsIcon />
               </Badge>
            </IconButton>
            <UserNavbarCard />
         </nav>
      </header>
   );
}

export default Navbar;
export { Navbar };
