import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from 'components/atoms/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Avatar from '@material-ui/core/Avatar';
import { attemptLogout } from 'redux/actions/auth';
import { notImplementedYet } from 'redux/actions/error';
import { connect } from 'react-redux';
import { getUser } from 'redux/reducers/user';
import { CoinIcon } from 'components/atoms/Icons';


function UserNavbarCard({
   fullName,
   profilePicture,
   attemptLogout,
   showNotImplementedYet,
}) {
   const [anchorEl, setAnchorEl] = React.useState(null);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };
   return (
      <div className='user-navbar-card'>
         <Button onClick={handleClick}>
            <div className='user-info-container'>
               <div className='user-name'>{`${fullName}`}</div>
               <div className='user-coins-container'>
                  <span className='coins-count'>401</span>
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
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleClose}
         >
            <MenuItem onClick={showNotImplementedYet}>
               <div className='list-item'>
                  <PersonOutlineIcon fontSize='small' />
               </div>
               <Typography variant='inherit'>Your profile</Typography>
            </MenuItem>
            <MenuItem onClick={attemptLogout}>
               <div className='list-item'>
                  <ExitToAppIcon fontSize='small' />
               </div>
               <Typography variant='inherit'>Log out</Typography>
            </MenuItem>
         </Menu>
      </div>
   );
}

const mapStateToProps = (state) => {
   const user = getUser(state);
   return {
      fullName: user.full_name || `${user.first_name} ${user.last_name}`,
      profilePicture: user.profile_picture,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      showNotImplementedYet: () => dispatch(notImplementedYet()),
      attemptLogout: () => dispatch(attemptLogout()),
   };
};

const ConnectedUserNavbarCard = connect(
   mapStateToProps,
   mapDispatchToProps
)(UserNavbarCard);

export default ConnectedUserNavbarCard;
export { UserNavbarCard, ConnectedUserNavbarCard };
