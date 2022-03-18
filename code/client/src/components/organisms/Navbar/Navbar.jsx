import React from 'react';
import { Badge, IconButton, Divider } from '@mui/material';

import {
   Menu as MenuIcon,
   Notifications as NotificationsIcon,
   LocalGroceryStore as LocalGroceryStoreIcon,
} from '@mui/icons-material';

import UserNavbarCard from 'components/organisms/Navbar/UserNavbarCard';
import { Link } from 'react-router-dom';
import games from 'games';
import { useSelector } from 'react-redux';
import {
   getCurrentlyPlayedType,
   getCurrentlyPlayedInstance,
} from 'redux/reducers/games';
// import { getOpenedGame } from 'games';

function Navbar({ currentlyPlayedGame, isSidebarOpen, menuButtonAction }) {
   const cpgName = useSelector(getCurrentlyPlayedType);
   const cpgInstance = useSelector(getCurrentlyPlayedInstance);
   let cgNameString = '';
   let cgSizeString =  '';
   let cgDifficultyString = ''
   if(cpgInstance){
      let cgNameString = cpgInstance;
      let cgSizeString = `- ${cpgInstance.size}x${cpgInstance.size}`;
      let cgDifficultyString = ` - ${cpgInstance.difficulty}`;
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
               onClick={() => {}}
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
