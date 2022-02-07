import React from 'react';
import { Badge, IconButton, Divider } from '@mui/material';

import {
   Menu as MenuIcon,
   Notifications as NotificationsIcon,
   LocalGroceryStore as LocalGroceryStoreIcon,
} from '@mui/icons-material';

import UserNavbarCard from 'components/organisms/Navbar/UserNavbarCard';
import { connect } from 'react-redux';
import { notImplementedYet } from 'redux/actions/error';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { getOpenedGame } from 'games';

function Navbar({ isSidebarOpen, menuButtonAction }) {
   const location = useLocation();
   const game = getOpenedGame(location.pathname);
   return (
      <header position='sticky' className='navbar'>
         <nav className='nav-left'>
            {!isSidebarOpen ? (
               <>
                  <IconButton
                     aria-label='open drawer'
                     onClick={menuButtonAction}
                     className={'nav-item brand-button'}
                  >
                     <MenuIcon className={'brand-icon'} />
                     <span>{game?.name}</span>
                  </IconButton>
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

const mapDispatchToProps = (dispatch) => {
   return {
      showNotImplementedYet: () => dispatch(notImplementedYet()),
   };
};

const ConnectedNavbar = connect(null, mapDispatchToProps)(Navbar);

export default ConnectedNavbar;
export { ConnectedNavbar, Navbar };
