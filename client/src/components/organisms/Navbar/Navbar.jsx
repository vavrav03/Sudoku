import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Grid from '@mui/material/Grid';

import UserNavbarCard from 'components/organisms/Navbar/UserNavbarCard';
import { connect } from 'react-redux';
import { notImplementedYet } from 'redux/actions/error';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

function Navbar({ openedGame, isSidebarOpen, menuButtonAction }) {
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
                     <span>Hry ({openedGame})</span>
                  </IconButton>
                  <Divider className={'divider'} orientation='vertical' />
               </>
            ) : null}
            <Link className='nav-item' to='/'>
               Domů
            </Link>
         </nav>
         <nav className='nav-right'>
            <IconButton
               onClick={() => {}}
               aria-label='show 17 new notifications'
               color='inherit'
            >
               <Badge badgeContent={17} color='secondary'>
                  <NotificationsIcon />
               </Badge>
            </IconButton>
            <UserNavbarCard
               className='nav-item'
               // firstName={"Vladimír"}
               // lastName={"Vávra"}
               // imageUrl={"https://picsum.photos/200"}
            />
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
