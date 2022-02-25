import React, { useEffect } from 'react';
import { Menu, MenuItem, Avatar, IconButton, Button } from '@mui/material';
import {
   ExitToApp,
   PersonOutline,
   Person as PersonIcon,
   Login as LoginIcon,
   AppRegistration as AppRegistrationIcon,
} from '@mui/icons-material';
import { attemptLogout, notImplementedYet } from 'redux/actions';
import { connect } from 'react-redux';
import { getUser, isUserLoading } from 'redux/reducers/user';
import { CoinIcon } from 'components/atoms/Icons';
import {push} from 'connected-react-router';
import routes from 'routes';
import ClipLoader from 'react-spinners/ClipLoader';

function UserNavbarCard({
   isUserLoading,
   user,
   attemptLogout,
   push,
}) {
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
   } else if (!user?.getFullName) {
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
               <MenuItem onClick={e => push(routes.singIn)}>
                  <LoginIcon className="icon" fontSize='small' />
                  <span>Sign in</span>
               </MenuItem>
               <MenuItem onClick={e => push(routes.signUp)}>
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
               <div className='user-name'>{`${user.getFullName()}`}</div>
               <div className='user-coins-container'>
                  <span className='coins-count'>{user.getCoinsCount()}</span>
                  <CoinIcon height={14} width={14} />
               </div>
            </div>
            <Avatar alt='Remy Sharp' src={user.getProfilePictureLink()} />
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
            <MenuItem onClick={e => push(routes.userProfilePage)}>
               <PersonOutline className="icon" fontSize='small' />
               <span>Your profile</span>
            </MenuItem>
            <MenuItem onClick={attemptLogout}>
               <ExitToApp className="icon" fontSize='small' />
               <span>Log out</span>
            </MenuItem>
         </Menu>
      </div>
   );
}

const mapStateToProps = (state) => {
   const user = getUser(state);
   return {
      isUserLoading: isUserLoading(state),
      user
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      showNotImplementedYet: () => dispatch(notImplementedYet()),
      attemptLogout: () => dispatch(attemptLogout()),
      push: (url) => dispatch(push(url)),
   };
};

const ConnectedUserNavbarCard = connect(
   mapStateToProps,
   mapDispatchToProps
)(UserNavbarCard);

export default ConnectedUserNavbarCard;
export { UserNavbarCard, ConnectedUserNavbarCard };
