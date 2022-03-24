import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { Menu, MenuItem, Avatar, IconButton, Button } from '@mui/material';
import {
   ExitToApp,
   PersonOutline,
   Person as PersonIcon,
   Login as LoginIcon,
   AppRegistration as AppRegistrationIcon,
} from '@mui/icons-material';
import ClipLoader from 'react-spinners/ClipLoader';

import routes from 'routes';
import { attemptLogout, push } from 'redux/actions';
import { getUserSelector, isUserLoadingSelector } from 'redux/selectors';
import { CoinIcon } from 'components/atoms';

function UserNavbarCard({}) {
   const user = useSelector(getUserSelector);
   const dispatch = useDispatch();
   const isUserLoading = useSelector(isUserLoadingSelector);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   if (isUserLoading) {
      return (
         <div className='nav-item' data-tip={'Loading user'}>
            <ClipLoader color={'white'} loading={true} size={38} />
         </div>
      );
   } else if (!user?.fullName) {
      return (
         <>
            <IconButton className='nav-item' onClick={handleClick}>
               <PersonIcon>IconToDisplay</PersonIcon>
            </IconButton>
            <Menu
               className='user-card-menu'
               anchorEl={anchorEl}
               keepMounted
               open={Boolean(anchorEl)}
               // getContentAnchorEl={null}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
               transformOrigin={{ vertical: 'top', horizontal: 'center' }}
               onClose={handleClose}
            >
               <MenuItem onClick={e => dispatch(push(routes.singIn))}>
                  <LoginIcon className="icon" fontSize='small' />
                  <span>Sign in</span>
               </MenuItem>
               <MenuItem onClick={e => dispatch(push(routes.signUp))}>
                  <AppRegistrationIcon className="icon" fontSize='small' />
                  <span>Sign up</span>
               </MenuItem>
            </Menu>
         </>
      );
   }
   return (
      <div className='nav-item user-navbar-card'>
         <Button onClick={handleClick}>
            <div className='user-info-container'>
               <div className='user-name'>{`${user.fullName}`}</div>
               <div className='user-coins-container'>
                  <span className='coins-count'>{user.coinsCount}</span>
                  <CoinIcon height={14} width={14} />
               </div>
            </div>
            <Avatar alt='Remy Sharp' src={user.profilePictureLink} />
         </Button>
         <Menu
            className='user-card-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            // getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleClose}
         >
            <MenuItem onClick={e => dispatch(push(routes.userProfilePage))}>
               <PersonOutline className="icon" fontSize='small' />
               <span>Your profile</span>
            </MenuItem>
            <MenuItem onClick={e => dispatch(attemptLogout())}>
               <ExitToApp className="icon" fontSize='small' />
               <span>Log out</span>
            </MenuItem>
         </Menu>
      </div>
   );
}

export default UserNavbarCard;
export { UserNavbarCard };
