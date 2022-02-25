import React from 'react';
import { Badge, IconButton, Divider } from '@mui/material';

import {
   Menu as MenuIcon,
   Notifications as NotificationsIcon,
   LocalGroceryStore as LocalGroceryStoreIcon,
} from '@mui/icons-material';

import UserNavbarCard from 'components/organisms/Navbar/UserNavbarCard';
import { connect } from 'react-redux';
import { notImplementedYet } from 'redux/actions';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import games from 'games';
// import { getOpenedGame } from 'games';

function Navbar({ currentlyPlayedGame, isSidebarOpen, menuButtonAction }) {
   let currentlyPlayedGameName;
   try{
      currentlyPlayedGameName = <><div className='current-game-name-container'>{`${
         games[currentlyPlayedGame.gameType].name
      } - ${
         typeof currentlyPlayedGame.gameSubtype === 'number'
            ? `${currentlyPlayedGame.gameSubtype}x${currentlyPlayedGame.gameSubtype}`
            : currentlyPlayedGame.gameSubtype
      }`}</div>
      <Divider className={'divider'} orientation='vertical' /></>
   } catch(err){

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
            {currentlyPlayedGameName}
            
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

const mapStateToProps = (state) => {
   return {
      currentlyPlayedGame: state.games.currentlyPlayed,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      showNotImplementedYet: () => dispatch(notImplementedYet()),
   };
};

const ConnectedNavbar = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default ConnectedNavbar;
export { ConnectedNavbar, Navbar };
