import React, { useEffect } from 'react';
import { Typography, Menu, MenuItem, Avatar, IconButton, Button } from '@mui/material';
import {
   ExitToApp,
   PersonOutline,
   Person as PersonIcon,
   Login as LoginIcon,
   AppRegistration as AppRegistrationIcon,
} from '@mui/icons-material';
import { attemptLogout } from 'redux/actions/auth';
import { notImplementedYet } from 'redux/actions/error';
import { connect } from 'react-redux';
import { getUser, isUserLoading } from 'redux/reducers/user';
import { CoinIcon } from 'components/atoms/Icons';
import { attemptUpdateUser } from 'redux/actions/user';
import ClipLoader from 'react-spinners/ClipLoader';
import ReactTooltip from 'react-tooltip';
import {push} from 'connected-react-router';
import routes from 'routes';

function UserNavbarCard({
   fullName,
   coinsCount,
   isUserLoading,
   attemptUpdateUser,
   profilePicture,
   attemptLogout,
   push,
   showNotImplementedYet,
}) {
   const [anchorEl, setAnchorEl] = React.useState(null);
   useEffect(() => {
      attemptUpdateUser();
   }, []);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   if (isUserLoading && !fullName) {
      return (
         <>
            <ReactTooltip />
            <div className='nav-item' data-tip={'Loading user'}>
               <ClipLoader color={'white'} loading={true} size={38} />
            </div>
         </>
      );
   } else if (fullName == undefined) {
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
                  <Typography variant='inherit'>Sign in</Typography>
               </MenuItem>
               <MenuItem onClick={e => push(routes.signUp)}>
                  <AppRegistrationIcon className="icon" fontSize='small' />
                  <Typography variant='inherit'>Sign up</Typography>
               </MenuItem>
            </Menu>
         </>
      );
   }
   return (
      <div className='nav-item user-navbar-card'>
         <Button onClick={handleClick}>
            <div className='user-info-container'>
               <div className='user-name'>{`${fullName}`}</div>
               <div className='user-coins-container'>
                  <span className='coins-count'>{coinsCount}</span>
                  <CoinIcon height={14} width={14} />
               </div>
            </div>
            <Avatar alt='Remy Sharp' src={profilePicture} />
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
            <MenuItem onClick={showNotImplementedYet}>
               <PersonOutline className="icon" fontSize='small' />
               <Typography variant='inherit'>Your profile</Typography>
            </MenuItem>
            <MenuItem onClick={attemptLogout}>
               <ExitToApp className="icon" fontSize='small' />
               <Typography variant='inherit'>Log out</Typography>
            </MenuItem>
         </Menu>
      </div>
   );
}

const mapStateToProps = (state) => {
   const user = getUser(state);
   return {
      fullName: user?.full_name,
      isUserLoading: isUserLoading(state),
      coinsCount: user?.coinsCount,
      profilePicture: user?.profile_picture,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      showNotImplementedYet: () => dispatch(notImplementedYet()),
      attemptUpdateUser: () => dispatch(attemptUpdateUser()),
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
